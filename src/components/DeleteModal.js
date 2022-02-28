import React from "react";
import styles from "../styles/DeleteModal.module.css";
import axios from "axios";

const DeleteModal = ({ blogId, setShowModal }) => {
  const backdropHandler = (e) => {
    //   console.log(e.stopPropagation());
    setShowModal(false);
    // e.stopPropagation();
  };

  const deleteHandler = async (e) => {
    try {
      const token = localStorage.getItem("token");
      e.preventDefault();
       const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/v1/blogs/${blogId}`,
        {
          Headers: {
            auth: token,
          },
        }
      );

      console.log(result);
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
    <div className={styles.modal}>
      <div className={styles["modal-backdrop"]} onClick={backdropHandler}></div>
      <div className={styles["modal-content"]}>
        <div>Do you want to delete this blog?</div>
        <div style={{ alignSelf: "flex-end" }}>
          <button onClick={deleteHandler} className={styles["confirm-btn"]}>
            Confirm
          </button>
          <button
            onClick={() => setShowModal(false)}
            className={styles["cancel-btn"]}
          >
            {" "}
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
