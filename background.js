// background.js
console.log('service worker running');

chrome.runtime.onMessage.addListener((request, sender) => {
  console.log('got selection:', request.text);
  chrome.storage.local.set({ selectedWord: request.text });
});