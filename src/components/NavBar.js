import React, { useState, useEffect } from "react";
import Icon from "./Icon";

function NavBar({ content }) {
    const [onScroll, setOnScroll] = useState(false);
    let $content;

    switch(content) {
        case "search-bar":
            $content = <>wow</>;
            break;

        case "title":
        default:
            $content = <h1 className="navbar-title">Music Library</h1>;
    }

    const handleScroll = () => {
        if (window.pageYOffset > 100) {
            setOnScroll(true);
        } else {
            setOnScroll(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [handleScroll]);

    return (
        <div className={`navbar${onScroll ? " --scroll" : ""}`}>
            <div className="navbar-content">
                <span className="navbar-logo">
                    <Icon name="logo" />
                </span>
                <div className="navbar-var">
                    {$content}
                </div>
            </div>
        </div>
    );
}

export default NavBar;
