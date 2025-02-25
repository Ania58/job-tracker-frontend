import React, { useState, useContext } from "react";
import API from "../../api/axios";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; 

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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
             <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Login</h2>
                {error && <p className="text-red-500 text-center mb-2">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">
                            Log In
                    </button>
                    <hr className="my-4" />
                    <button 
                        onClick={handleGoogleLogin} 
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition cursor-pointer">
                        <FcGoogle className="text-xl" />Sign in with Google
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account? 
                    <button 
                        onClick={() => navigate("/register")} 
                        className="text-blue-600 hover:underline ml-1 cursor-pointer">
                            Sign in here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;