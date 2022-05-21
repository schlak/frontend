import Fuse from "fuse.js";
import sha1 from "crypto-js/sha1";

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
        const storeIndex = tracksStore.findIndex(
            (storeTrack) => storeTrack.id === track.id
        );

        // Loop albums array
        // Search for matching album data
        albums.forEach((album, j) => {
            if (
                track.metadata.album === album.album &&
                track.metadata.album_artist === album.album_artist
            ) {
                albums[j].tracks.push(storeIndex);
                found = true;
            }
        });

        // If nothing found
        // create new album
        if (!found) {
            return albums.push({
                id: sha1(
                    track.metadata.album + track.metadata.album_artist
                ).toString(),
                album: track.metadata.album,
                album_artist: track.metadata.album_artist,
                genre: track.metadata.genre,
                year: track.metadata.year,
                tracks: [storeIndex],
            });
        }
    });

    return albums;
};


/*
 * Group tracks into playlists
 *
 * @param {tracksStore}    tracks store object
 * @param {tracksToGroup}  tracks to group object
 * @return                 array of albums with keys to each track in store
 */
export const groupTracksIntoPlaylists = (tracksStore, tracksToGroup) => {
    const playlistCollection = [];
//    playlistCollection.push({album_artist :"Test",year : "2000", album: "Jonas Testet" , tracks: []})
    // Loop each track
    // populate albums array
    tracksToGroup.forEach((track) => {

        // Find proper index of track in tracksStore
        const storeIndex = tracksStore.findIndex(
            (storeTrack) => storeTrack.id === track.id
        );

        track.metadata.playlistCollection.forEach(assignedPlaylists => {
            if (playlistCollection.filter(playlist => playlist.name === assignedPlaylists).length === 0)
                playlistCollection.push({ name: assignedPlaylists, tracks: [] })

            playlistCollection.filter(playlist => playlist.name === assignedPlaylists).forEach(playlist => playlist.tracks.push(storeIndex))
        });
    });

    return playlistCollection;
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
            "metadata.year",
        ],
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
export const filterTracks = (
    tracksStore,
    tracksToFilter,
    filter,
    includeSearch = false
) => {
    return tracksToFilter.reduce(function (filtered, track, key) {
        // RegExp filter tags (case-insensitive)
        const regexTags = new RegExp(filter.tags.join("|"), "i");

        // Run search on each track
        if (filter.search.length > 0 && includeSearch) {
            const trackFound = fuzzySearchForTrack([track], filter);
            if (!trackFound) return filtered;
        }

        // If no filter applyed: add all all tracks
        if (filter.tags.length === 0) {
            filtered.push(track);
            return filtered;
        }

        const genre = track?.metadata?.genre;
        const year = track?.metadata?.year;
        const decade = Math.floor(year / 10) * 10;

        // If track tag matches filter in RegExp
        if (filter.tags.length > 0) {
            const matchedGenre = regexTags.test(genre);
            const matchedDecade = regexTags.test(decade);

            if (matchedGenre || matchedDecade) {
                const isDecadeInTags = filter.tags
                    .join("|")
                    .match(/[12][0-9]{3}/gi);

                if (isDecadeInTags && isDecadeInTags?.length > 0) {
                    // Add track if:
                    // 1. both the genre & decade match (e.g. Latin track in the 1950s)
                    // 2. only decades are selected, no genre(s)
                    if (
                        (matchedGenre && matchedDecade) ||
                        isDecadeInTags.length === filter.tags.length
                    )
                        filtered.push(track);
                } else {
                    // If only genre(s) selected, add track
                    filtered.push(track);
                }
            }
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
        case width < 800:
            albumsPerRow = 2;
            break;

        case width < 1100:
            albumsPerRow = 3;
            break;

        case width < 1500:
            albumsPerRow = 4;
            break;

        case width < 1800:
            albumsPerRow = 5;
            break;

        default:
            albumsPerRow = 7;
    }

    return albumsPerRow;
};

export const numberOfTracksOnOneRow = () => {
    let width = window.innerWidth;
    let tracksPerRow;

    switch (true) {
        case width < 850:
            tracksPerRow = 1;
            break;

        case width < 1400:
            tracksPerRow = 2;
            break;

        case width < 1800:
            tracksPerRow = 3;
            break;

        default:
            tracksPerRow = 4;
    }

    return tracksPerRow;
};

export const nRowsOfAlbums = (rows) => {
    return numberOfAlbumsOnOneRow() * rows;
};

export const nRowsOfTracks = (rows) => {
    return numberOfTracksOnOneRow() * rows;
};
