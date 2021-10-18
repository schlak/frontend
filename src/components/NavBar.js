import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";

import { ReactComponent as IconLogo } from "../icons/logo.svg";

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
                            <IconLogo fill={colors[colorIndex]} />
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
