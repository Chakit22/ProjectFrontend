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

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "signUp"));
  }, [data, touched]);

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
    if (!Object.keys(errors).length) {
      const { confirmPassword, ...newData } = data;
      console.log(newData);
      const urlApi = "https://itis-assignment.vercel.app/users/register";
      const checkingToastId = toast.info("Checking data...", {
        autoClose: false,
      });
      axios
        .post(urlApi, newData)
        .then((response) => {
          toast.dismiss(checkingToastId);
          if (response.status === 200) {
            // navigate("/login");
            notify("You signed Up successfully", "success");

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
      notify("Please Check fileds again", "error");
      setTouched({
        firstname: true,
        lastname: true,
        email: true,
        password: true,
        confirmPassword: true,
        role: true,
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
        <h2>Sign Up</h2>
        <div>
          <div
            className={
              errors.firstname && touched.firstname
                ? styles.unCompleted
                : !errors.firstname && touched.firstname
                ? styles.completed
                : undefined
            }
          >
            <input
              type="text"
              name="firstname"
              value={data.firstname}
              placeholder="First Name"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            <img src={userIcon} alt="" />
          </div>
          {errors.firstname && touched.firstname && (
            <span className={styles.error}>{errors.firstname}</span>
          )}
        </div>
        <div>
          <div
            className={
              errors.lastname && touched.lastname
                ? styles.unCompleted
                : !errors.lastname && touched.lastname
                ? styles.completed
                : undefined
            }
          >
            <input
              type="text"
              name="lastname"
              value={data.lastname}
              placeholder="Last Name"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            <img src={userIcon} alt="" />
          </div>
          {errors.lastname && touched.lastname && (
            <span className={styles.error}>{errors.lastname}</span>
          )}
        </div>
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
          <div
            className={
              errors.password && touched.password
                ? styles.unCompleted
                : !errors.password && touched.password
                ? styles.completed
                : undefined
            }
          >
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
          {errors.password && touched.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>
        <div>
          <div
            className={
              errors.confirmPassword && touched.confirmPassword
                ? styles.unCompleted
                : !errors.confirmPassword && touched.confirmPassword
                ? styles.completed
                : !errors.confirmPassword && touched.confirmPassword
                ? styles.completed
                : undefined
            }
          >
            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              placeholder="Confirm Password"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            <img src={passwordIcon} alt="" />
          </div>
          {errors.confirmPassword && touched.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword}</span>
          )}
        </div>
        <div>
          <div
            className={
              errors.role && touched.role
                ? styles.unCompleted
                : !errors.role && touched.role
                ? styles.completed
                : undefined
            }
          >
            <select
              name="role"
              value={data.role}
              onChange={changeHandler}
              onFocus={focusHandler}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          {errors.role && touched.role && (
            <span className={styles.error}>{errors.role}</span>
          )}
        </div>
        <div>
          <button type="submit">Create Account</button>
          <span
            style={{
              color: "#a29494",
              textAlign: "center",
              display: "inline-block",
              width: "100%",
            }}
          >
            Already have a account? <Link to="/login">Sign In</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
