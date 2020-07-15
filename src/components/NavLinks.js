import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import { useSpring, animated } from "react-spring";

function NavLinks() {
    const links = ["home", "albums", "artists", "tracks"];
    const [activeLink, setActiveLink] = useState("home");

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") return setActiveLink("home");
        setActiveLink(location.pathname.substring(1));
    }, [location]);

    return (
        <div className={`navlinks`}>
            <div className="navlinks-content container">
                {
                    links.map((link) => {
                        let isActive = false;
                        let linkPath = link;

                        if (link === "home") linkPath = "";
                        if (link === activeLink) isActive = true;

                        return (
                            <div className={`navlinks-link${isActive ? " active" : ""}`}>
                                <Link to={`/${linkPath}`}>
                                    <span>{link}</span>
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default NavLinks;
