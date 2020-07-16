import React from "react";
import { useSpring, animated } from "react-spring";

function Albums() {
    const styles = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    });

    return (
        <>
            <animated.div className="Albums container" style={styles}>
                <h2>Albums</h2>
            </animated.div>
        </>
    );
}

export default Albums;
