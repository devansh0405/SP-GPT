import React, { useContext, useState } from "react";
import "./Login.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [currState, setcurrState] = useState("Login");
  const navigate = useNavigate();
  const { url, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    year: "",
    branch: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={onLogin} className="login-container">
        <div className="login-title">
          <h2>{currState}</h2>
        </div>
        <div className="login-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <>
              <input
                onChange={onChangeHandler}
                name="name"
                value={data.name}
                type="text"
                placeholder="Your Name"
                required
              />

              <select
                name="branch"
                value={data.branch}
                onChange={onChangeHandler}
                required
              >
                <option value="">Select Branch</option>
                <option value="Comps">Comps</option>
                <option value="CSE">CSE</option>
                <option value="EXTC">EXTC</option>
              </select>

              <select
                name="year"
                value={data.year}
                onChange={onChangeHandler}
                required
              >
                <option value="">Select Year</option>
                <option value="FE">FE</option>
                <option value="SE">SE</option>
                <option value="TE">TE</option>
              </select>
            </>
          )}

          <input
            onChange={onChangeHandler}
            name="email"
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            onChange={onChangeHandler}
            name="password"
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit">
          {currState === "Login" ? "Login" : "Sign Up"}
        </button>

        <div className="login-condition">
          <input type="checkbox" required />
          <p>
            By continuing, I agree to the terms of use and privacy policy.
          </p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setcurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setcurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
