import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAlbums } from "../../store/actionCreators";

import Album from "./album";

function TrackList() {
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
                        key={key}
                    />
                );
            })}
        </div>
    );
}

export default TrackList;
