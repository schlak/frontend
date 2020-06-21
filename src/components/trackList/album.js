import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

import Track from "./track";

function Album({ albumIndex }) {
    // Get album list from store
    const album = useSelector((state) => state.music.albums.data[albumIndex]);
    const didError = useSelector((state) => state.music.albums.didError);

    // Assume loading state
    let loadingKey = Math.floor(Math.random() * (8 - 2)) + 2;
    let isLoading = true;
    let $title = <Skeleton />;
    let $tracks = [...Array(loadingKey)].map((value, key) => {
        return (
            <div className="track" key={key}>
                <p>
                    <Skeleton />
                </p>
            </div>
        );
    })

    // If album index exists
    // Render full album
    if (album) {
        isLoading = false;
        $title = `${album.album_artist} - [${album.year}] ${album.album}`;
        $tracks = album.tracks.map((track, key) => {
            return (
                <Track
                    trackIndex={key}
                    albumIndex={albumIndex}
                    key={key}
                />
            );
        });
    }

    return (
        <div className={`album${isLoading ? " loading" : ""}${didError ? " error" : ""}`}>
            <div className="album-info">
                <h2>
                    {$title}
                </h2>
            </div>
            <div className="album-tracks">
                {$tracks}
            </div>
        </div>
    );
}

export default Album;
