import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import registerImage from "../../assets/images/register.svg";
import "./Auth.scss";
import { useDispatch } from "react-redux";
import { register } from "../../store/actions/auth";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();

  const onSumbit = (e) => {
    e.preventDefault();

    dispatch(
      register({ firstName, lastName, gender, email, password }, history)
    );
  };
  return (
    <div id="auth-container">
      <div id="auth-card">
        <div className="card-shadow">
          <div id="image-section">
            <img src={registerImage} alt="Login" />
          </div>
          <div id="form-section">
            <h2>Create an accounts</h2>
            <form onSubmit={onSumbit}>
              <div className="input-field">
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  required
                  value={firstName}
                  placeholder="First Name"
                />
              </div>
              <div className="input-field">
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                />
              </div>
              <div className="input-field">
                <select
                  name=""
                  id=""
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
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

              <button>REGISTER</button>
            </form>

            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
