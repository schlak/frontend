import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    playNextTrackBasedOnSession,
    playingTrackIsPaused,
    shuffleToggle
} from "../../store/actionCreators";

function Controls() {
    const dispatch = useDispatch();

    const session = useSelector((state) => state.session);
    const shuffle = session.actions.shuffle;

    const handleShuffleToggle = () => {
        dispatch(shuffleToggle());
    };

    const handlePause = () => {
        const isPaused = !session.playing.isPaused;
        dispatch(playingTrackIsPaused(isPaused));
    }

    return (
        <div className="controls">
            <div className="control-group">
                <div className="control-button previous" onClick={() => { dispatch(playNextTrackBasedOnSession(false)) }}>
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z" />
                    </svg>
                </div>
                <div className="control-button playpause" onClick={() => { handlePause() }}>
                    <svg viewBox="0 0 24 24">
                        {
                            // Render play/pause button
                            !session.playing.isPaused ?
                            <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" /> :
                            <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                        }
                    </svg>
                </div>
                <div className="control-button next" onClick={() => { dispatch(playNextTrackBasedOnSession(true)) }}>
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z" />
                    </svg>
                </div>
            </div>
            <div className={`control-button shuffle${shuffle ? " selected" : ""}`} onClick={handleShuffleToggle}>
                <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M14.83,13.41L13.42,14.82L16.55,17.95L14.5,20H20V14.5L17.96,16.54L14.83,13.41M14.5,4L16.54,6.04L4,18.59L5.41,20L17.96,7.46L20,9.5V4M10.59,9.17L5.41,4L4,5.41L9.17,10.58L10.59,9.17Z" />
                </svg>
            </div>
        </div>
    );
}

export default Controls;
