import React, { useEffect, useState } from "react";
//Icon
import userIcon from "../img/user.svg";
import emailIcon from "../img/email.svg";
import passwordIcon from "../img/password.svg";
// Validate
import { validate } from "./validate";
// Styles
import styles from "./SignUp.module.css";
import "react-toastify/dist/ReactToastify.css";
// Toast
import { ToastContainer, toast } from "react-toastify";
import { notify } from "./toast";
//
import { Link, useNavigate } from "react-router-dom";
// Axios
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "forgotPassword"));
  }, [data, touched]);

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (Object.keys(errors).length == 1) {
      console.log(data);
      const urlApi = "https://university-project-backend.vercel.app//users/forgotPassword";
      const checkingToastId = toast.info("Checking Data..", {
        autoClose: false,
      });
      axios
        .post(urlApi, data)
        .then((response) => {
          toast.dismiss(checkingToastId);
          if (response.status === 200) {
            // navigate("/login");
            notify("Email sent successfully", "success");

            setTimeout(() => {
              navigate("/login"); // Navigate to login page after 3 seconds
              setTimeout(() => {
                notify("Login to access the Dashboard", "success");
              }, 1000);
            }, 1000);
          } else {
            notify(
              "You have already registered, log in to your account",
              "error"
            );
          }
        })
        .catch((error) => {
          console.log(error);
          notify(error.response.data.message, "error");
        });
    } else {
      console.log(errors);
      notify("Please Check fileds again", "error");
      setTouched({
        email: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.formLogin}
        onSubmit={submitHandler}
        autoComplete="off"
      >
        <h2>Forgot Password</h2>
        <div>
          <div
            className={
              errors.email && touched.email
                ? styles.unCompleted
                : !errors.email && touched.email
                ? styles.completed
                : undefined
            }
          >
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
          {errors.email && touched.email && (
            <span className={styles.error}>{errors.email}</span>
          )}
        </div>

        <div>
          <button type="submit">Forgot Password</button>
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
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
