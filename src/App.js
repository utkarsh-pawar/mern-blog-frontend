import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import Register from "./pages/Register";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Home from "./pages/Home";
import axios from "axios";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import checkLoggedIn from "./assets/check";
import CreatePost from "./pages/CreatePost";
import { AnimatePresence } from "framer-motion";
import ImgZoom from "./components/ImgZoom";




const baseURL = "http://localhost:5000/api/v1";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    checkLoggedIn(navigate, dispatch);
  }, []);
  const user = useSelector((state) => state.user.isUser);
  return (
    <>
      <AnimatePresence>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/data" element={<AdminPanel />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post" element={<CreatePost />} />
          <Route path="/test" element={<ImgZoom />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
