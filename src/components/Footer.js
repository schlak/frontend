import React from "react";
import { useSelector } from "react-redux";

function Footer() {
    const playingIndex = useSelector((state) => state.session.playing.index);
    const track = useSelector((state) => state.music.tracks.data[playingIndex]);

    const styles = { marginBottom: 120 };

    // Change Footer margin if a track is playing.
    // This is to keep the margin consistent when the AudioControlBar is active
    if (track) {
        styles.marginBottom = 120 + 70;
    }

    return (
        <div className="footer" style={styles}>
            <hr />
            <p>
                Music Library <small>@ {new Date().getFullYear()}</small>
            </p>
        </div>
    );
}

export default Footer;
