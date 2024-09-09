chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'toggleAdBlocker') {
        if (request.enabled) {
            // Enable ad blocker rules and delete cookies if necessary
            chrome.declarativeNetRequest.updateEnabledRulesets({
                enableRulesetIds: ['ruleset_1']
            });
        } else {
            // Disable ad blocker rules
            chrome.declarativeNetRequest.updateEnabledRulesets({
                disableRulesetIds: ['ruleset_1']
            });
        }
    }
});