import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAlbums } from "../../actions/music";

import Album from "./album";

function TrackList({ audio, setAudio }) {
    const dispatch = useDispatch();

    // Get album list from store
    const albums = useSelector(state => state.music.albums.items);

    // Fetch albums from api
    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    return (
        <div className="track-list">
            {albums.map((album, key) => {
                return (
                    <Album
                        albumIndex={key}
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
