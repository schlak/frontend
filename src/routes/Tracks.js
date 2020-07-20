import React from "react";
import { useSpring, animated } from "react-spring";

import TrackList from "../components/TrackList/TrackList";

function Tracks() {
    const styles = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    });

    return (
        <>
            <animated.div className="Tracks container" style={styles}>
                <section>
                    <h2>Tracks</h2>
                    <TrackList />
                </section>
            </animated.div>
        </>
    );
}

export default Tracks;
