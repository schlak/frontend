import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Icon from "./Icon";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";

function NavBar() {
    const colors = useSelector((state) => state.color.colors);
    const colorIndex = useSelector((state) => state.color.current);

    const [onScroll, setOnScroll] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 50) {
            setOnScroll(true);
        } else {
            setOnScroll(false);
        }
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div className={`navbar${onScroll ? " --scroll" : ""}`}>
                <div className="navbar-content container">
                    <span className="navbar-logo">
                        <Link to="/">
                            <svg version="1.1" viewBox="0 0 24 24">
                                <path
                                    fill={colors[colorIndex]}
                                    d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12,16.5C9.5,16.5 7.5,14.5 7.5,12C7.5,9.5 9.5,7.5 12,7.5C14.5,7.5 16.5,9.5 16.5,12C16.5,14.5 14.5,16.5 12,16.5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                                />
                            </svg>
                        </Link>
                    </span>
                    <div className="navbar-var">
                        <NavLinks />
                    </div>
                </div>
            </div>

            <div style={{ marginTop: "90px" }}></div>

            <div className="navbar-secondary container">
                <h1 className="navbar-title">Music Library</h1>
                <SearchBar />
            </div>
        </>
    );
}

export default NavBar;
