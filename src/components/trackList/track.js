import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

function Track({ albumIndex, trackIndex, audio, setAudio }) {
    // Get track from store
    const track = useSelector(
        state => state.music.albums.items[albumIndex].tracks[trackIndex]
    );

    const selectTrack = (e) => {
        setAudio({
            ...audio,
            playing: track,
        });
    };

    const isPlaying = track.id === audio.playing.id ? "playing" : "";

    return (
        <div className={`track ${isPlaying}`} onClick={selectTrack}>
            <div className="track-info">
                <p className="track-length">
                    {moment.utc(track.metadata.duration * 1000).format("mm:ss")}
                </p>
                <p className="track-title">{track.metadata.title}</p>
                <p className="track-artist">{track.metadata.artist}</p>
                <p className="track-album">{track.metadata.album}</p>
            </div>
        </div>
    );
}

export default Track;
