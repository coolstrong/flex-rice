import { CacheContainer } from "@/lib/cache";
import { assert, optObj, raise, undef } from "@/utils/common";
import { P, match } from "ts-pattern";
import { todoistToken } from "privateConfig";
import { produce } from "immer";
import { ArkErrors, type, Type } from "arktype";
import { identity } from "effect";

const taskSchema = type({
    id: "string",
    project_id: "string",
    section_id: "string|null",
    content: "string",
    due: {
        date: "string",
        string: "string",
        is_recurring: "boolean",
    },
});

const projectSchema = type({
    id: "string",
    name: "string",
});

const sectionSchema = type({
    id: "string",
    project_id: "string",
    name: "string",
});

export type TodoistTask = {
    id: string;
    project: string;
    section?: string;
    content: string;
    due: Date;
    reccurent: boolean;
};

class TodoistClient {
    constructor(private userToken: string) {}

    #projects = new CacheContainer(() =>
        this.#request("GET", "projects", type([projectSchema, "[]"])),
    );
    #sections = new CacheContainer(() =>
        this.#request("GET", "sections", type([sectionSchema, "[]"])),
    );

    #request = async <TSchema extends undefined | Type<any>>(
        method: "GET" | "POST",
        path: string,
        schema: TSchema,
        body?: unknown,
    ): Promise<TSchema extends Type<infer T> ? T : void> => {
        const res = await Utils.fetch(
            `https://api.todoist.com/rest/v2/${path}`,
            {
                method,
                ...optObj(body, { body: JSON.stringify(body!) }),
                headers: {
                    Authorization: `Bearer ${this.userToken}`,
                },
            },
        );

        if (!res.ok) throw { error: "fetch" };

        if (schema) {
            const json: unknown = await res.json();

            return match(schema(json))
                .with(P.instanceOf(type.errors), errors =>
                    raise({ error: "parse", details: errors }),
                )
                .otherwise(identity);
        }

        return <TSchema extends Type<infer T> ? T : void>undefined;
    };

    invalidateCache = () => {
        this.#sections.invalidate();
        this.#projects.invalidate();
    };

    completeTask = async (taskId: string) =>
        this.#request("POST", `tasks/${taskId}/close`, undef);

    getTasks = async (): Promise<TodoistTask[]> => {
        const [projects, sections, tasks] = await Promise.all([
            this.#projects.get(),
            this.#sections.get(),
            this.#request(
                "GET",
                "tasks?filter=(today|overdue)",
                type([taskSchema, "[]"]),
            ),
        ]);

        return tasks
            .sort(
                ({ due: { date: d1 } }, { due: { date: d2 } }) =>
                    Date.parse(d1) - Date.parse(d2),
            )
            .map(t => ({
                due: new Date(t.due.date),
                content: t.content,
                id: t.id,
                project: assert(
                    projects.find(x => x.id === t.project_id)?.name,
                ),
                section: sections.find(x => x.id === t.section_id)?.name,
                reccurent: t.due.is_recurring,
            }));
    };
}

class TodoistService extends Service {
    static {
        Service.register(
            this,
            {},
            {
                tasks: ["jsobject", "r"],
            },
        );
    }

    readonly #client = new TodoistClient(todoistToken);

    #tasks:
        | { status: "loading"; data?: TodoistTask[] }
        | { status: "error"; error?: unknown }
        | { status: "success"; data: TodoistTask[] }
        | { status: "notStarted" } = { status: "notStarted" };

    async refresh() {
        if (this.#tasks.status === "error") this.#client.invalidateCache();

        this.#tasks = {
            status: "loading",
        };
        this.changed("tasks");

        this.#tasks = await this.#client.getTasks().then(
            data => ({ status: "success", data }),
            error => ({ status: "error", error }),
        );
        this.changed("tasks");
    }

    async closeTask(taskId: string) {
        await this.#client.completeTask(taskId);

        this.#tasks = produce(this.#tasks, draft => {
            if (draft.status === "success")
                draft.data = draft.data.filter(({ id }) => id !== taskId);
        });

        this.changed("tasks");
    }

    get tasks() {
        return this.#tasks;
    }
}

export const todoist = new TodoistService();
