import axios from "axios";
import React, { useState } from "react";
import styles from "../styles/AdminLogin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { adminActions } from "../store/adminslice";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const admin = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/users/adminlogin`,
        {
          email,
          password,
        }
      );
      dispatch(userActions.loggedIn(admin.data));
      dispatch(adminActions.loggedIn());
      localStorage.setItem("token", admin.data.token);
      navigate("/admin/data");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else if (err.request) {
        console.log(err.request.data);
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
        <h1>Admin Login</h1>
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
        <div>
          <h4>Create an account. </h4>
        </div>
      </div>
    </section>
    </motion.div>
  );
};

export default AdminLogin;
