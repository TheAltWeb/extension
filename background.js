let enabled = false;

function setProxy(isEnabled) {
  if (isEnabled) {
    chrome.proxy.settings.set({
      value: {
        mode: "fixed_servers",
        rules: {
          singleProxy: {
            scheme: "http",
            host: "127.0.0.1",
            port: 8080
          }
        }
      },
      scope: "regular"
    });
  } else {
    chrome.proxy.settings.clear({ scope: "regular" });
  }
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.proxyEnabled !== undefined) {
    enabled = message.proxyEnabled;
    setProxy(enabled);
  }
});

chrome.proxy.settings.onChange.addListener((details) => {
  if (details.levelOfControl === 'controlled_by_this_extension') {
    enabled = !details.value.enabled;
  } else {
    enabled = false;
  }
});
