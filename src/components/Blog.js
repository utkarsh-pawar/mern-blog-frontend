import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Blog.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { motion } from "framer-motion";
import DeleteModal from "./DeleteModal";

const Blog = ({ userID, title, image, desc, createdAt }) => {
  const [deletable, setDeletable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const date = new Date(createdAt);
  const dateString = date.toDateString();
  const userData = useSelector((state) => state.user.userData);
  console.log(userData);
  console.log(userID);
  useEffect(() => {
    if (userData.userID === userID) {
      setDeletable(true);
    }
  }, []);
  const singleBlogHandler = () => {};

  const deleteHandler = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delayChildren: 0.5 }}
    >
      {showModal && (
        <DeleteModal showModal={showModal} setShowModal={setShowModal} />
      )}
      <div className={styles.blog} onClick={singleBlogHandler}>
        <div className={styles["blog-desc"]}>
          <h1>{title}</h1>
          <p>{desc}</p>
          <span>{dateString}</span>
          {deletable && (
            <div className={styles["blog-delete"]} onClick={deleteHandler}>
              <MdDeleteOutline />
            </div>
          )}
        </div>
        <div className={styles["blog-img"]}>
          <img width={200} src={`${process.env.BASE_URL}/${image}`} alt="" />
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;
