/* global chrome */

import { getText } from "./WebContentManager.js"

/**
 * @param {any} text
 */
function pasteText(text) {
  function deliverText() {
    /**@type {HTMLTextAreaElement} promptInput */
    const promptInput = document.getElementById("prompt-textarea");
    promptInput.value = text;

    document.removeEventListener("readystatechange", deliverText);
  }

  if (document.readyState == "loading") {
    document.addEventListener("readystatechange", deliverText);
  } else {
    deliverText();
  }
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("https://chat.openai.com")) {
    chrome.scripting
      .executeScript({
        func: getText,
        target: { tabId: tab.id, allFrames: true },
      })
      .then((results) => {
        const { result } = results[0];
        console.log(results);
        // Check if chatgpt website is open
        chrome.tabs.query({ url: "https://chat.openai.com/*" }, (tabs) => {
          // Switch to tab
          if (tabs.length > 0) {
            chrome.tabs.update(tabs[0].id, { active: true }).then(() => {
              chrome.scripting.executeScript({
                func: pasteText,
                args: [result],
                target: { tabId: tabs[0].id, allFrames: true },
              });
            });
          } else {
            // Open chatgpt website
            chrome.tabs.create(
              { url: "https://chat.openai.com" },
              (chatGPTTab) => {
                chrome.scripting.executeScript({
                  func: pasteText,
                  args: [result],
                  target: { tabId: chatGPTTab.id, allFrames: true },
                });
              }
            );
          }
        });
      });
  }
});
