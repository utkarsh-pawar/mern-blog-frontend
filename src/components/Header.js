import React from "react";
import styles from "../styles/Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { adminActions } from "../store/adminslice";
import { NavLink } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.user.isUser);
  const logoutHandler = () => {
    dispatch(userActions.loggedOut());
    dispatch(adminActions.loggedOut());
    localStorage.setItem("token", "");
  };

  return (
    <nav className={styles.header}>
      <div className={styles["header-container"]}>
        <div className={styles["header-logo"]}>
          <span style={{ fontSize: "24px" }}>Small </span>
          <span>Post</span>
        </div>
        <div className={styles["header-links"]}>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/"
            end
          >
            Blogs
          </NavLink>
          {isUser && (
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to="/post"
            >
              create a blog
            </NavLink>
          )}
          {!isUser && (
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to="/login"
            >
              Login/Register
            </NavLink>
          )}
          {isUser && (
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to="/profile"
            >
              profile
            </NavLink>
          )}
          {isUser && <button onClick={logoutHandler}>Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default Header;
