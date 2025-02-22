import { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";

const AuthSection = () => {
    const { user, setUser, loading } = useContext(UserContext);
    const [showRegister, setShowRegister] = useState(true);

    if (loading) return <p>Loading...</p>;

    return (
        <>
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
                    {showRegister ? <Register setUser={setUser} /> : <Login />}
                </>
            )}
        </>
    );
};

export default AuthSection;