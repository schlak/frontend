import React from "react";

function Track({ track }) {
    return (
        <div className="track">
            <div style={{marginTop: "10px"}}>
                <p>
                    <a href={`https://music.merritt.es/api/tracks/${track.id}/audio`} target="_blank" rel="noopener noreferrer">
                        {track.metadata.artist} - {track.metadata.title}
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Track;
