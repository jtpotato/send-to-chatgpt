import { useEffect } from "react";
import { summarisePage } from "./summarisePage";

function App() {
  useEffect(() => {
    summarisePage()
  }, [])

  return <></>;
}

export default App;
