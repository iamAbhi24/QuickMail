
//Creating context menu 
chrome.runtime.onInstalled.addListener(() => {
    // Create a context menu item
    chrome.contextMenus.create({
        id: "trigger-quickmail-popup",
        title: "Get Response From QuickMail",
        contexts: ["all"],
        documentUrlPatterns: ["https://mail.google.com/*"]
    });
});
// Handle menu item clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "trigger-quickmail-popup") {
        // Open Gmail compose window
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (context) => {
                injectWindow(context);
            },
            args: [info.selectionText]
        });

    }
});