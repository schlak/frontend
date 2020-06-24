import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import { playTrack } from "../../store/actionCreators";

function Track({ index }) {
    const dispatch = useDispatch();

    // Track and session data from store
    const track = useSelector((state) => state.music.tracks.data[index]);
    const session = useSelector((state) => state.session);

    // Is this track currently playing?
    const isTrackPlaying = track.id === session.playing.track.id;
    const isTrackPaused = isTrackPlaying && session.playing.isPaused;

    // Play track in session
    const playInSession = (e) => {
        dispatch(
            playTrack(index)
        );
    };

    return (
        <div
            id={track.id}
            className={`track${isTrackPlaying ? " playing" : ""}${
                isTrackPaused ? " paused" : ""
            }`}
            onClick={playInSession}
        >
            <div className="track-info">
                <p className="track-length">
                    {moment.utc(track.metadata.duration * 1000).format("mm:ss")}
                </p>
                <p className="track-title">{track.metadata.title}</p>
                <p className="track-artist">{track.metadata.artist}</p>
                <p className="track-album">{track.metadata.album}</p>
            </div>
        </div>
    );
}

export default Track;
