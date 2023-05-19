/**
 * 
 * @param {string} text 
 */
export function textCleaner(text) {
    let tooLongString = ""
    let length = text.split(" ").length
    if (length > 2000) {
      tooLongString = `The webpage was too long (${length} words) to include in its entirety. The page has been cut to 2000 words.`
      text = text.split(" ").slice(0, 2000).join(" ")
    }

    return {text, tooLongString}
}