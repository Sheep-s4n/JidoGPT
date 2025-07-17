# JidoGPT - Auto Prompt ChatGPT Extension

## Features

- Automatically sends **customizable, chunked prompts repeatedly** to ChatGPT.
- Useful for:
  - Generating example sentences for vocabulary in bulk
  - Processing large lists of terms automatically with ChatGPT
  - Automating repetitive prompt workflows during study or research.

---

## Installation

1. Download or clone this repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer Mode**.
4. Click **Load unpacked** and select the extension folder.
5. Pin the extension to your toolbar for quick access.

---

## Usage

### 1️⃣ Launch the Extension
Click the JidoGPT icon in your Chrome toolbar.

### 2️⃣ Configure Your Prompt
- **Optional Instructions:**  
  Enter base instructions for your prompts in the first box (e.g., "Generate three example sentences in `any language` for each word :").
  
- **Content to Break Down:**  
  Paste a long, <span style="color:#ee2400">**comma-separated**</span> list of words, phrases, or items you want to process automatically (e.g., `apple, banana, cherry, date, elderberry`).

- **Elements per Prompt:**  
  Choose how many items from your list to include per ChatGPT prompt (default: 10).

### 3️⃣ Start Auto-Prompting
- Click **Start** to begin.
- The extension will automatically send prompts repeatedly in ChatGPT using your instructions and items list, chunked according to your chosen size.
- Click **Stop** at any time to pause.

## Note

 - You can adjust the separator (, by default) in content.js by modifying `separator` variable

