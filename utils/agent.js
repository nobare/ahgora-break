chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    getName();
})

const getName = () => {
    const name = document.querySelector(
      '#hello-message-panel > div.col-sm-8.introduction-hello-name > div:nth-child(1) > div > strong > a').innerHTML
    const editedName = name.slice(0, -1)
    chrome.storage.sync.set({ 'Agente': editedName }, () => {
      return console.log('Agente:' + editedName);
    });
}