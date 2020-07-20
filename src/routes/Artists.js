import React from "react";
import { useSpring, animated } from "react-spring";

function Artists() {
    const styles = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    });

    return (
        <>
            <animated.div className="Artists container" style={styles}>
                <h2>Artists</h2>
            </animated.div>
        </>
    );
}

export default Artists;
