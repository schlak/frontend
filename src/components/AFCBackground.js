import React, { useState, useEffect } from "react";
import {useSpring, animated} from "react-spring";

function AFCBackground(props) {
    const colors = ["#D5F1FF", "#FFE1FA", "#E9FFFA", "#FFFFE1"];
    const [color, setSolor] = useState("#FFF");

    useEffect(() => {
        setSolor(
            colors[Math.floor(Math.random() * colors.length)]
        );
    }, [colors, props]);

    const styles = useSpring({
        from: {height: 0, opacity: 0, backgroundColor: "#ffffff"},
        to: {height: 420, opacity: 1, backgroundColor: color}
    });

    return (
        <animated.div
            className="afc-background"
            style={styles}
        >
        </animated.div>
    );
}

export default AFCBackground;
