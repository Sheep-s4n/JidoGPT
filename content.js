let autoPromptInterval = null;
const promptInterval = 500


window.addEventListener('message', (event) => {
  if (event.data.type === 'TOGGLE_AUTOPROMPT') {
    console.log("triggered !")
    if (event.data.enabled) {
      startAutoPrompt();
    } else {
      stopAutoPrompt();
    }
  }
});

function startAutoPrompt() {
  if (autoPromptInterval) return;

  chrome.storage.local.get(['autoPromptMessage'], (data) => {
    const message = data.autoPromptMessage || 'Pick up where you left off.';
    const editableDiv = document.querySelector('#prompt-textarea');

    autoPromptInterval = setInterval(() => {
      if (!editableDiv) return;

      editableDiv.focus();
      editableDiv.innerText = message;
      editableDiv.dispatchEvent(new InputEvent('input', { bubbles: true }));

      editableDiv.dispatchEvent(new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        which: 13,
      }));
    }, promptInterval);
  });
}

function stopAutoPrompt() {
    document.querySelector('#prompt-textarea').innerText = ""
    clearInterval(autoPromptInterval);
    autoPromptInterval = null;
}