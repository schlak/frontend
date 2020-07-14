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

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 100) {
                setOnScroll(true);
            } else {
                setOnScroll(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <div className={`navbar${onScroll ? " --scroll" : ""}`}>
            <div className="navbar-content">
                <span className="navbar-logo">
                    <a href="/">
                        <Icon name="logo" isRounded={true} />
                    </a>
                </span>
                <div className="navbar-var">
                    {$content}
                </div>
            </div>
        </div>
    );
}

export default NavBar;
