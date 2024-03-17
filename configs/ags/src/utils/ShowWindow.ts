import App from "resource:///com/github/Aylur/ags/app.js";

let isProcessing = false; // Flag to track processing status
let timeoutId: Timer; // Store the timeout ID

export default (windowName: string, timeout = 1000) => {
    if (isProcessing) {
        // If processing, reset the timer
        clearTimeout(timeoutId);
    } else {
        // If not processing, show or hide the window
        App.openWindow(windowName);
    }

    // Set a 5-second delay before show or hide the window
    timeoutId = setTimeout(() => {
        App.closeWindow(windowName);
        isProcessing = false; // Reset the processing flag
    }, timeout);

    isProcessing = true; // Set the processing flag
};
