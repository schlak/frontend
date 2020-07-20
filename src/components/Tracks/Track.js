import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import { playTrack } from "../../store/actionCreators";

function Track({ index }) {
    const dispatch = useDispatch();

    // Track and session data from store
    const track = useSelector((state) => state.music.tracks.data[index]);
    const isPaused = useSelector((state) => state.session.playing.isPaused);
    const playingId = useSelector((state) => state.session.playing.track.id);
    const playingDidError = useSelector((state) => state.session.playing.didError);

    // Is this track currently playing?
    const isTrackPlaying = track.id === playingId;
    const isTrackPaused = isTrackPlaying && isPaused;

    const didPlayingTrackError = playingDidError;
    const didError = isTrackPlaying && didPlayingTrackError;

    // Play track in session
    const playInSession = (e) => {
        dispatch(
            playTrack(index)
        );
    };

    // Dynamic class list
    let classList = "";
    classList += isTrackPlaying ? " playing" : "";
    classList += isTrackPaused ? " paused" : "";
    classList += didError ? " error" : "";

    return (
        <div
            id={track.id}
            className={`track${classList}`}
            onClick={playInSession}
        >
            <div className="track-info">
                <p className="length">
                    {moment.utc(track.metadata.duration * 1000).format("mm:ss")}
                </p>
                <p className="title">{track.metadata.title}</p>
                <p className="artist">{track.metadata.artist}</p>
                <p className="album">{track.metadata.album}</p>
            </div>
        </div>
    );
}

export default Track;
