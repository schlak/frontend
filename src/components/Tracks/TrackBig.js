import React from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { isSafari, isMobileSafari } from "react-device-detect";

import { playTrack } from "../../store/actionCreators";

import Image from "../Image";

function TrackBig({ index, size }) {
    const dispatch = useDispatch();

    // Track and session data from store
    const track = useSelector((state) => state.music.tracks.data[index]);
    const isPaused = useSelector((state) => state.session.playing.isPaused);
    const playingIndex = useSelector((state) => state.session.playing.index);
    const playingDidError = useSelector(
        (state) => state.session.playing.didError
    );

    // Is this track currently playing?
    let isTrackPlaying = false;
    if (playingIndex === index) isTrackPlaying = true;
    const isTrackPaused = isTrackPlaying && isPaused;

    const didPlayingTrackError = playingDidError;
    const didError = isTrackPlaying && didPlayingTrackError;

    // Assume loading state
    let trackTitle = <Skeleton />;
    let trackArtist = <Skeleton width="60%" />;
    let trackDuration = <Skeleton />;
    let albumCoverId = "example";

    // Track exists
    if (track) {
        trackTitle = track.metadata.title;
        trackArtist = track.metadata.artist;
        trackDuration = moment
            .utc(track.metadata.duration * 1000)
            .format("mm:ss");
        albumCoverId = track.id;
    }

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
        <div className={`track${classList}`} onClick={playInSession}>
            <div className="track-col image">
                <Image
                    src={`${process.env.REACT_APP_API}/tracks/${albumCoverId}/cover/400`}
                    fallback={`fallback--album-cover`}
                    alt="album-cover"
                    draggable="false"
                />
            </div>
            <div className="track-col name">
                {trackTitle}
                <div className="artist">{trackArtist}</div>
            </div>
            <div className="track-col length">{trackDuration}</div>
        </div>
    );
}

export default TrackBig;
