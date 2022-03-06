import React from "react";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

import Slider from "components/Slider";

function AudioPositionElement() {
    const audioRef = useSelector((state) => state.session.playing.audioRef);
    const trackStatus = useSelector((state) => state.session.playing.status);

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

    const handleHitbox = (value) => {
        if (
            !audioRef?.current ||
            !audioRef?.current?.duration ||
            (!value && value !== 0)
        )
            return false;

        const newPosition = (audioRef.current.duration / 100) * value;
        audioRef.current.currentTime = newPosition;
    };

    return (
        <>
            <div className="audio-position-selection-hitbox">
                <Slider
                    style={{ width: "100%", padding: "10px" }}
                    value={statusCompletedPercentage}
                    isFaded={false}
                    transition={true}
                    onChange={handleHitbox}
                />
            </div>
        </>
    );
}

export default AudioPositionElement;
