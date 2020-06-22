import React from "react";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

function TrackInfo({ isFixedToTop }) {
    // Get session state from store
    const session = useSelector((state) => state.session);
    const track = session.playing.track;
    const trackStatus = session.playing.status;
    let statusCompletedPercentage = 0;

    if (track.id && typeof trackStatus.duration === "number") {
        statusCompletedPercentage = (trackStatus.position / trackStatus.duration) * 100;

        // Reduce # of DOM changes on mobile/tablet by
        // flooring result to an integer
        if (isMobile) {
            statusCompletedPercentage = Math.floor(statusCompletedPercentage);
        }
    }

    // Scroll to playing track
    const handleScrollToTrack = () => {
        if (track.id) {
            const $track = document.getElementById(track.id);
            if ($track) {
                const y = $track.getBoundingClientRect().top + window.pageYOffset - 150;
                window.scrollTo({ top: y });
                // $track.scrollIntoView();
            }
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
