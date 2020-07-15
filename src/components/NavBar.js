import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {useSpring, animated} from "react-spring";

import Icon from "./Icon";
import SearchBar from "./SearchBar";

function NavBar() {
    const [onScroll, setOnScroll] = useState(false);

    // Show title or search-bar
    const [showTitle, setShowTitle] = useState(true);
    const location = useLocation();

    // Show main title ("Music Library") if path is "/"
    // else show search-bar
    useEffect(() => {
        if (location.pathname === "/") {
            setShowTitle(true);
        } else {
            setShowTitle(false);
        }
    }, [location]);

    const handleScroll = () => {
        if (window.pageYOffset > 100) {
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
        }
    }, []);

    const animateTitle = useSpring({
        from: {marginTop: 48, paddingBottom: 10, opacity: 1},
        to: {marginTop: showTitle ? 48 : -34, opacity: showTitle ? 1 : 0}
    });

    const animateSearchBar = useSpring({
        from: {opacity: 0},
        to: {opacity: showTitle ? 0 : 1}
    });

    return (
        <div className={`navbar${onScroll ? " --scroll" : ""}`}>
            <div className="navbar-content container">
                <span className="navbar-logo">
                    <Link to="/">
                        <Icon name="logo" isRounded={true} />
                    </Link>
                </span>
                <div className="navbar-var">
                    <animated.div style={animateTitle}>
                        <h1 className="navbar-title">Music Library</h1>
                    </animated.div>
                    <animated.div style={animateSearchBar}>
                        <SearchBar />
                    </animated.div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
