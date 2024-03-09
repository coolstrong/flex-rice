export const usePressed = () => {
    const isPressed = Variable(false);

    return {
        isPressed,
        events: {
            onPrimaryClick: () => isPressed.setValue(true),
            onPrimaryClickRelease: () => isPressed.setValue(false),
        },
    };
};
