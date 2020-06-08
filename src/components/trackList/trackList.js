import React from "react";
import Album from "./album";

function TrackList({ albums, audio, setAudio }) {
    return (
        <div className="track-list">
            {albums.map((album, key) => {
                return (
                    <Album
                        album={album}
                        audio={audio}
                        setAudio={setAudio}
                        key={key}
                    />
                );
            })}
        </div>
    );
}

export default TrackList;
