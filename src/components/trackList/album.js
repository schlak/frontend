import React from "react";
import { useSelector } from "react-redux";

import Track from "./track";

function Album({ albumIndex, audio, setAudio }) {
    // Get album list from store
    const album = useSelector(state => state.music.albums.items[albumIndex]);

    return (
        <div className="album">
            <div className="album-info">
                <h2>
                    {album.album_artist} - [{album.year}] {album.album}
                </h2>
            </div>
            <div className="album-tracks">
                {album.tracks.map((track, key) => {
                    return (
                        <Track
                            trackIndex={key}
                            albumIndex={albumIndex}
                            audio={audio}
                            setAudio={setAudio}
                            key={key}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Album;
