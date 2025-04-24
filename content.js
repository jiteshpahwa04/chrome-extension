// content.js
window.addEventListener('mouseup', wordSelected);

function wordSelected() {
  const selectedText = window.getSelection().toString().trim();
  console.log('selected text:', selectedText);
  if (selectedText) {
    chrome.runtime.sendMessage({ text: selectedText });
  }
}