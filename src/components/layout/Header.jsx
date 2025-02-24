import React, { useContext, useState }  from "react";
import { Link, useLocation  } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import Logout from "../auth/Logout";
import { HomeIcon, PlusCircleIcon, BriefcaseIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"; 

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

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
                <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
                </button>
            </div>
            {menuOpen && (
                <div className="md:hidden bg-blue-700 p-4 flex flex-col space-y-4">
                {location.pathname !== "/" && (
                    <Link to="/" className="flex items-center space-x-1 hover:text-gray-300 cursor-pointer" onClick={() => setMenuOpen(false)}>
                        <HomeIcon className="h-5 w-5" />
                        <span>Home</span>
                    </Link>
                )}

                {!user ? (
                    <>
                    <Link to="/register" className="hover:text-gray-300 cursor-pointer" onClick={() => setMenuOpen(false)}>Register</Link>
                    <Link to="/login" className="hover:text-gray-300 cursor-pointer" onClick={() => setMenuOpen(false)}>Login</Link>
                    </>
                ) : (
                    <>
                    <Link to="/add-job" className="flex items-center space-x-1 hover:text-gray-300 cursor-pointer" onClick={() => setMenuOpen(false)}>
                        <PlusCircleIcon className="h-5 w-5" />
                        <span>Add a Job</span>
                    </Link>

                    <Link to="/my-jobs" className="flex items-center space-x-1 hover:text-gray-300 cursor-pointer" onClick={() => setMenuOpen(false)}>
                        <BriefcaseIcon className="h-5 w-5" />
                        <span>My Jobs</span>
                    </Link>

                    <Logout />
                    </>
                )}
                </div>
            )}
        </header>
    )
};

export default Header;