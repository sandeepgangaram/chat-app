import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import loginImage from "../../assets/images/login.svg";
import "./Auth.scss";
import { login } from "../../store/actions/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();

  const onSumbit = (e) => {
    e.preventDefault();

    dispatch(login({ email, password }, history));
  };
  return (
    <div id="auth-container">
      <div id="auth-card">
        <div className="card-shadow">
          <div id="image-section">
            <img src={loginImage} alt="Login" />
          </div>
          <div id="form-section">
            <h2>Welcome back</h2>

            <form onSubmit={onSumbit}>
              <div className="input-field">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="input-field">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  type="password"
                  placeholder="Password"
                />
              </div>

              <button type="submit">LOGIN</button>
            </form>

            <p>
              Don't have an account? <Link to="/register">Register Now!</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
