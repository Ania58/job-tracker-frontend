import React, { useState } from "react";
import API from "../../api/axios";

const Register = ({setUser}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");  

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await API.post("/auth/register", formData, { withCredentials: true });
            console.log("User registered", response.data);
            setUser(response.data.user);  
            
        } catch (error) {
            console.error("Registration error:", error.response?.data || error);
            if (error.response?.status === 400) {
                setError("User already exists. Try logging in.");
            } else if (error.response?.status === 422) {
                setError("Invalid input. Make sure email and password are correct.");
            } else {
                setError("Registration failed. Please try again.");
            }
        }
      };

      return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>} 
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