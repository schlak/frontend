import React from "react";
import Album from "./album";

function TrackList({ albums }) {
    return (
        <div className="track-list">
            {
                albums.map((album, key) => {
                    return <Album album={album} key={key} />
                })
            }
        </div>
    );
}

export default TrackList;
