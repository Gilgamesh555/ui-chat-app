import React, { useState } from "react";
import { login } from "../endpoints/userapi";
import "./LoginPage.css";
import HomePage from "./HomePage";
import { UserDataContext } from "../Contexts/UserDataContext";

interface UserData {
  username: string;
  email: string;
  id: number;
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pageContent, setPageContent] = useState<JSX.Element | null>(null);

  // userData should be a context that all component can be available to use
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // make an api request to example.com/login
    login(username, password).then((response) => {
      if (response === false) {
        setError("Invalid username or password");
        return;
      }

      setPageContent(
        <UserDataContext.Provider value={response as UserData}>
          <HomePage />
        </UserDataContext.Provider>
      );
    });
  };

  if (pageContent) {
    return pageContent;
  }

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className="login-input"
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="login-input"
        />
        <br />
        <button type="submit" className="login-button">
          Login
        </button>
        <span className="error-message">{error}</span>
      </form>
    </div>
  );
};

export default LoginPage;
