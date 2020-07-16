import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

import { useLazyBackgroundImage } from "../../hooks/useLazyBackgroundImage";

function Album({ album }) {
    const trackStore = useSelector((state) => state.music.tracks.data);

    // If api call failed
    const didError = useSelector((state) => state.music.tracks.didError);

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
    }

    // Lazy-load cover image
    const imageLoaded = useLazyBackgroundImage(`${process.env.REACT_APP_API}/tracks/${albumCoverId}/cover/600`);

    return (
        <div className={`album${isLoading ? " loading" : ""}${didError ? " error" : ""}`}>
            <div className="album-cover">
                {
                    imageLoaded &&
                    <img src={imageLoaded} draggable="false" />
                }
            </div>
            <div className="album-metadata">
                <div className="album-metadata-album">
                    <p>{albumName}</p>
                </div>
                <div className="album-metadata-artist">
                    <p>{albumArtist}</p>
                </div>
            </div>
        </div>
    );
}

export default Album;
