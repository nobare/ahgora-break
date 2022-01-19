const Online = () => {
  chrome.windows.create({
    url: chrome.runtime.getURL('./online/online.html'),
    type: "popup",
    state: "fullscreen"
  })
};

const Offline = () => {
  chrome.windows.create({
    url: chrome.runtime.getURL('./offline/offline.html'),
    type: "popup",
    state: "fullscreen"
  })
};

chrome.webRequest.onBeforeRequest.addListener(
  Offline, {
  urls: ["https://seusucesso.ahgora.com.br/Chat/SetStatus/Offline*"],
});

chrome.webRequest.onBeforeRequest.addListener(
  Online, {
  urls: ["https://seusucesso.ahgora.com.br/Chat/SetStatus/Online*"],
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == 'complete' && tab.status == 'complete' && tab.url != undefined && tab.url.includes('https://seusucesso.ahgora.com.br/Home')) {
      chrome.tabs.executeScript(tabId, { file: './utils/agent.js' }, () => {
            chrome.tabs.sendMessage(tabId, 'getName')
            console.log(tabId, tab.url);
      });
  };
});