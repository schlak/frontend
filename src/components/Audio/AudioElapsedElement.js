import React from "react";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";


function AudioElapsedElement() {
    const audioRef = useSelector((state) => state.session.playing.audioRef);
    const trackStatus = useSelector((state) => state.session.playing.status);
 

    let currentTimeString = new Date(trackStatus.position * 1000).toISOString().substring(14, 19)
    let titleLengthString = new Date(trackStatus.duration * 1000).toISOString().substring(14, 19)

    let statusCompletedPercentage = 0;

    // Calculate progress bar percentage
    if (typeof trackStatus.duration === "number") {
        statusCompletedPercentage =
            (trackStatus.position / trackStatus.duration) * 100;

        statusCompletedPercentage = parseFloat(
            statusCompletedPercentage.toFixed(4)
        );

        // Reduce # of DOM changes on mobile/tablet by
        // flooring result to an integer
        if (isMobile) {
            statusCompletedPercentage = Math.floor(statusCompletedPercentage);
        }
    }

    return (
        <>
            <div className="audio-elepsed">
                <div className="track-col elepsed time">
                    {currentTimeString}
                    <div className="artist">{titleLengthString}</div>
                </div>
            </div>
        </>
    );
}

export default AudioElapsedElement;
