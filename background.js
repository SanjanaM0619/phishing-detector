// Function to evaluate if a URL is suspicious (Matches our content script logic)
function isSuspicious(urlStr) {
    try {
        const url = new URL(urlStr);
        const host = url.hostname;
        
        // Don't block major trusted sites (Whitelisting)
        const whitelist = ["google.com", "github.com", "microsoft.com", "amazon.com"];
        if (whitelist.some(safe => host.endsWith(safe))) return false;

        const dotCount = (host.match(/\./g) || []).length;
        const hyphenCount = (host.match(/-/g) || []).length;
        const suspiciousPatterns = ["verify", "update", "secure", "banking", "login", "account"];
        const hasPattern = suspiciousPatterns.some(p => host.includes(p));

        // Block if 2 or more red flags are found
        let score = 0;
        if (dotCount > 3) score++;
        if (hyphenCount > 2) score++;
        if (hasPattern) score++;

        return score >= 2;
    } catch (e) {
        return false;
    }
}

// Intercept the request BEFORE the page loads
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    if (details.frameId === 0 && isSuspicious(details.url)) {
        // Redirect to a built-in "Blocked" page or a warning
        chrome.tabs.update(details.tabId, {
            url: "https://www.google.com/search?q=Phishing+Warning+This+Site+Was+Blocked"
        });
    }
});