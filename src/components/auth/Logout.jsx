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

  return <button onClick={handleLogout} 
  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 cursor-pointer">
    Log Out</button>;
};

export default Logout;