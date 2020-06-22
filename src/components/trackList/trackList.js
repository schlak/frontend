import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";

import { fetchAlbums } from "../../store/actionCreators";

import Album from "./album";
import TrackInfo from "../sideBar/trackInfo";

function TrackList() {
    const dispatch = useDispatch();

    // Get album list from store
    const albumStore = useSelector((state) => state.music.albums);
    const filter = albumStore.filter;
    const isLoading = albumStore.isFetching || albumStore.didError;

    //// TODO: fusejs search on filter.search input
    ////       -> filters through albums given a search input

    // Filter albums from selected tags or user input
    let albums = albumStore.data.reduce(function(filtered, album, key) {
        // RegExp filter (case-insensitive)
        // #1: search input
        // #2: tags
        const regexSearch = new RegExp( filter.search.split(" ").join("|"), "i");
        const regexTags = new RegExp( filter.tags.join("|"), "i");

        // If no filter applyed: add all all albums
        // Or if album tag matches filter in RegExp
        if ((filter.tags.length === 0 && filter.search.length === 0) ||
            (filter.tags.length > 0 && regexTags.test(album.genre)) ||
            (filter.search.length > 0 && regexSearch.test(album.album)) ||
            (filter.search.length > 0 && regexSearch.test(album.album_artist)) ||
            (filter.search.length > 0 && regexSearch.test(album.year))) {
            filtered.push(<Album albumIndex={key} key={key} />);
        }

        return filtered;
    }, []);

    // Fetch albums from api
    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    return (
        <div className="track-list">
            {isMobile && <TrackInfo isFixedToTop={false} />}

            {isLoading &&
                [...Array(8)].map((x, key) =>
                    <Album albumIndex={-1} key={key} />
                )
            }

            {albums}
        </div>
    );
}

export default TrackList;
