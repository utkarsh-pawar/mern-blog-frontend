import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Blog.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import { motion } from "framer-motion";
import DeleteModal from "./DeleteModal";
import ImgZoom from "./ImgZoom";

const Blog = ({ blogId, userID, title, image, desc, createdAt }) => {
  const [deletable, setDeletable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const date = new Date(createdAt);
  const dateString = date.toDateString();
  const userData = useSelector((state) => state.user.userData);
  useEffect(() => {
    if (userData.userID === userID) {
      setDeletable(true);

      // console.log(blogId);
    }
  }, []);

  const singleBlogHandler = () => {};

  const deleteHandler = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const modalOpenHandler = () => {
    setShowImage(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delayChildren: 0.5 }}
    >
      {showImage && (
        <ImgZoom
          imgUrl={image}
          showImage={showImage}
          setShowImage={setShowImage}
        />
      )}
      {showModal && <DeleteModal blogId={blogId} setShowModal={setShowModal} />}
      <div className={styles.blog} onClick={singleBlogHandler}>
        <div className={styles["blog-desc"]}>
          <h1>{title}</h1>
          <p>{desc.slice(0, 200)}</p>
          <span>{dateString}</span>
          {deletable && (
            <div className={styles["blog-delete"]} onClick={deleteHandler}>
              <AiOutlineDelete />
            </div>
          )}
        </div>
        <motion.div
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.035 }}
          onClick={modalOpenHandler}
          style={{ background: `url(${image})` }}
          className={styles["blog-img"]}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default Blog;
