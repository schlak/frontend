import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import { groupTracksIntoAlbums } from "../utils/sortTracks";
import { playTrack, playingTrackIsPaused } from "../store/actionCreators";

import Track from "../components/Tracks/Track";

function AlbumIndividual() {
    const dispatch = useDispatch();

    // Album ID in URL
    const { id } = useParams();

    const tracks = useSelector((state) => state.music.tracks.data);
    const isFetching = useSelector((state) => state.music.tracks.isFetching);
    const didError = useSelector((state) => state.music.tracks.didError);
    const playingIndex = useSelector((state) => state.session.playing.index);
    const isPaused = useSelector((state) => state.session.playing.isPaused);

    // Group tracks into albums
    const albums = groupTracksIntoAlbums(tracks, tracks);

    // Search for album
    const album = albums.find((album) => album.id === id);

    // Is album playing
    let isAlbumPlaying = false;

    // Album exists
    if (album && album.tracks.includes(playingIndex)) isAlbumPlaying = true;

    //
    const isLoading = !album || isFetching || didError;

    // Action button handler
    const handleActionButton = (e) => {
        e.stopPropagation();
        if (album) {
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
        }
    };

    const styles = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    });

    return (
        <>
            <animated.div className="AlbumIndividual container" style={styles}>
                <section>
                    <div className="album">
                        <div className="album-cover" onClick={handleActionButton}>
                            {
                                isLoading ?
                                <Skeleton width={400} height={400} /> :
                                <img
                                    src={isLoading ? "" : `${process.env.REACT_APP_API}/tracks/${tracks[album.tracks[0]].id}/cover/400`}
                                    alt="album-cover"
                                    draggable="false"
                                />
                            }
                        </div>
                        <div className="album-metadata">
                            <h2>{isLoading ? <Skeleton width={300} /> : album.album}</h2>
                            <p>{isLoading ? <Skeleton width={200} /> : `[${album.year}] - ${album.album_artist}`}</p>
                        </div>
                        <div className="track-container">
                            {isLoading &&
                                [...Array(8)].map((x, key) =>
                                    <div className="track" key={key}>
                                        <p>
                                            <Skeleton width={"80%"} />
                                        </p>
                                    </div>
                                )
                            }

                            {
                                !isLoading &&
                                album.tracks.map((track, key) => {
                                    return (
                                        <Track
                                            index={track}
                                            key={key}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                </section>
            </animated.div>
        </>
    );
}

export default AlbumIndividual;
