document.addEventListener('DOMContentLoaded', () => {
  const switcher = document.getElementById('switcher');
  const o = document.getElementById('onsfx');
  const n = document.getElementById('offsfx');
  let proxyEnabled = false;

  chrome.storage.local.get('proxyEnabled', (data) => {
    proxyEnabled = data.proxyEnabled || false;
    updateButton(proxyEnabled);
  });

  switcher.addEventListener('click', () => {
    proxyEnabled = !proxyEnabled;
    chrome.storage.local.set({ proxyEnabled });
    updateButton(proxyEnabled);
    if (proxyEnabled) {
      o.play();
    } else {
      n.play();
    }
    chrome.runtime.sendMessage({ proxyEnabled });
  });

  function updateButton(isEnabled) {
    if (isEnabled) {
      switcher.src = "on.png";
    } else {
      switcher.src = "off.png";
    }
  }
});
