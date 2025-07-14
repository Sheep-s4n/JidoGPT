const messageInput = document.getElementById('message');
const toggleButton = document.getElementById('toggle');
const statusText = document.getElementById('status');

chrome.storage.local.get(['autoPromptMessage', 'autoPromptEnabled'], (data) => {
  messageInput.value = data.autoPromptMessage || 'Pick up where you left off.';
  updateStatus(data.autoPromptEnabled);
});

toggleButton.addEventListener('click', () => {
  const newMessage = messageInput.value;
  chrome.storage.local.set({ autoPromptMessage: newMessage });

  chrome.storage.local.get(['autoPromptEnabled'], (data) => {
    const newState = !data.autoPromptEnabled;
    chrome.storage.local.set({ autoPromptEnabled: newState });
    updateStatus(newState); 
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (state) => {
          window.postMessage({ type: 'TOGGLE_AUTOPROMPT', enabled: state }, '*');
        },
        args: [newState]
      });
    });
  });
});

function updateStatus(enabled) {
  statusText.innerHTML = `<b>Status:</b> ${enabled ? 'Running' : 'Stopped'}`;
  toggleButton.textContent = enabled ? 'Stop' : 'Start';
}