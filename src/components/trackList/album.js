import React from "react";
import Track from "./track";

function Album({ album, audio, setAudio }) {
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
                            track={track}
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
