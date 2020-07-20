import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import { groupTracksIntoAlbums } from "../utils/sortTracks";

import Track from "../components/Tracks/Track";

function Albums() {
    // Album ID in URL
    const { id } = useParams();

    const tracks = useSelector((state) => state.music.tracks.data);
    const isFetching = useSelector((state) => state.music.tracks.isFetching);
    const didError = useSelector((state) => state.music.tracks.didError);
    const isLoading = isFetching || didError;

    // Group tracks into albums
    const albums = groupTracksIntoAlbums(tracks, tracks);

    // Search for album
    const album = albums.find((album) => album.id === id);

    //
    let albumExists = true;
    if (!album) albumExists = false;

    const styles = useSpring({
        from: {opacity: 0},
        to: {opacity: 1}
    });

    return (
        <>
            <animated.div className="AlbumIndividual container" style={styles}>
                <section>
                    <div className="album">
                        <div className="album-cover">
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
                            <h2>{isLoading ? <Skeleton /> : album.album}</h2>
                            <p>{isLoading ? <Skeleton /> : `[${album.year}] - ${album.album_artist}`}</p>
                        </div>
                        <div className="track-container">
                            {isLoading &&
                                [...Array(8)].map((x, key) =>
                                    <div className="track" key={key}>
                                        <p>
                                            <Skeleton />
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

export default Albums;
