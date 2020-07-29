import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

import {
    playNextTrackBasedOnSession,
    playingTrackIsPaused,
    playingTrackDidError,
    shuffleToggle,
    repeatToggle,
} from "../store/actionCreators";

import Icon from "./Icon";
import Image from "./Image";

function AudioControlBar() {
    const dispatch = useDispatch();

    // Get session state from store
    const playingIndex = useSelector((state) => state.session.playing.index);
    const track = useSelector((state) => state.music.tracks.data[playingIndex]);
    const isPaused = useSelector((state) => state.session.playing.isPaused);
    const doesShuffle = useSelector((state) => state.session.actions.shuffle);
    const doesRepeat = useSelector((state) => state.session.actions.repeat);
    const volume = useSelector((state) => state.session.playing.status.volume);

    // Play/Pause track
    const handlePause = (e) => {
        e.stopPropagation();
        dispatch(
            playingTrackIsPaused(!isPaused)
        );
    };

    const handlePlayNextTrack = () => {
        dispatch(playNextTrackBasedOnSession(true));
    };

    const handlePlayPreviousTrack = () => {
        dispatch(playNextTrackBasedOnSession(false));
    };

    const handleShuffleToggle = () => dispatch(shuffleToggle());
    const handleRepeatToggle = () => dispatch(repeatToggle());


    const styles = useSpring({
        from: {height: 0, opacity: 0},
        to: {height: track ? 70 : 0, opacity: track ? 1 : 0}
    });

    return (
            <animated.div className="audio-control-bar" style={styles}>
                <div className="audio-control-bar-content container">
                    <div className="track-controls">
                        <div className={`icon${doesShuffle ? " active" : ""}`} onClick={handleShuffleToggle}>
                            <Icon name="shuffle" />
                        </div>
                        <span className="divider"></span>
                        <div className="icon" onClick={handlePlayPreviousTrack}>
                            <Icon name="skip-previous" />
                        </div>
                        <div className="icon" onClick={handlePause}>
                            {
                                isPaused ?
                                <Icon name="play" /> :
                                <Icon name="pause" />
                            }
                        </div>
                        <div className="icon" onClick={handlePlayNextTrack}>
                            <Icon name="skip-next" />
                        </div>
                        <span className="divider"></span>
                        <div className={`icon${doesRepeat ? " active" : ""}`} onClick={handleRepeatToggle}>
                            <Icon name="replay" />
                        </div>
                    </div>
                </div>
            </animated.div>
    );
}

export default AudioControlBar;
