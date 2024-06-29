import { TodoistTask, todoist } from "@/services/todoist";

import "./TodoistWidget.scss";
import { O, S } from "@mobily/ts-belt";
import { optArr } from "@/utils/common";
import Gtk30 from "gi://Gtk";
import themeService from "@/services/ThemeService";
import { bash, cssComponent } from "@/utils/helpers";
import { Binding } from "@/types/service";
import type { Variable as VariableType } from "@/types/variable";

type Prop<T> = T | Binding<any, any, T>;

const TaskCheckbox = ({ taskId }: { taskId: string }) => {
    const checked = Variable(false);
    return Widget.Button({
        className: checked
            .bind()
            .as(x =>
                cssComponent(
                    ["todoist", "task", "checkbox"],
                    [x ? "checked" : "unchecked"],
                ),
            ),

        hpack: "center",
        vpack: "start",
        label: "",
        onClicked: () => {
            checked.value = true;
            todoist.closeTask(taskId).catch(() => (checked.value = false));
        },
    });
};

const TaskDisplay = (task: TodoistTask) =>
    Widget.Box({
        className: "todoist__task",
        spacing: 10,
        children: [
            TaskCheckbox({ taskId: task.id }),
            Widget.Box({
                vertical: true,
                spacing: 6,
                children: [
                    Widget.Label({
                        className: "todoist__task__content",
                        label: task.content,
                        hpack: "start",
                    }),
                    Widget.Box({
                        children: [
                            Widget.Box({
                                css: `min-width:140px`,
                                hpack: "start",
                                spacing: 10,
                                children: [
                                    Widget.Label({
                                        className:
                                            "text-icon todoist__task__due__calendarIcon",
                                        label: "󰃭",
                                    }),
                                    Widget.Label({
                                        className: "todoist__task__due",
                                        label: task.due.toLocaleDateString(
                                            ["en"],
                                            {
                                                month: "short",
                                                day: "2-digit",
                                            },
                                        ),
                                    }),
                                    ...optArr(task.reccurent, [
                                        Widget.Label({
                                            className:
                                                "text-icon todoist__task__due__refreshIcon",
                                            label: "",
                                        }),
                                    ]),
                                ],
                            }),
                            Widget.Box({
                                spacing: 4,
                                children: [
                                    Widget.Label({
                                        className:
                                            "todoist__task__breadcrumbs__hash",
                                        label: "#",
                                    }),
                                    Widget.Label({
                                        className: "todoist__task__breadcrumbs",
                                        label:
                                            task.project +
                                            (O.map(
                                                task.section,
                                                S.prepend("/"),
                                            ) ?? ""),
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });

const ControlButton = ({
    icon,
    onClicked,
    hpack,
}: {
    icon: string | Binding<any, any, string>;
    onClicked: () => void;
    hpack: "start" | "end" | "center";
}) =>
    Widget.Button({
        hpack,
        className: "text-icon todoist__control__button",
        onClicked,
        vpack: "center",
        label: icon,
    });

const ControlPanel = ({ visible }: { visible: VariableType<boolean> }) =>
    Widget.CenterBox({
        className: "todoist__control",
        hexpand: true,

        startWidget: ControlButton({
            hpack: "start",
            icon: "󰑐",
            onClicked: () => todoist.refresh(),
        }),
        centerWidget: ControlButton({
            hpack: "center",
            icon: "",
            onClicked: () =>
                bash`gtk-launch vivaldi-knaiokfnmjjldlfhlioejgcompgenfhb-Default`,
        }),
        endWidget: ControlButton({
            hpack: "end",
            icon: visible.bind().as(v => (v ? "" : "")),
            onClicked: () => {
                visible.value = !visible.value;
            },
        }),
    });

export const TodoistWidget = () => {
    const visible = Variable(true);
    return Widget.Window({
        name: "todoist-desktop",
        anchor: ["top", "left"],
        opacity: 0.85,
        layer: "background",
        margins: [20, 20],
        setup: () => todoist.refresh(),
        child: Widget.Box({
            css: "min-width:440px",
            spacing: 16,
            className: "todoist",
            vertical: true,
            children: [
                Widget.Scrollable({
                    vscroll: "automatic",
                    visible: visible.bind(),
                    hscroll: "never",
                    css: "min-height:400px; min-width:420px;",
                    child: Widget.Box({
                        className: "todoist__task__container",
                        vertical: true,
                        spacing: 12,
                        children: todoist
                            .bind("tasks")
                            //prettier-ignore
                            .as<Gtk30.Widget[]>(tasks =>
                                tasks.status === "success"
                                    ? tasks.data.map(TaskDisplay)
                                    : [
                                          Widget.CenterBox({
                                              expand: true,
                                              centerWidget:
                                                  tasks.status === "error"
                                                      ? Widget.Label({
                                                            className:
                                                                "todoist__error",
                                                            label: "Error occured while loading tasks. Try refresh",
                                                        })
                                                      : Widget.Spinner({}),
                                          }),
                                      ],
                            ),
                    }),
                }),
                ControlPanel({ visible }),
            ],
        }),
    }).hook(
        themeService,
        () =>
            setTimeout(() => {
                App.ToggleWindow("todoist-desktop");
                App.ToggleWindow("todoist-desktop");
            }, 1000),
        "changed",
    );
};
