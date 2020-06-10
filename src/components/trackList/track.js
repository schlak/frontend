import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import { playTrack } from "../../store/actionCreators";

function Track({ albumIndex, trackIndex }) {
    const dispatch = useDispatch();

    // Get session state from store
    const session = useSelector((state) => state.session);

    // Get track from store
    const track = useSelector(
        (state) => state.music.albums.items[albumIndex].tracks[trackIndex]
    );

    // Is this track currently playing?
    const isTrackPlaying = track.id === session.playing.track.id;
    const isTrackPaused = isTrackPlaying && session.playing.isPaused;

    // Play track in session
    const playInSession = (e) => {
        dispatch(
            playTrack({
                album: albumIndex,
                track: trackIndex,
            })
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
