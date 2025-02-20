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
      };

      return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input 
                 type="email" 
                 name="email"
                 placeholder="Email"
                 value={formData.email}
                 onChange={handleChange}
                 required
                />
                <input 
                 type="password" 
                 name="password"
                 placeholder="Password"
                 value={formData.password}
                 onChange={handleChange}
                 required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
      );
};

export default Register;