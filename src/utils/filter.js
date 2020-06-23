import React from "react";
import Fuse from "fuse.js";

import Album from "../components/trackList/album";

/*
 * Filter albums from selected tags or user input
 *
 * @param {data}    albums array
 * @param {filter}  filter options
 * @return          array of index keys for state.music.albums.data
 */
export const filterAlbums = (data, filter) => {
    return data.reduce(function(filtered, album, key) {
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
            filtered.push(key);
        }

        return filtered;
    }, []);
};

/*
 * Filter albums into components to render
 */
export const filterAlbumsIntoComponents = (data, filter) => {
    return filterAlbums(data, filter).map((key) => {
        return <Album albumIndex={key} key={key} />;
    });
};
