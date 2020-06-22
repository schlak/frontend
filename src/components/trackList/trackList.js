import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Fuse from "fuse.js";

import { fetchAlbums } from "../../store/actionCreators";

import Album from "./album";

function TrackList() {
    const dispatch = useDispatch();

    // Get album list from store
    const albumStore = useSelector((state) => state.music.albums);
    const filter = albumStore.filter;
    let albums = albumStore.data;
    const isLoading = albumStore.isFetching || albumStore.didError;

    //// TODO: FIX track play order when filtering

    // Filter albums from selected tags or user input
    albums = albumStore.data.reduce(function(filtered, album, key) {
        // RegExp filter (case-insensitive)
        // -> tags
        const regexTags = new RegExp( filter.tags.join("|"), "i");

        // Run search on each album
        // Loop each track
        if (filter.search.length > 0) {
            const fuse = new Fuse(album.tracks, {
                threshold: 0.2,
                keys: ["metadata.title", "metadata.album", "metadata.artist", "metadata.album_artist", "metadata.year"]
            });

            const found = fuse.search(filter.search);

            if (found.length === 0)
                return filtered;
        }

        // If no filter applyed: add all all albums
        // Or if album tag matches filter in RegExp
        if (filter.tags.length === 0  ||
            (filter.tags.length > 0 && regexTags.test(album.genre))) {
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
