import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

export default function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const [password, setPassword] = useState("");
  const [passwordControl, setPasswordControl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    if (password !== passwordControl) {
      setErrorMessage("Passwords don't match");
    } else {
      setErrorMessage(undefined);
    }
    // eslint-disable-next-line
  }, [passwordControl, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup({
        username: user.username,
        email: user.email,
        password1: password,
        password2: passwordControl,
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to create user account");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-titles block">
        <h3>Hello Walker!</h3>
        <p>Your great adventure starts now!</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="signin-form block transparent-card-background"
      >
        <div>
          <label>Username</label>
          <input
            required
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            required
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Repeat the password</label>
          <input
            required
            type="password"
            name="passwordControl"
            value={passwordControl}
            onChange={(e) => setPasswordControl(e.target.value)}
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
