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
