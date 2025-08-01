let autoPromptInterval = null;
const promptInterval = 500
const separator = ","


window.addEventListener('message', (event) => {
  if (event.data.type === 'TOGGLE_AUTOPROMPT') {
    if (event.data.enabled) {
      startAutoPrompt();
    } else {
      stopAutoPrompt();
    }
  }
});


function startAutoPrompt() {
  if (autoPromptInterval) return;

  chrome.storage.local.get(["autoPromptMessage", "content_to_break_down", "item_by_breakdown"], (data) => {
    const message = data.autoPromptMessage || "";
    const item_by_breakdown = data.item_by_breakdown || 10;
    const content_to_break_down = (data.content_to_break_down || "").split(separator) || '';
    const generator = chunkGenerator(content_to_break_down, item_by_breakdown)    
    const editableDiv = document.querySelector('#prompt-textarea');
    
    autoPromptInterval = setInterval(() => {
      if (document.querySelector('[data-testid="stop-button"]') || !editableDiv) return;
      item = generator.next()

      editableDiv.focus();
      editableDiv.innerText = `${message} ${item.value}`;
      editableDiv.dispatchEvent(new InputEvent('input', { bubbles: true }));

      const submitBtn = document.querySelector("#composer-submit-button");
      if (submitBtn) {
        submitBtn.click();
      } else {
        editableDiv.dispatchEvent(new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          key: 'Enter',
          code: 'Enter',
          keyCode: 13,
          which: 13,
        }));
  
      }

      if (item.done) stopAutoPrompt();
    }, promptInterval); 
  });
}

function stopAutoPrompt() {
    document.querySelector('#prompt-textarea').innerText = ""
    clearInterval(autoPromptInterval);
    autoPromptInterval = null;
    chrome.storage.local.set({ autoPromptEnabled: false });
}

function* chunkGenerator(items, x) {
  for (let i = 0; i < items.length; i += x) {
    yield items.slice(i, i + x);
  }
}