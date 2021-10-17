import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTrail, animated } from "react-spring";

function NavLinks() {
    const links = [];
    if (window.innerWidth > 600) {
        links.push("home", "albums", "tracks", "playlists");
    } else {
        links.push("home", "albums", "playlists");
    }

    const [activeLink, setActiveLink] = useState("home");

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") return setActiveLink("home");
        setActiveLink(location.pathname.substring(1).split("/")[0]);
    }, [location]);

    // Animation
    const config = { mass: 5, tension: 2000, friction: 200 };
    const trail = useTrail(links.length, {
        config,
        opacity: 1,
        x: 0,
        from: { opacity: 0, x: 20 },
    });

    return (
        <div className={`navlinks`}>
            <div className="navlinks-content">
                {trail.map(({ x, ...rest }, index) => {
                    let link = links[index];
                    let isActive = false;
                    let linkPath = link;

                    if (link === "home") linkPath = "";
                    if (link === activeLink) isActive = true;

                    return (
                        <animated.div
                            className={`navlinks-link${
                                isActive ? " active" : ""
                            }`}
                            key={links[index]}
                            style={{
                                ...rest,
                                transform: x.interpolate(
                                    (x) => `translate3d(0,${x}px,0)`
                                ),
                            }}
                        >
                            <Link to={`/${linkPath}`}>
                                <span>{link}</span>
                            </Link>
                        </animated.div>
                    );
                })}
            </div>
        </div>
    );
}

export default NavLinks;
