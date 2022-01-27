import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Blog from "../components/Blog";
import Header from "../components/Header";
import styles from "../styles/Profile.module.css";
import { motion } from "framer-motion";

const Profile = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.user.userData);
  const user = useSelector((state) => state.user.isUser);
  const token = userData.token;
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    const fetchMyPosts = async () => {
      try {
        const data = await axios.get(
          "http://localhost:5000/api/v1/blogs/posts",
          { headers: { auth: token } }
        );
        console.log(data.data);
        setPosts(data.data);
      } catch (error) {
        if (error.response) {
          console.log(error.resposnse.data);
        } else if (error.request) {
          console.log(error.request.data);
        } else {
          console.log(error.message);
        }
      }
    };
    fetchMyPosts();
  }, [user, userData.token]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.profile}>
        <Header />
        <div className={styles["profile-container"]}>
          <div className={styles["profile-posts"]}>
            <h1>Recent Posts</h1>
            {posts.map((post) => {
              return (
                <Blog
                  key={post._id}
                  userID={post.userID}
                  title={post.title}
                  desc={post.content}
                  createdAt={post.createdAt}
                  image={post.img}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
