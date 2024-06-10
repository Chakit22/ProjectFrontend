import React, { useEffect, useState } from "react";
import emailIcon from "../img/email.svg";
import { validate } from "./validate";
import styles from "./SignUp.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { notify } from "./toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "resetPassword"));
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
      const url = `https://university-project-backend.vercel.app/users/resetPassword/${token}`;
      const checkingToastId = toast.info("Changing Password..", {
        autoClose: false,
      });
      axios
        .post(url, data)
        .then((response) => {
          toast.dismiss(checkingToastId);
          if (response.status === 200) {
            notify("Password changed successfully", "success");

            setTimeout(() => {
              navigate("/login"); 
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
      notify("Please Check fields again", "error");
      setTouched({
        password: true,
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
        <h2>Reset Password</h2>
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
              placeholder="New Password"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            <img src={emailIcon} alt="" />
          </div>
          {errors.password && touched.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>

        <div>
          <button type="submit">Reset</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
