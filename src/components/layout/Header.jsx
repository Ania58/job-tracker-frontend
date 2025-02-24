import React, { useContext }  from "react";
import { Link, useLocation  } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import Logout from "../auth/Logout";
import { HomeIcon, PlusCircleIcon, BriefcaseIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"; 

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const location = useLocation();
    return (
        <header className="bg-blue-600 text-white py-4 px-6 shadow-md sticky top-0 w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-wide cursor-pointer">JobSync</h2>
                <nav className="hidden md:flex space-x-6">
                {location.pathname !== "/" && 
                    <Link to="/" className="flex items-center space-x-1 hover:text-gray-300 cursor-pointer"> 
                        <HomeIcon className="h-5 w-5" /> 
                        <span>Home</span>
                    </Link> } 
                {!user ? (
                        <>
                            <Link to="/register" className="hover:text-gray-300 cursor-pointer">Register</Link> 
                            <Link to="/login" className="hover:text-gray-300 cursor-pointer">Login</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/add-job" className="flex items-center space-x-1 hover:text-gray-300 cursor-pointer">
                                <PlusCircleIcon className="h-5 w-5" />
                                <span>Add a Job</span>
                            </Link> 
                            <Link to="/my-jobs" className="flex items-center space-x-1 hover:text-gray-300 cursor-pointer">
                                <BriefcaseIcon className="h-5 w-5" />
                                <span>My Jobs</span>
                            </Link> 
                            <Logout /> 
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
};

export default Header;