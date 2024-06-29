import { CacheContainer } from "@/lib/cache";
import { assert, raise, undef } from "@/utils/common";
import { F, O } from "@mobily/ts-belt";
import { P, isMatching, match } from "ts-pattern";
import { todoistToken } from "privateConfig";
import { produce } from "immer";

const taskPattern = {
    id: P.string,
    project_id: P.string,
    section_id: P.string.or(null),
    content: P.string,
    due: {
        date: P.string,
        string: P.string,
        is_recurring: P.boolean,
    },
};
type RawTask = P.infer<typeof taskPattern>;

const projectPattern = {
    id: P.string,
    name: P.string,
};
type Project = P.infer<typeof projectPattern>;

const sectionPattern = {
    id: P.string,
    project_id: P.string,
    name: P.string,
};
type Section = P.infer<typeof sectionPattern>;

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
        this.#request<Project[]>("GET", "projects", P.array(projectPattern)),
    );
    #sections = new CacheContainer(() =>
        this.#request<Section[]>("GET", "sections", P.array(sectionPattern)),
    );

    #request = <T>(
        method: "GET" | "POST",
        path: string,
        pattern: P.Pattern<T>,
        body?: unknown,
    ): Promise<T> =>
        Utils.fetch(`https://api.todoist.com/rest/v2/${path}`, {
            method,
            body: O.map(body, JSON.stringify) ?? undef,
            headers: {
                Authorization: `Bearer ${this.userToken}`,
            },
        })
            .then(async r => (r.ok ? r.json() : raise({ error: "fetch" })))
            .then((json: unknown) =>
                isMatching<P.Pattern<T>>(pattern, json)
                    ? json
                    : raise({ error: "parse", input: json }),
            );

    completeTask = async (taskId: string) =>
        Utils.fetch(`https://api.todoist.com/rest/v2/tasks/${taskId}/close`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.userToken}`,
            },
        }).then(r => {
            if (!r.ok) throw { error: "fetch" };
        });
    // this.#request("POST", `tasks/${taskId}/close`, P._);

    getTasks = async (): Promise<TodoistTask[]> => {
        const [projects, sections, tasks] = await Promise.all([
            this.#projects.get(),
            this.#sections.get(),
            this.#request<RawTask[]>(
                "GET",
                "tasks?filter=(today|overdue)",
                P.array(taskPattern),
            ),
        ]);

        return tasks
            .sort(
                ({ due: { date: d1 } }, { due: { date: d2 } }) =>
                    Date.parse(d1) - Date.parse(d2),
            )
            .map(t => ({
                // due: t.due.string,
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
        this.#tasks = {
            status: "loading",
            data: this.#tasks.status === "success" ? this.#tasks.data : undef,
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
