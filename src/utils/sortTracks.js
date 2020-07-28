import Fuse from "fuse.js";
import sha1 from 'crypto-js/sha1';

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
                id: sha1(track.metadata.album + track.metadata.album_artist).toString(),
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


/*
 * Deturmines if a track exists
 *
 * @param  {data}    tracks array
 * @param  {filter}  filter options
 * @return {object}  index of album and track
 */
export const doesTrackExist = (data, track) => {
    const res = [false, -1];

    // Loop all tracks
    data.some((trackLoop, index) => {
        if (track.id === trackLoop.id) {
            res[0] = true;
            res[1] = index;
            return true;
        }

        if (res[0]) return true;
        return false;
    });

    return res;
};


export const numberOfAlbumsOnOneRow = () => {
    let width = window.innerWidth;
    let albumsPerRow;

    switch (true) {
        case width < 900:
            albumsPerRow = 2;
            break;

        case width < 1300:
            albumsPerRow = 3;
            break;

        case width < 1500:
            albumsPerRow = 4;
            break;

        default:
            albumsPerRow = 5;
    }

    return albumsPerRow;
};


export const nRowsOfAlbums = (rows) => {
    return numberOfAlbumsOnOneRow() * rows;
};
