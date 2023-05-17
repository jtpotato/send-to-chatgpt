/**
 * @param {string} url
 */
function isURL(url) {
    try {
        new URL(url);
        return true;
    }
    catch (e) {
        return false;
    }
}

/**
 * @param {string} url
 */
export function pasteHandler(url) {
    if(isURL(url)) {
        fetch(new URL(url)).then((response) => {
            console.log(response.headers)
        })
    }
}