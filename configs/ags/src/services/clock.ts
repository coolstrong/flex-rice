export const utcClockVar = Variable("", {
    poll: [1000, ["date", "+%Y-%m-%d | %H:%M:%S"]],
});
