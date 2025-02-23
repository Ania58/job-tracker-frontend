import React, { useState, useContext } from "react";
import API from "../../api/axios";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await API.post("/auth/login", formData, { withCredentials: true });
            console.log("Login successful:", response.data);
            setUser(response.data.user);
            navigate("/");
        } catch (error) {
            console.error("Login error:", error.response?.data || error);
            setError("Invalid credentials. Please try again.");
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`; 
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
                <hr />
                <button onClick={handleGoogleLogin} style={{ marginTop: "10px" }}>
                    Sign in with Google
                </button>
            </form>
            <p>
                Don't have an account? <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", color: "blue", textDecoration: "underline", cursor: "pointer" }}>Sign in here</button>
            </p>
        </div>
    );
};

export default Login;