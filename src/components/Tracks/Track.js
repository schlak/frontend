import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { isSafari, isMobileSafari } from "react-device-detect";

import { playTrack } from "../../store/actionCreators";

import Icon from "../Icon";

function Track({ index, size }) {
    const dispatch = useDispatch();

    // Track and session data from store
    const track = useSelector((state) => state.music.tracks.data[index]);
    const isPaused = useSelector((state) => state.session.playing.isPaused);
    const playingId = useSelector((state) => state.session.playing.track.id);
    const playingDidError = useSelector(
        (state) => state.session.playing.didError
    );

    // Is this track currently playing?
    const isTrackPlaying = track.id === playingId;
    const isTrackPaused = isTrackPlaying && isPaused;

    const didPlayingTrackError = playingDidError;
    const didError = isTrackPlaying && didPlayingTrackError;

    // Play track in session
    const playInSession = (e) => {
        dispatch(playTrack(index));
    };

    // Dynamic class list
    let classList = "";
    classList += size ? ` ${size}` : "";
    classList += isTrackPlaying ? " playing" : "";
    classList += isTrackPaused ? " paused" : "";
    classList += didError ? " error" : "";

    return (
        <div
            id={track.id}
            className={`track${classList}`}
            onClick={playInSession}
        >
            <div className="track-col play-state">
                {isTrackPlaying && !isTrackPaused && !didError ? (
                    <Icon name="pause" />
                ) : (
                    <Icon name="play" />
                )}
            </div>
            <div className="track-col name">
                {track.metadata.title}
                <div className="artist">{track.metadata.artist}</div>
            </div>
            <div className="track-col length">
                {moment.utc(track.metadata.duration * 1000).format("mm:ss")}
            </div>
        </div>
    );
}

export default Track;
