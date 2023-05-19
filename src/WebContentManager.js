export function getText() {
  let pageText = document.body.innerText;
  console.log(pageText);
  let tooLongString = "";
  let length = pageText.split(" ").length;
  if (length > 2000) {
    tooLongString = `The webpage was too long (${length} words) to include in its entirety. The page has been cut to 2000 words.`;
    pageText = pageText.split(" ").slice(0, 2000).join(" ");
  }
  const promptString =
    'I have attached the contents of a website below. Use this information to assist me with any requests. Respond with "I see the webpage context, what can I do for you? ' +
    tooLongString +
    '" Use Markdown to format your responses where possible. ' +
    `URL: ${window.location.href}` +
    "\nWEBPAGE CONTEXT:\n```\n" +
    pageText +
    "\n```\nEND CONTEXT";

  console.log(promptString);

  return promptString;
}
