import React, { useContext }  from "react";
import { Link, useLocation  } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import Logout from "../auth/Logout";

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const location = useLocation();
    return (
        <header>
            <h2>JobSync</h2>
            <nav>
               {location.pathname !== "/" && <Link to="/">Home</Link> }| 
            {!user ? (
                    <>
                        <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
                    </>
                ) : (
                    <>
                         <Link to="/add-job">Add a job</Link> |
                         <Link to="/my-jobs">My Jobs</Link> |
                         <Logout /> 
                    </>
                )}
            </nav>
        </header>
    )
};

export default Header;