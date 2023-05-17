import { useEffect } from "react";
import { pasteHandler } from "./pasteHandler" 
import "./App.css";

function App() {
  useEffect(() => {
    document.addEventListener("readystatechange", () => {
      if (document.readyState == "complete") {
        document.getElementById("prompt-textarea").addEventListener("paste", (event) => {
          pasteHandler(event.clipboardData.getData("text/plain"))
        })
      }
    })
  }, [])

  return <></>;
}

export default App;
