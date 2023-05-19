import { useEffect } from "react";

function isURL(str) {
  try {
    new URL(str)
    return true
  }
  catch (e) {
    return false
  }
}

function App() {
  useEffect(() => {
    document.addEventListener("paste", (e) => {
      if(isURL(e.clipboardData.getData("text/plain"))) {
        const url = e.clipboardData.getData("text/plain")
        console.log(url)
      }
    })
  }, [])

  return <></>;
}

export default App;
