import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

import Track from "../Tracks/Track";

function Playlist({ playlist }) {
    // If api call failed
    const didError = useSelector((state) => state.music.tracks.didError);

    let isLoading;
    let $title;
    let $tracks;

    // If album exists
    // Render full album
    if (playlist) {
        isLoading = false;
        $title = `${playlist.name}`;
        $tracks = playlist.tracks.map((track, key) => {
            return <Track index={track} size="compact" key={key} />;
        });
    } else {
        // Album falsy - render skeleton
        // Loading state
        let loadingKey = Math.floor(Math.random() * (8 - 2)) + 2;
        isLoading = true;
        $title = <Skeleton width={"80%"} />;
        $tracks = [...Array(loadingKey)].map((value, key) => {
            return <Skeleton className="track compact" key={key} />;
        });
    }

    return (
        <div
            className={`track-album${isLoading ? " loading" : ""}${
                didError ? " error" : ""
            }`}
        >
            <div className="album-info">
                <h2>{$title}</h2>
            </div>
            <div className="album-tracks">{$tracks}</div>
        </div>
    );
}

export default Playlist;
