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

const getName = () => {
  const name = document.querySelector(
    '#hello-message-panel > div.col-sm-8.introduction-hello-name > div:nth-child(1) > div > strong > a').innerHTML
  const editedName = name.slice(0, -1)
  chrome.storage.sync.set({ 'Agente': editedName }, () => {
    return console.log('Agente:' + editedName);
  });
}