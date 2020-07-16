import React from "react";
import { useSpring, animated } from "react-spring";

function Tracks() {
    const styles = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    });

    return (
        <>
            <animated.div className="Tracks container" style={styles}>
                <h2>Tracks</h2>
            </animated.div>
        </>
    );
}

export default Tracks;
