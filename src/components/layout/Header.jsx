import React, { useContext }  from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import Logout from "../auth/Logout";

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    return (
        <header>
            <h2>JobSync</h2>
            <nav>
            {!user ? (
                    <>
                        <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
                    </>
                ) : (
                    <>
                         <Link to="/add-job">Add a job</Link> |
                         <Logout /> 
                    </>
                )}
            </nav>
        </header>
    )
};

export default Header;