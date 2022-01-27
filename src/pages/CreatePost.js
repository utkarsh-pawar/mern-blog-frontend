import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import styles from "../styles/CreatePost.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreatePost = () => {
  const userData = useSelector((state) => state.user.userData);
  const isUser = useSelector((state) => state.user.isUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isUser) {
      navigate("/login");
    }
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [post, setPost] = useState();

  const createPostHandler = async (e) => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("title", title);
      bodyFormData.append("content", content);
      bodyFormData.append("img", image);
      console.log(image);

      const token = userData.token;
      e.preventDefault();
      const post = await axios.post(
        "http://localhost:5000/api/v1/blogs/",
        bodyFormData,
        { headers: { auth: token, "content-type": "multipart/form-data" } }
      );
      setPost(post);
      console.log(post.data);
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
      <div className={styles.post}>
        <Header />
        <section className={styles["post-container"]}>
          <h1>Create a Blog Post</h1>
          <form
            encType="multipart/form"
            method="POST"
            onSubmit={createPostHandler}
          >
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title of post"
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your blog here"
              cols="30"
              rows="10"
            />
            <input
              type="file"
              name="uploadImage"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/png, image/jpeg"
            />
            <button type="submit">Post</button>
          </form>
        </section>
        {/* <div>{userData.userID}</div> */}
      </div>
    </motion.div>
  );
};

export default CreatePost;
