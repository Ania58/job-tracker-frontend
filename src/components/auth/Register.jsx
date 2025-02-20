import React, { useState } from "react";
import API from "../../api/axios";

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/register", formData);
            console.log("User registered", response.data);
            alert("Registration Successful.You can log in now.");
            
        } catch (error) {
            console.error("Registration error:", error.response?.data || error);
            alert("Registration failed!");
        }
      }
}