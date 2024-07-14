import { useState } from "react";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import { validateToken } from "./endpoints/userapi";

function App() {
  const [token, setToken] = useState(
    JSON.parse(sessionStorage.getItem("userData")!)?.token || ""
  );

  validateToken(token).then((response) => {
    if (response === false) {
      sessionStorage.removeItem("userData");
      return;
    }

    setToken(response.token);
  });

  return <LoginPage />;
}

export default App;
