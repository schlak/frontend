import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import { playTrack, queuePush, queueRemove } from "store/actionCreators";

import { ReactComponent as IconPlay } from "icons/play.svg";
import { ReactComponent as IconPause } from "icons/pause.svg";

function Track({ index, trackNumber, size }) {
    const dispatch = useDispatch();

    // Track and session data from store
    const track = useSelector((state) => state.music.tracks.data[index]);
    const isPaused = useSelector((state) => state.session.playing.isPaused);
    const playingId = useSelector((state) => state.session.playing.track.id);
    const playingDidError = useSelector(
        (state) => state.session.playing.didError
    );
    const queuePosition = useSelector((state) =>
        state.music.tracks.queue.indexOf(index)
    );
    const colors = useSelector((state) => state.color.colors);
    const colorIndex = useSelector((state) => state.color.current);

    // Is this track currently playing?
    const isTrackPlaying = track.id === playingId;
    const isTrackPaused = isTrackPlaying && isPaused;

    const didPlayingTrackError = playingDidError;
    const didError = isTrackPlaying && didPlayingTrackError;

    // Play this track
    const playInSession = (e) => {
        dispatch(playTrack(index));
    };

    // Toggle track in queue
    const handleTrackQueue = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (queuePosition === -1) {
            dispatch(queuePush(index));
        } else {
            dispatch(queueRemove(index));
        }
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
            onContextMenu={handleTrackQueue}
        >
            <div className="track-col play-state">
                {isTrackPlaying && !isTrackPaused && !didError ? (
                    <IconPause />
                ) : (
                    <IconPlay />
                )}
            </div>
            <div className="track-col name">
                {track.metadata.title}
                <div className="artist">{track.metadata.artist}</div>
            </div>
            <div
                className="track-col length"
                style={{ color: colors[colorIndex] }}
            >
                {moment.utc(track.metadata.duration * 1000).format("mm:ss")}
            </div>
            <div
                className="track-col queue-state"
                style={{ color: colors[colorIndex] }}
            >
                {queuePosition >= 0 && queuePosition + 1}
            </div>
        </div>
    );
}

export default Track;
