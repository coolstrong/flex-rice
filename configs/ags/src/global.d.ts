type undef = undefined;
declare namespace Belt {
    type UseMutableArrays = 1;
}

type Transition =
    | "none"
    | "crossfade"
    | "slide_right"
    | "slide_left"
    | "slide_up"
    | "slide_down";

type Direction = "left" | "right" | "down" | "up";
