import { useState, useEffect } from 'react';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import MainPage from './components/layout/MainPage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import API from './api/axios';
import './App.css'

function App() {

  const [showRegister, setShowRegister] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
        try {
            const response = await API.get("/auth/user", { withCredentials: true }); 
            setUser(response.data.user); 
        } catch (error) {
            console.log("No active session", error.response?.data || error);
        } finally {
            setLoading(false); 
        }
    };

    checkUserSession();
}, []);

useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get("user");

    if (userParam) {
        const userData = JSON.parse(decodeURIComponent(userParam));
        setUser(userData);  
        window.history.replaceState({}, document.title, "/"); 
    }
}, []);

if (loading) return <p>Loading...</p>;

  return (
    <>
    <Header />
    <main>
    {user ? (
                    <>
                    <p>Welcome, {user.email}!</p> 
                    <Logout setUser={setUser} />
                    </>
                ) : (
                    <>
                        <button onClick={() => setShowRegister(!showRegister)}>
                            {showRegister ? "Go to Login" : "Go to Register"}
                        </button>
                        {showRegister ? <Register setUser={setUser}/> : <Login />}
                    </>
                )}
                <MainPage />
            </main>
    <Footer />
    </>
  )
}

export default App
