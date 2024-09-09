// Toggle Ad Blocker Logic
document.getElementById('toggle').addEventListener('change', function() {
    const enabled = this.checked;
    chrome.storage.sync.set({ adblockEnabled: enabled }, function() {
        chrome.runtime.sendMessage({ type: 'toggleAdBlocker', enabled: enabled });
    });
});

// Restore toggle state on load
chrome.storage.sync.get('adblockEnabled', function(data) {
    document.getElementById('toggle').checked = data.adblockEnabled || false;
});

// Clear Cookies Logic
document.getElementById('clearCookies').addEventListener('click', function() {
    // Get the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        let url = new URL(tabs[0].url);
        let domain = url.hostname;
        
        // Get all cookies for the domain
        chrome.cookies.getAll({ domain: domain }, function(cookies) {
            console.log("Cookies before deletion:", cookies);
            
            for (let cookie of cookies) {
                // Delete each cookie
                chrome.cookies.remove({
                    url: "https://" + domain + cookie.path,
                    name: cookie.name
                });
            }

            // Update cookie count after clearing
            setTimeout(updateCookieCount, 1000);
        });
    });
});

// Function to update cookie count
function updateCookieCount() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        let url = new URL(tabs[0].url);
        let domain = url.hostname;
        
        // Get all cookies for the domain
        chrome.cookies.getAll({ domain: domain }, function(cookies) {
            document.getElementById('cookieCount').innerText = `Active cookies: ${cookies.length}`;
        });
    });
}

// Initialize cookie count when popup loads
updateCookieCount();