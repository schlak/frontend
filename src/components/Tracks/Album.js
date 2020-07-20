import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { playTrack, playingTrackIsPaused } from "../../store/actionCreators";

import Icon from "../Icon";

function Album({ album }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const playingIndex = useSelector((state) => state.session.playing.index);
    const isPaused = useSelector((state) => state.session.playing.isPaused);
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
        if (album.tracks.includes(playingIndex)) isAlbumPlaying = true;
    }

    // Goto album url
    const handleAlbumClick = (e) => {
        e.stopPropagation();
        if (album)
            history.push(`/albums/${album.id}`);
    };

    // Action button handler
    const handleActionButton = (e) => {
        e.stopPropagation();

        if (!isAlbumPlaying) {
            // Play first track in album
            dispatch(
                playTrack(album.tracks[0])
            );
        } else {
            // Pause track
            dispatch(
                playingTrackIsPaused(!isPaused)
            );
        }
    };

    // Dynamic class list
    let classList = "";
    classList += isAlbumPlaying ? " playing" : "";
    classList += isLoading ? " loading" : "";
    classList += didError ? " error" : "";

    return (
        <div className={`album${classList}`} onClick={handleAlbumClick}>
            <div className="album-cover">
                <img
                    src={`${process.env.REACT_APP_API}/tracks/${albumCoverId}/cover/280`}
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
                        !isAlbumPlaying || isPaused ?
                        <Icon name="play" isRounded={true} /> :
                        <Icon name="pause" isRounded={true} />
                    }
                </div>
            </div>
        </div>
    );
}

export default Album;
