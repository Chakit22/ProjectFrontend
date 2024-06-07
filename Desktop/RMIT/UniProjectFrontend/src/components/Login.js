import React, { useState } from "react";
import emailIcon from "../img/email.svg";
import passwordIcon from "../img/password.svg";
import styles from "./SignUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({});

  const chaeckData = (obj) => {
    const { email, password } = obj;
    const urlApi = "https://university-project-backend.vercel.app//users/login";
    const requestData = { email: email.toLowerCase(), password };
    axios
      .post(urlApi, requestData)
      .then((response) => {
        if (response.status === 200) {
          const { token, role } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("userRole", role);
          notify("You logged in to your account successfully", "success");
          navigate("/home");
        } else {
          notify("Your password or your email is wrong", "error");
        }
      })
      .catch((error) => {
        notify("Something went wrong!", "error");
      });
  };

  const changeHandler = (event) => {
    if (event.target.name === "IsAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    chaeckData(data);
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.formLogin}
        onSubmit={submitHandler}
        autoComplete="off"
      >
        <h2>Sign In</h2>
        <div>
          <div>
            <input
              type="text"
              name="email"
              value={data.email}
              placeholder="E-mail"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            <img src={emailIcon} alt="" />
          </div>
        </div>
        <div>
          <div>
            <input
              type="password"
              name="password"
              value={data.password}
              placeholder="Password"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            <img src={passwordIcon} alt="" />
          </div>
        </div>

        <div>
          <button type="submit">Login</button>
          <span
            style={{
              color: "#a29494",
              textAlign: "center",
              display: "inline-block",
              width: "100%",
            }}
          >
            Don't have a account? <Link to="/signup">Create account</Link>
          </span>
          <span
            style={{
              color: "#a29494",
              textAlign: "center",
              display: "inline-block",
              width: "100%",
              marginTop: "15px",
            }}
          >
            Forgot Password? <Link to="/forgotPassword">Reset Password</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
