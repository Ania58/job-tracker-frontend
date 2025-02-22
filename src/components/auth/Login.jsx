import React, { useState } from "react";
import API from "../../api/axios";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await API.post("/auth/login", formData, { withCredentials: true });
            console.log("Login successful:", response.data);
            alert("Login Successful!");
        } catch (error) {
            console.error("Login error:", error.response?.data || error);
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
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
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default Login;