import React, { useEffect, useState } from "react";
import { login } from "../../Endpoints/userapi";
import "./login.style.css";
import { useSession, useSessionDispatch } from "../../Contexts/SessionContext";
import { UserForm } from "../../interfaces/User";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [userForm, setUserForm] = useState<UserForm>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userDispatch = useSessionDispatch();
  const userContext = useSession();

  // userData should be a context that all component can be available to use
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({ ...userForm, username: event.target.value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({ ...userForm, password: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // make an api request to example.com/login
    login(userForm).then((response) => {
      if (response === false) {
        setError("Invalid username or password");
        return;
      }

      // set session storage
      localStorage.setItem("userSession", JSON.stringify(response));

      userDispatch({ type: "SET_USER", payload: response });
    });
  };

  useEffect(() => {
    if (userContext.token) {
      navigate("/home/bar");
    }
  }, [userContext, navigate]);

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={userForm.username}
          onChange={handleUsernameChange}
          className="login-input"
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={userForm.password}
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
