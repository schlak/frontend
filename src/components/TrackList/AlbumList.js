import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
    filterTracks,
    groupTracksIntoAlbums,
    nRowsOfAlbums,
} from "utils/sortTracks";

import Album from "../Tracks/Album";

function AlbumList() {
    // Get album list from store
    const trackStore = useSelector((state) => state.music.tracks);
    const isLoading = trackStore.isFetching || trackStore.didError;

    // Use pre-filtered tracks.data if tags applied
    let tracksData = trackStore.data;
    if (trackStore.filter.length > 0) tracksData = trackStore.filteredData;

    // #1 Filter tracks using tags or search input
    let tracksFiltered = filterTracks(
        trackStore.data,
        tracksData,
        trackStore.filter,
        true
    );

    // #2 Populate albums from filtered array
    // #3 Create array of Album components to render
    let albumsBeingRendered = groupTracksIntoAlbums(
        trackStore.data,
        tracksFiltered
    ).map((data, key) => {
        return <Album album={data} key={key} />;
    });

    // # of rendered albums
    const defaultRenderAmmount = nRowsOfAlbums(4);
    const [renderedAlbumsCount, setRenderedAlbumsCount] = useState(
        defaultRenderAmmount
    );

    useEffect(() => {
        // Adds more albums as user scrolls to bottom of page
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - (window.innerHeight + 600)
            ) {
                if (renderedAlbumsCount < albumsBeingRendered.length) {
                    // Add album to render
                    setRenderedAlbumsCount(
                        renderedAlbumsCount + nRowsOfAlbums(4)
                    );
                }
            } else if (window.scrollY <= 100) {
                // Reset render count
                setRenderedAlbumsCount(defaultRenderAmmount);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    return (
        <div className="track-container grid grid-albums">
            {isLoading &&
                [...Array(nRowsOfAlbums(4))].map((x, key) => (
                    <Album album={false} key={key} />
                ))}

            {albumsBeingRendered.slice(0, renderedAlbumsCount)}
        </div>
    );
}

export default AlbumList;
