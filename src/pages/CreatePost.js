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

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(undefined);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setMessage("");

    if (!isUser) {
      navigate("/login");
    }
  }, []);

  const createPostHandler = async (e) => {
    try {
      e.preventDefault();


  
      const bodyFormData = new FormData();
      bodyFormData.append("title", title);
      bodyFormData.append("content", content);
      bodyFormData.append("img", image);
      // console.log(image);

      const token = await userData.token;
      const post = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/blogs`,
        bodyFormData,
        { headers: { auth: token, "content-type": "multipart/form-data" } }
      );
      if (post.data) {
        setMessage("post created successfully");
        setContent("");
        setTitle("");
        setImage({ name: "" });
      }
      // console.log(post.data);
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
          {!message ? (
            <>
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
                {/* {console.log(image)} */}
                <input
                  type="file"
                  name="uploadImage"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/png, image/jpeg"
                />

                <button type="submit">Post</button>
              </form>
            </>
          ) : (
            <div className={styles["center-msg"]}>
              <motion.div
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                Post Created Successfully!
                <br />
                 <button onClick={() => setMessage(undefined)}>click here</button> to go back to post creation page.
                
              </motion.div>
            </div>
          )}
        </section>
        {/* <div>{userData.userID}</div> */}
      </div>
    </motion.div>
  );
};

export default CreatePost;
