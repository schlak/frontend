import React from "react";
import { useSelector } from "react-redux";

function AlbumCover() {
    // Get session state from store
    const session = useSelector((state) => state.session);
    const track = session.playing.track;
    let coverURL = `${process.env.REACT_APP_API}/tracks/${track.id}/cover/600`;

    if (!track.id) {
        coverURL = `${process.env.REACT_APP_API}/tracks/example/cover/600`;
    }

    return (
        <div className="album-cover">
            <img src={coverURL} alt="album cover" width="100%" draggable="false" />
        </div>
    );
}

export default AlbumCover;
