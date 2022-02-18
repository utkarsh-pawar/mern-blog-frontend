import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Blog from "../components/Blog";
import Header from "../components/Header";
import { motion } from "framer-motion";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  // const [blogCount, setBlogCount] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/blogs/`)
      .then((result) => {
        const data = result.data;
        // console.log(data);
        setBlogs(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.home}>
        <Header />
        <div className={styles["home-container"]}>
          <div className={styles["home-landing"]}>
            <div className={styles["home-landing__image"]}></div>
            <div className={styles["home-landing__desc"]}>
              <h1>Welcome to Small Post</h1>
              <h3>A Blogging site for community of users</h3>
            </div>
          </div>
          <div className={styles["home-blogs"]}>
            {blogs.map((blog) => {
              return (
                <Blog
                  userID={blog.userID}
                  key={blog._id}
                  title={blog.title}
                  image={blog.img}
                  createdAt={blog.createdAt}
                  desc={blog.content}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
