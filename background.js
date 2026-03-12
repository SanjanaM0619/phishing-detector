// This script runs in the "shadows" of the browser
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    // We only care about the main frame (the actual tab)
    if (details.frameId === 0) {
        const url = details.url.toLowerCase();
        
        // The same "AI" logic: if it has 'login' or 'test' and it's NOT a famous site
        if ((url.includes("login") || url.includes("test")) && !url.includes("google.com")) {
            // Redirect them to a safe internal warning page
            chrome.tabs.update(details.tabId, {
                url: "https://www.google.com/search?q=security+warning+phishing+detected"
            });
        }
    }
});