import axios from "axios";
import react from "react";
import { adminActions } from "../store/adminslice";
import { userActions } from "../store/userSlice";

const checkLoggedIn = async (navigate, dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  const user = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/v1/users/checkauth`,
    null,
    {
      headers: { "auth-token": token },
    }
  );
  // console.log(user);
  if (user.data.isAdmin) {
    dispatch(userActions.loggedIn(user.data.userData));
    dispatch(adminActions.loggedIn());
    navigate("/admin/data");
  } else if (user.data.isUser) {
    dispatch(userActions.loggedIn(user.data.userData));
    navigate("/");
  }
  // console.log(user);
};

export default checkLoggedIn;
