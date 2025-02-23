import React, { useContext }  from "react";
import { UserContext } from "../context/UserProvider";

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    return (
        <header>
            <h2>JobSync</h2>
            <nav>
            {!user ? (
                    <>
                        <a href="#">Register</a> | <a href="#">Login</a>
                    </>
                ) : (
                    <>
                        <a href="#">Add a job</a> | 
                        <button onClick={() => setUser(null)}>Logout</button>
                    </>
                )}
            </nav>
        </header>
    )
};

export default Header;