import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector, useDispatch } from "react-redux";

import { playTrack, playingTrackIsPaused } from "../../store/actionCreators";

import Icon from "../Icon";

function Album({ album }) {
    const dispatch = useDispatch();
    const playing = useSelector((state) => state.session.playing);
    const trackStore = useSelector((state) => state.music.tracks.data);

    // If api call failed
    const didError = useSelector((state) => state.music.tracks.didError);

    // Is album playing
    let isAlbumPlaying = false;

    // Assume loading state
    let isLoading = true;
    let albumName = <Skeleton />;
    let albumArtist = <Skeleton />;
    let albumCoverId = "example";

    // Album exists
    if (album) {
        isLoading = false;
        albumName = album.album;
        albumArtist = album.album_artist;
        albumCoverId = trackStore[album.tracks[0]].id;
        if (album.tracks.includes(playing.index)) isAlbumPlaying = true;
    }

    // Action button handler
    const handleActionButton = (e) => {
        if (!isAlbumPlaying) {
            // Play first track in album
            dispatch(
                playTrack(album.tracks[0])
            );
        } else {
            // Pause track
            dispatch(
                playingTrackIsPaused(!playing.isPaused)
            );
        }
    };

    return (
        <div className={`album${isAlbumPlaying ? " playing" : ""}${isLoading ? " loading" : ""}${didError ? " error" : ""}`}>
            <div className="album-cover">
                <img
                    src={`${process.env.REACT_APP_API}/tracks/${albumCoverId}/cover/600`}
                    alt="album-cover"
                    draggable="false"
                />
            </div>
            <div className="album-metadata">
                <div className="album-metadata-album">
                    <p>{albumName}</p>
                </div>
                <div className="album-metadata-artist">
                    <p>{albumArtist}</p>
                </div>
            </div>
            <div className="album-action" onClick={handleActionButton}>
                <div className="album-action-button">
                    {
                        !isAlbumPlaying || playing.isPaused ?
                        <Icon name="play" isRounded={true} /> :
                        <Icon name="pause" isRounded={true} />
                    }
                </div>
            </div>
        </div>
    );
}

export default Album;
