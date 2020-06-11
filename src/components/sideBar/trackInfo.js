import React from "react";
import { useSelector } from "react-redux";

function TrackInfo() {
    // Get session state from store
    const session = useSelector((state) => state.session);
    const track = session.playing.track;

    // Scroll to playing track
    const handleScrollToTrack = () => {
        if (track.id) {
            const $track = document.getElementById(track.id);
            $track.scrollIntoView();
        }
    }

    return (
        <div className="track-info" onClick={handleScrollToTrack}>
            <p className="track-title">{track.metadata.title}</p>
            <p className="track-artist">{track.metadata.artist}</p>
        </div>
    );
}

export default TrackInfo;
