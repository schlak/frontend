import React from "react";
import moment from "moment";

function Track({ track }) {
    return (
        <div className="track">
            <a href={`https://music.merritt.es/api/tracks/${track.id}/audio`} target="_blank" rel="noopener noreferrer">
                <div className="track-info">
                    <p className="track-length">{moment.utc(track.metadata.duration*1000).format("mm:ss")}</p>
                    <p className="track-title">{track.metadata.title}</p>
                    <p className="track-artist">{track.metadata.artist}</p>
                    <p className="track-album">{track.metadata.album}</p>
                </div>
            </a>
        </div>
    );
}

export default Track;
