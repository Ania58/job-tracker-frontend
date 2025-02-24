import React from "react";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-blue-600 text-white text-center py-4 mt-10 shadow-lg">
            <p className="text-sm md:text-base font-light">All rights reserved JobSync © {year} </p>
        </footer>
    )
};

export default Footer;