import React from "react";
import styles from "../styles/DeleteModal.module.css";

const DeleteModal = ({ showModal, setShowModal }) => {
  const backdropHandler = (e) => {
    //   console.log(e.stopPropagation());
    setShowModal(false);
    // e.stopPropagation();
  };
  return (
    <div className={styles.modal} >
      <div className={styles["modal-backdrop"]} onClick={backdropHandler}></div>
      <div className={styles["modal-content"]}>
        <button onClick={() => setShowModal(false)}>close</button>
      </div>
    </div>
  );
};

export default DeleteModal;
