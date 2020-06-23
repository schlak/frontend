import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAlbums } from "../../store/actionCreators";
import { filterAlbumsIntoComponents } from "../../utils/filter";

import Album from "./album";

function TrackList() {
    const dispatch = useDispatch();

    // Get album list from store
    const albumStore = useSelector((state) => state.music.albums);
    const isLoading = albumStore.isFetching || albumStore.didError;

    // Filter albums from selected tags or user input
    // -> is array of album components to render
    let albumsBeingRendered = filterAlbumsIntoComponents(albumStore.data, albumStore.filter);

    // Fetch albums from api
    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    return (
        <div className="track-list">
            {isLoading &&
                [...Array(8)].map((x, key) =>
                    <Album albumIndex={-1} key={key} />
                )
            }

            {albumsBeingRendered}
        </div>
    );
}

export default TrackList;
