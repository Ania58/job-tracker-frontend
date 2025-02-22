import React from "react";
import API from "../../api/axios"; 

const Logout = ({ setUser }) => {
  const handleLogout = async () => {
    try {
      await API.get("/auth/logout", { withCredentials: true }); 
      setUser(null); 
    } catch (error) {
      console.error("Logout error:", error.response?.data || error);
    }
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default Logout;