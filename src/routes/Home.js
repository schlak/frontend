import React from "react";
import { useSpring, animated } from "react-spring";

import ActiveUsers from "../components/ActiveUsers";
import RandomSelection from "../components/RandomSelection";

function Home() {
    const styles = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    });

    return (
        <>
            <animated.div className="Home container" style={styles}>
                <section>
                    <RandomSelection />
                </section>
                <section>
                    <ActiveUsers />
                </section>
            </animated.div>
        </>
    );
}

export default Home;
