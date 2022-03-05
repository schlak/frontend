import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

function AudioPositionElement(props) {
    const hitboxRef = useRef(null);
    const audioRef = useSelector((state) => state.session.playing.audioRef);
    const trackStatus = useSelector((state) => state.session.playing.status);

    let statusCompletedPercentage = 0;

    // Calculate progress bar percentage
    if (typeof trackStatus.duration === "number") {
        statusCompletedPercentage =
            (trackStatus.position / trackStatus.duration) * 100;

        // Reduce # of DOM changes on mobile/tablet by
        // flooring result to an integer
        if (isMobile) {
            statusCompletedPercentage = Math.floor(statusCompletedPercentage);
        }
    }

    useEffect(() => {
        console.log(audioRef?.current);
    }, []);

    const handleHitbox = (e) => {
        console.log(hitboxRef.current);
    };

    return (
        <>
            <div
                className="audio-position-element"
                style={{ width: `${statusCompletedPercentage}%` }}
            ></div>

            <div
                ref={hitboxRef}
                onClick={handleHitbox}
                className="audio-position-selection-hitbox"
            ></div>
        </>
    );
}

export default AudioPositionElement;
