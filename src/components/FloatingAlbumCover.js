import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { isMobile } from "react-device-detect";
import sha1 from "crypto-js/sha1";

import { playingTrackIsPaused } from "store/actionCreators";

import Image from "./Image";

import { ReactComponent as IconPlay } from "icons/play.svg";
import { ReactComponent as IconPause } from "icons/pause.svg";

function FloatingAlbumCover() {
    const dispatch = useDispatch();
    const history = useHistory();

    // Track and session data from store
    const playingIndex = useSelector((state) => state.session.playing.index);
    const track = useSelector((state) => state.music.tracks.data[playingIndex]);
    const isPaused = useSelector((state) => state.session.playing.isPaused);

    const colors = useSelector((state) => state.color.colors);
    const colorIndex = useSelector((state) => state.color.current);

    // Album cover ID
    // Fallback to example image if no track is playing
    let albumCoverId = "example";
    if (track) albumCoverId = track.id;

    // Goto album of playing track
    const handleGoToAlbum = (e) => {
        e.stopPropagation();
        if (track) {
            const albumId = sha1(
                track.metadata.album + track.metadata.album_artist
            ).toString();
            history.push("/albums/" + albumId);
        }
    };

    // Play/Pause track
    const handlePause = (e) => {
        e.stopPropagation();
        dispatch(playingTrackIsPaused(!isPaused));
    };

    const styles = useSpring({
        from: { height: 0, opacity: 0 },
        to: { height: track ? 200 : 0, opacity: track ? 1 : 0 },
    });

    return (
        <animated.div
            className={`floating-album-cover${
                track && isPaused ? " isPaused" : ""
            }${isMobile ? " isMobile" : ""}${track ? "" : " notrack"}`}
            style={styles}
            onClick={handleGoToAlbum}
        >
            <Image
                src={`${process.env.REACT_APP_API}/tracks/${albumCoverId}/cover/400`}
                fallback={`fallback--album-cover`}
                alt="album-cover"
                draggable="false"
            />
            <div className="icon" onClick={handlePause}>
                {isPaused ? (
                    <IconPlay fill={colors[colorIndex]} />
                ) : (
                    <IconPause fill={colors[colorIndex]} />
                )}
            </div>
        </animated.div>
    );
}

export default FloatingAlbumCover;
