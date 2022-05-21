import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import sha1 from "crypto-js/sha1";

import {
    playNextTrackBasedOnSession,
    playingTrackIsPaused,
    shuffleToggle,
    repeatToggle,
    changeVolume,
    muteVolume,
} from "store/actionCreators";

import Image from "../Image";
import Slider from "../Slider";
import AudioPositionElement from "./AudioPositionElement";
import AudioElapsedElement from "./AudioElapsedElement";

import { ReactComponent as IconShuffle } from "icons/shuffle.svg";
import { ReactComponent as IconSkipPrevious } from "icons/skip-previous.svg";
import { ReactComponent as IconSkipNext } from "icons/skip-next.svg";
import { ReactComponent as IconReplay } from "icons/replay.svg";
import { ReactComponent as IconPlay } from "icons/play.svg";
import { ReactComponent as IconPause } from "icons/pause.svg";
import { ReactComponent as IconVolumeHigh } from "icons/volume-high.svg";
import { ReactComponent as IconVolumeMedium } from "icons/volume-medium.svg";
import { ReactComponent as IconVolumeMute } from "icons/volume-mute.svg";

function AudioControlBar(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    // Get session state from store
    const playingIndex = useSelector((state) => state.session.playing.index);
    const track = useSelector((state) => state.music.tracks.data[playingIndex]);
    const isPaused = useSelector((state) => state.session.playing.isPaused);
    const doesShuffle = useSelector((state) => state.session.actions.shuffle);
    const doesRepeat = useSelector((state) => state.session.actions.repeat);
    const volume = useSelector((state) => state.session.playing.status.volume);
    const isMute = useSelector((state) => state.session.playing.status.isMute);

    const colors = useSelector((state) => state.color.colors);
    const colorIndex = useSelector((state) => state.color.current);

    // Album cover ID
    // Fallback to example image if no track is playing
    let albumCoverId = "example";
    if (track) albumCoverId = track.id;

    // Play/Pause track
    const handlePause = (e) => {
        e.stopPropagation();
        dispatch(playingTrackIsPaused(!isPaused));
    };

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

    const handlePlayNextTrack = () => {
        dispatch(playNextTrackBasedOnSession(true));
    };

    const handlePlayPreviousTrack = () => {
        dispatch(playNextTrackBasedOnSession(false));
    };

    const handleVolumeChange = (value) => {
        dispatch(changeVolume(value));
        dispatch(muteVolume(false));
    };

    const handleVolumeMuteToggle = () => {
        if (isMute) {
            dispatch(muteVolume(false));
        } else {
            dispatch(muteVolume(true));
        }
    };

    const handleShuffleToggle = () => dispatch(shuffleToggle());
    const handleRepeatToggle = () => dispatch(repeatToggle());

    const hideFromRender = (render, element) => {
        if (!render || render.includes("all") || render.includes(element))
            return false;
        return true;
    };

    const styles = useSpring({
        from: { height: 0, opacity: 0 },
        to: { height: track ? 70 : 0, opacity: track ? 1 : 0 },
    });

    return (
        <animated.div
            className={`audio-control-bar ${
                props.offset ? "offset" : "default"
            }`}
            style={styles}
        >
            <div className="audio-control-bar-content container">
                {!hideFromRender(props.render, "track") && (
                    <div className="track col" onClick={handleGoToAlbum}>
                        <div className="track-cover">
                            <Image
                                src={`${process.env.REACT_APP_API}/tracks/${albumCoverId}/cover/50`}
                                fallback={`fallback--album-cover`}
                                alt="album-cover"
                                draggable="false"
                            />
                        </div>
                        <div className="track-metadata">
                            {track ? track.metadata.title : "~"}
                            <div className="artist">
                                {track ? track.metadata.artist : "~"}
                            </div>
                        </div>
                    </div>
                )}
                {!hideFromRender(props.render, "controls") && (
                    <div className="controls col">
                        <div
                            className={`icon${doesShuffle ? " active" : ""}`}
                            onClick={handleShuffleToggle}
                        >
                            <IconShuffle fill="#e4e4e4" />
                        </div>
                        <span className="divider"></span>
                        <div className="icon" onClick={handlePlayPreviousTrack}>
                            <IconSkipPrevious fill="#e4e4e4" />
                        </div>
                        <div
                            className={`icon play-pause${
                                isPaused ? " active" : ""
                            }`}
                            onClick={handlePause}
                        >
                            {isPaused ? (
                                <IconPlay fill={colors[colorIndex]} />
                            ) : (
                                <IconPause fill={colors[colorIndex]} />
                            )}
                        </div>
                        <div className="icon" onClick={handlePlayNextTrack}>
                            <IconSkipNext fill="#e4e4e4" />
                        </div>
                        <span className="divider"></span>
                        <div
                            className={`icon${doesRepeat ? " active" : ""}`}
                            onClick={handleRepeatToggle}
                        >
                            <IconReplay fill="#e4e4e4" />
                        </div>
                        <span className="divider"></span>
                        <div className="icon">
                            <AudioElapsedElement fill="#e4e4e4" />
                        </div>
                    </div>
                )}
                {!hideFromRender(props.render, "volume") && (
                    <div className="volume col">
                        <div className="volume-bar">
                            <div
                                className={`volume-icon${
                                    isMute ? " is-faded" : ""
                                }`}
                                onClick={handleVolumeMuteToggle}
                            >
                                {volume >= 50 && !isMute ? (
                                    <IconVolumeHigh />
                                ) : volume > 0 && !isMute ? (
                                    <IconVolumeMedium />
                                ) : (
                                    <IconVolumeMute />
                                )}
                            </div>
                            <div className="volume-slider">
                                <Slider
                                    value={volume}
                                    isFaded={isMute}
                                    onChange={handleVolumeChange}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {!hideFromRender(props.render, "audio-position") && (
                    <AudioPositionElement />
                )}
            </div>
        </animated.div>
    );
}

export default AudioControlBar;
