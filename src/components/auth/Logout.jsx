import React, { useContext } from "react";
import API from "../../api/axios"; 
import { UserContext } from "../context/UserProvider";

const Logout = () => {
  const { setUser } = useContext(UserContext);
  const handleLogout = async () => {
    try {
      const response = await API.get("/auth/logout", { withCredentials: true }); 
      window.location.reload();
      setUser(null); 
    } catch (error) {
      console.error("Logout error:", error.response?.data || error);
    }
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default Logout;