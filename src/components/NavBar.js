import React, { useState, useEffect } from "react";
import {useSpring, animated} from "react-spring";

import Icon from "./Icon";
import SearchBar from "./SearchBar";

function NavBar({ content }) {
    const [onScroll, setOnScroll] = useState(false);
    const showTitle = content === "title";

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
            <div className="navbar-content">
                <span className="navbar-logo">
                    <a href="/">
                        <Icon name="logo" isRounded={true} />
                    </a>
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
