import React from "react";
import { useSpring, animated } from "react-spring";

function AFCBackground(props) {
    const colors = ["#d5f1ff", "#cdfff5", "#cdffda", "#fcffcd", "#ffeecd", "#ffcde8", "#fccdff", "#d5e0ff"];
    const color = colors[Math.floor(Math.random() * colors.length)]

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
