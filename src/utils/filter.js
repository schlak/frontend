import React from "react";
import Fuse from "fuse.js";

import Album from "../components/trackList/album";

/*
 * Fuzzy-search for a track in a single album
 *
 * @param {album}   album object
 * @param {filter}  filter options
 * @return          bool: if match found
 */
export const fuzzySearchForTrackInAlbum = (album, filter) => {
    // Run search on all tracks within an album
    const fuse = new Fuse(album.tracks, {
        threshold: 0.2,
        keys: [
            "metadata.title",
            "metadata.album",
            "metadata.artist",
            "metadata.album_artist",
            "metadata.year"
        ]
    });

    // List of matches
    const found = fuse.search(filter.search);

    if (found.length > 0) return true;
    return false;
};

/*
 * Filter albums from selected tags or user input
 *
 * @param {data}    albums array
 * @param {filter}  filter options
 * @return          array of index keys for state.music.albums.data
 */
export const filterAlbums = (data, filter, includeSearch = false) => {
    return data.reduce(function(filtered, album, key) {
        // RegExp filter (case-insensitive)
        // -> tags
        const regexTags = new RegExp( filter.tags.join("|"), "i");

        // Run search on each album
        // Loop each track
        if (filter.search.length > 0 && includeSearch) {
            const trackFound = fuzzySearchForTrackInAlbum(album, filter);
            if (!trackFound)
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
 *
 * @return    array of filtered Album components
 */
export const filterAlbumsIntoComponents = (data, filter, includeSearch = false) => {
    return filterAlbums(data, filter, includeSearch).map((key) => {
        return <Album albumIndex={key} key={key} />;
    });
};

/*
 * Deturmines if a track exists in a given album array
 * uses track.id to find a match
 *
 * @return    bool + index of album and track
 */
export const doesTrackExistInAlbumsArray = (data, track) => {
    const res = { exists: false, index: [-1, -1] };

    // Loop all albums
    data.some((album, iAlbum) => {
        // Loop tracks in album
        album.tracks.some((albumTrack, iTrack) => {
            if (track.id === albumTrack.id) {
                res.exists = true;
                res.index[0] = iAlbum;
                res.index[1] = iTrack;
                return true;
            }

            return false;
        });

        if (res.exists) return true;
        return false;
    });


    return res;
};
