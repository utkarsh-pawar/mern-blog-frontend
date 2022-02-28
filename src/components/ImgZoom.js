import React from "react";
import "../App.css";
import { GoX } from "react-icons/go";
import { motion } from "framer-motion";

const ImgZoom = ({ imgUrl, showImage, setShowImage }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="modal"
    >
      <div className="modal-backdrop"></div>
      <div className="modal-content">
        <div
          style={{
            background: `url(${imgUrl})`,
          }}
        >
          <GoX onClick={() => setShowImage(false)} className="cancel" />
        </div>
      </div>
    </motion.div>
  );
};

export default ImgZoom;
