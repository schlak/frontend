import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAlbums } from "../../store/actionCreators";
import { filterTracks, groupTracksIntoAlbumComponents } from "../../utils/sortTracks";

import Album from "./album";

function TrackList() {
    const dispatch = useDispatch();

    // Get album list from store
    const trackStore = useSelector((state) => state.music.tracks);
    const isLoading = trackStore.isFetching || trackStore.didError;

    // #1 Filter tracks using tags or search input
    let tracksFiltered = filterTracks(trackStore.data, trackStore.data, trackStore.filter, true);

    // #2 Populate albums from filtered array
    // #3 Create array of Album components to render
    let albumsBeingRendered = groupTracksIntoAlbumComponents(trackStore.data, tracksFiltered);

    // Fetch albums from api
    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    return (
        <div className="track-list">
            {isLoading &&
                [...Array(8)].map((x, key) =>
                    <Album album={false} key={key} />
                )
            }

            {albumsBeingRendered}
        </div>
    );
}

export default TrackList;
