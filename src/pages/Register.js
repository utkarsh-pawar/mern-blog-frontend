import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Register.module.css";
import checkLoggedIn from "../assets/check";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    checkLoggedIn(navigate, dispatch);
  }, []);

  //   console.log(name, email, password);

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      const user = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/users/signup`,
        {
          name: name,
          password: password,
          email: email,
        }
      );
      console.log(user.data);
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
      <section className={styles.register}>
        <div className={styles["register-card"]}>
          <h1>Register</h1>
          <p>Lets Login to create awesome content</p>
          <form onSubmit={registerHandler}>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
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
            <input
              className={styles.password}
              type="password"
              placeholder="check password"
            />
            <button type="submit">Register</button>
          </form>
          <span> ------or-------</span>
          <div className={styles["register-card__redirect"]}>
            <div>
              <h4>Already have an account? </h4>
              <Link to="/login">Sign In</Link>
            </div>
            <div>
              <h4>Read Posts anonymously </h4>
              <Link to="/">Click Here</Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Register;
