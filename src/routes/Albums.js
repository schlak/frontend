import React from "react";
import { useSpring, animated } from "react-spring";

import AlbumList from "../components/TrackList/AlbumList";

function Albums() {
    const styles = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    });

    return (
        <>
            <animated.div className="Albums container" style={styles}>
                <section>
                    <h2>Albums</h2>
                    <AlbumList />
                </section>
            </animated.div>
        </>
    );
}

export default Albums;
