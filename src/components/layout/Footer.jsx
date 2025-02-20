import React from "react";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer>
            <p>All rights reserved JobSync © {year} </p>
        </footer>
    )
};

export default Footer;