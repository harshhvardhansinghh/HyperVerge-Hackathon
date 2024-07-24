document.getElementById('openBoard').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.extension.getURL('homepage.html') });
  });
  