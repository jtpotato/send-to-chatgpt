/* global chrome */

function getText() {
  let pageText = document.body.innerText;
  let tooLongString = ""
  let length = pageText.split(" ").length
  if (length > 2000) {
    tooLongString = `The webpage was too long (${length} words) to include in its entirety. The page has been cut to 2000 words.`
    pageText = pageText.split(" ").slice(0, 2000).join(" ")
  }
  const promptString =
  'I have attached the contents of a website below. Use this information to assist me with any requests. Respond with "I see the webpage context, what can I do for you? ' + tooLongString + '", and provide a dot-pointed list of 3 suggested actions, such as "Summarise page" or "Tell me more about [key topic]". Use Markdown to format your responses where possible. ' + `URL: ${window.location.href}` + '\nWEBPAGE CONTEXT:\n```\n' + pageText + '\n```\nEND CONTEXT';

  return promptString;
}

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
        args: [],
        target: { tabId: tab.id, allFrames: true },
      })
      .then((results) => {
        const { result } = results[0];
        console.log(result);
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
