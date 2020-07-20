import React from "react";
import { useSelector } from "react-redux";

import { filterTracks, groupTracksIntoAlbums } from "../../utils/sortTracks";

import Album from "../Tracks/Album";

function AlbumList() {
    // Get album list from store
    const trackStore = useSelector((state) => state.music.tracks);
    const isLoading = trackStore.isFetching || trackStore.didError;

    // Use pre-filtered tracks.data if tags applied
    let tracksData = trackStore.data;
    if (trackStore.filter.length > 0) tracksData = trackStore.filteredData;

    // #1 Filter tracks using tags or search input
    let tracksFiltered = filterTracks(trackStore.data, tracksData, trackStore.filter, true);

    // #2 Populate albums from filtered array
    // #3 Create array of Album components to render
    let albumsBeingRendered = groupTracksIntoAlbums(trackStore.data, tracksFiltered).map((data, key) => {
        return <Album album={data} key={key} />;
    });

    return (
        <div className="track-container grid grid-albums">
            {isLoading &&
                [...Array(8)].map((x, key) =>
                    <Album album={false} key={key} />
                )
            }

            {albumsBeingRendered}
        </div>
    );
}

export default AlbumList;
