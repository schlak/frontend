import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import { isMobile } from "react-device-detect";

import { playingTrackIsPaused } from "../store/actionCreators";

import Icon from "./Icon";

function FloatingAlbumCover() {
    const dispatch = useDispatch();

    // Track and session data from store
    const playingIndex = useSelector((state) => state.session.playing.index);
    const track = useSelector((state) => state.music.tracks.data[playingIndex]);
    const isPaused = useSelector((state) => state.session.playing.isPaused);

    // Album cover ID
    // Fallback to example image if no track is playing
    let albumCoverId = "example";
    if (track) albumCoverId = track.id;

    // OnClick handler
    // Play/Pause track
    const handleClick = (e) => {
        // Pause track
        dispatch(
            playingTrackIsPaused(!isPaused)
        );
    };

    const styles = useSpring({
        from: {height: 0, opacity: 0},
        to: {height: track ? 200 : 0, opacity: track ? 1 : 0}
    });

    return (
        <animated.div
            className={`floating-album-cover${track && isPaused ? " isPaused" : ""}${isMobile ? " isMobile" : ""}${track ? "" : " notrack"}`}
            style={styles}
            onClick={handleClick}
        >
            <img
                src={`${process.env.REACT_APP_API}/tracks/${albumCoverId}/cover/200`}
                alt="album-cover"
                draggable="false"
            />
            <div className="icon">
                {
                    isPaused ?
                    <Icon name="play" /> :
                    <Icon name="pause" />
                }
            </div>
        </animated.div>
    );
}

export default FloatingAlbumCover;
