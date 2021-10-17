import React from "react";
import { useSpring, animated } from "react-spring";

function AFCBackground({ color }) {
    const styles = useSpring({
        from: { height: 0, opacity: 0, backgroundColor: "#ffffff" },
        to: { height: 420, opacity: 0.5, backgroundColor: color },
    });

    return (
        <animated.div className="afc-background" style={styles}></animated.div>
    );
}

export default AFCBackground;
