import React from "react";
import { useSelector } from "react-redux";

function TrackInfo({ isFixedToTop }) {
    // Get session state from store
    const session = useSelector((state) => state.session);
    const track = session.playing.track;
    const trackStatus = session.playing.status;
    let statusCompletedPercentage = 0;

    if (track.id && typeof trackStatus.duration === "number") {
        statusCompletedPercentage = (trackStatus.position / trackStatus.duration) * 100;
    }

    // Scroll to playing track
    const handleScrollToTrack = () => {
        if (track.id) {
            const $track = document.getElementById(track.id);
            $track.scrollIntoView();
        }
    }

    return (
        <div className={`track-status-info${isFixedToTop ? " fixed--top" : ""}`} onClick={handleScrollToTrack}>
            <p className="track-title">{track.metadata.title}</p>
            <p className="track-artist">{track.metadata.artist}</p>
            <div className="track-status-completion" style={{width: `${statusCompletedPercentage}%`}}></div>
        </div>
    );
}

export default TrackInfo;
