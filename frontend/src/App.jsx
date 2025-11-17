import { useEffect } from "react";
import API from "./utils/api";

function App() {
  useEffect(() => {
    API.get("/reviews/hostaway")
      .then((res) => {
        console.log("Reviews:", res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return <h1>Frontend Connected</h1>;
}

export default App;
