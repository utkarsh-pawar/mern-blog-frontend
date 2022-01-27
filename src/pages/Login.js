import React, { useState, useEffect } from "react";
import styles from "../styles/Login.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import checkLoggedIn from "../assets/check";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    checkLoggedIn(navigate, dispatch);
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/users/login`,
        {
          email: email,
          password: password,
        }
      );
      dispatch(userActions.loggedIn(user.data));
     
      localStorage.setItem("token", user.data.token);
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log(err.message);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className={styles.login}>
        <div className={styles["login-card"]}>
          <h1>Login</h1>
          <p>Lets Login to create awesome content</p>
          <form onSubmit={loginHandler}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.password}
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          <span> ------or-------</span>
          <div className={styles["login-card__redirect"]}>
            <div>
              <h4>Create an account. </h4>
              <Link to="/register">Sign up</Link>
            </div>
            <div>
              <h4>Read posts anonymously</h4>
              <Link to="/">Click here.</Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Login;
