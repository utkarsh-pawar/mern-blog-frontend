import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styles from "../styles/AdminPanel.module.css";
import { motion } from "framer-motion";

const AdminPanel = () => {
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/login");
    }
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.admin}>
        <Header />
        <div className={styles["admin-card"]}>
          <div>asf</div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminPanel;
