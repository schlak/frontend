import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAlbums } from "../../store/actionCreators";
import { filterTracks, groupTracksIntoAlbumComponents } from "../../utils/sortTracks";

import Album from "./album";

function TrackList() {
    const dispatch = useDispatch();

    // Get album list from store
    const trackStore = useSelector((state) => state.music.tracks);
    const isLoading = trackStore.isFetching || trackStore.didError;

    // # of rendered albums
    const defaultRenderAmmount = 14;
    const [renderedAlbumsCount, setRenderedAlbumsCount] = useState(defaultRenderAmmount);

    // #1 Filter tracks using tags or search input
    let tracksFiltered = filterTracks(trackStore.data, trackStore.data, trackStore.filter, true);

    // #2 Populate albums from filtered array
    // #3 Create array of Album components to render
    let albumsBeingRendered = groupTracksIntoAlbumComponents(trackStore.data, tracksFiltered);

    // Fetch albums from api
    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    // Adds more albums as user scrolls to bottom of page
    window.onscroll = function(ev)
    {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 800)
        {
            if (renderedAlbumsCount < albumsBeingRendered.length) {
                // Add album to render
                setRenderedAlbumsCount(renderedAlbumsCount + 1);
            }
        } else if (window.scrollY <= 100) {
            // Reset render count
            setRenderedAlbumsCount(defaultRenderAmmount);
        }
    };

    return (
        <div className="track-list">
            {isLoading &&
                [...Array(8)].map((x, key) =>
                    <Album album={false} key={key} />
                )
            }

            {albumsBeingRendered.slice(0, renderedAlbumsCount)}
        </div>
    );
}

export default TrackList;
