import React from "react";
import Fuse from "fuse.js";

import Album from "../components/trackList/album";

/*
 * Group tracks into albums
 *
 * @param {tracksStore}    tracks store object
 * @param {tracksToGroup}  tracks to group object
 * @return                 array of albums with keys to each track in store
 */
export const groupTracksIntoAlbums = (tracksStore, tracksToGroup) => {
    const albums = [];

    // Loop each track
    // populate albums array
    tracksToGroup.forEach((track, i) => {
        let found = false;

        // Find proper index of track in tracksStore
        const storeIndex = tracksStore.findIndex(storeTrack => storeTrack.id === track.id);

        // Loop albums array
        // Search for matching album data
        albums.forEach((album, j) => {
            if (track.metadata.album === album.album &&
                track.metadata.album_artist === album.album_artist) {
                    albums[j].tracks.push(storeIndex);
                    found = true;
            }
        });

        // If nothing found
        // create new album
        if (!found) {
            return albums.push({
                album: track.metadata.album,
                album_artist: track.metadata.album_artist,
                genre: track.metadata.genre,
                year: track.metadata.year,
                tracks: [
                    storeIndex
                ]
            });
        }
    });

    return albums;
};


/*
 * Group tracks into album components
 *
 * @param {tracksStore}    tracks store object
 * @param {tracksToGroup}  tracks to group object
 * @return                 array of album components
 */
export const groupTracksIntoAlbumComponents = (tracksStore, tracksToGroup) => {
    return groupTracksIntoAlbums(tracksStore, tracksToGroup).map((data, key) => {
        return <Album album={data} key={key} />;
    });
};


/*
 * Fuzzy-search for a track in tracks array
 *
 * @param {album}   album object
 * @param {filter}  filter options
 * @return          bool: if match found
 */
export const fuzzySearchForTrack = (tracks, filter) => {
    // Run search on all tracks
    const fuse = new Fuse(tracks, {
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
 * Filter tracks from selected tags or user input
 *
 * @param {data}    tracks array
 * @param {filter}  filter options
 * @return          array of index keys for state.music.albums.data
 */
export const filterTracks = (tracksStore, tracksToFilter, filter, includeSearch = false) => {
    return tracksToFilter.reduce(function(filtered, track, key) {
        // RegExp filter tags (case-insensitive)
        const regexTags = new RegExp(filter.tags.join("|"), "i");

        // Run search on each track
        if (filter.search.length > 0 && includeSearch) {
            const trackFound = fuzzySearchForTrack([track], filter);
            if (!trackFound)
                return filtered;
        }

        // If no filter applyed: add all all tracks
        // Or if track tag matches filter in RegExp
        if (filter.tags.length === 0  ||
            (filter.tags.length > 0 && regexTags.test(track.metadata.genre))) {
            filtered.push(track);
        }

        return filtered;
    }, []);
};
