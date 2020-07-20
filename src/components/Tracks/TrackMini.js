import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector, useDispatch } from "react-redux";

import { playTrack } from "../../store/actionCreators";

function TrackMini({ index }) {
    const dispatch = useDispatch();

    // Track and session data from store
    const track = useSelector((state) => state.music.tracks.data[index]);
    const playingIndex = useSelector((state) => state.session.playing.index);

    // Is track currently playing?
    let isPlaying = false;
    if (playingIndex === index) isPlaying = true;

    // Assume loading state
    let trackTitle = <Skeleton />;
    let trackArtist = <Skeleton />;
    let albumCoverId = "example";

    // Album exists
    if (track) {
        trackTitle = track.metadata.title;
        trackArtist = track.metadata.artist;
        albumCoverId = track.id;
    }

    // Play track handler
    const handlePlayTrack = (e) => {
        if (!isPlaying) {
            dispatch(
                playTrack(index)
            );
        }
    };

    return (
        <div className={`track-mini ${isPlaying ? " playing" : ""}`} onClick={handlePlayTrack}>
            <div className="album-cover">
                <img
                    src={`${process.env.REACT_APP_API}/tracks/${albumCoverId}/cover/60`}
                    alt="album-cover"
                    draggable="false"
                />
            </div>
            <div className="album-metadata">
                <div className="album-metadata-track">
                    <p>{trackTitle}</p>
                </div>
                <div className="album-metadata-artist">
                    <p>{trackArtist}</p>
                </div>
            </div>
        </div>
    );
}

export default TrackMini;
