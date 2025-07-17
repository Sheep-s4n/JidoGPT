const messageInput = document.getElementById('message');
const messageContentInput = document.getElementById("content")
const chunkCountInput = document.getElementById("chunkCount")
const toggleButton = document.getElementById('toggle');
const statusText = document.getElementById('status');

// améliorer le readme avec les utilisations, ex : pour générer des phrases d'exemples avec du voc de longues listes


function saveUserdData() {
  const newMessageContent = messageContentInput.value;
  const newMessage = messageInput.value;
  let newChunkCount = parseInt(chunkCountInput.value);
  if (newChunkCount === 0) {
    newChunkCount = 10
    chunkCountInput.value = "10"
  }
  chrome.storage.local.set({ 
    autoPromptMessage: newMessage,
    content_to_break_down : newMessageContent,
    item_by_breakdown : newChunkCount,
});
}

chrome.storage.local.get(["item_by_breakdown", "content_to_break_down", "autoPromptMessage", "autoPromptEnabled"], (data) => {
  messageInput.value = data.autoPromptMessage || "";
  messageContentInput.value = data.content_to_break_down || ""
  chunkCountInput.value = data.item_by_breakdown || "10"

  updateStatus(data.autoPromptEnabled);
});

toggleButton.addEventListener('click', () => {
  saveUserdData()

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

messageInput.addEventListener("input" , (event) => {
  saveUserdData()
})
messageContentInput.addEventListener("input" , (event) => {
  saveUserdData()
})
chunkCountInput.addEventListener("input" , (event) => {
  // check it's a right input
  if (event.inputType === "insertText") {
    if (event.data in ["1" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9"] ) {
      saveUserdData()
    } else {
      chunkCountInput.value = chunkCountInput.value.slice(0, -1)
    }
  }
})


function updateStatus(enabled) {
  statusText.innerHTML = `<b>Status:</b> ${enabled ? 'Running' : 'Stopped'}`;
  toggleButton.textContent = enabled ? 'Stop' : 'Start';
}

