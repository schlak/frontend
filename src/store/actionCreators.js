import { api } from "../utils/api";
import {
    FETCH_ALBUMS_START,
    FETCH_ALBUMS_SUCCESS,
    FETCH_ALBUMS_FAILURE,
    SESSION_PLAY_TRACK,
    SESSION_PLAYING_TOGGLE,
} from "./actionTypes";

/*
 * Fetch albums index from api
 */
export const fetchAlbums = () => (dispatch) => {
    dispatch({ type: FETCH_ALBUMS_START, payload: [] });

    api()
        .get("/albums")
        .then((res) => {
            console.log("Albums:", res.data);
            dispatch({ type: FETCH_ALBUMS_SUCCESS, payload: res.data });
        })
        .catch((error) => {
            dispatch({ type: FETCH_ALBUMS_FAILURE, payload: error });
        });
};

/*
 * Play a new track (adds to current session)
 */
export const playTrack = (trackIndex) => (dispatch) => {
    dispatch({ type: SESSION_PLAY_TRACK, payload: trackIndex });
};

/*
 * Play next track
 */
export const playNextTrack = (trackIndex) => (dispatch, getState) => {
    const state = getState();
    const albums = state.music.albums.items;
    const currentAlbum = albums[trackIndex.album];

    // #1 next track in album
    const newIndex = {...trackIndex};
    newIndex.track += 1;

    // If end of current album
    // move onto next album
    if (newIndex.track + 1 > currentAlbum.tracks.length) {
        // If end of all albums
        // loop to first album
        if (albums.length === trackIndex.album + 1) {
            // #3 loop entire playlist to first album
            newIndex.album = 0;
            newIndex.track = 0;

        // Next album
        } else {
            // #2 next album first track
            newIndex.album += 1;
            newIndex.track = 0;
        }
    }

    // Select next track
    dispatch({ type: SESSION_PLAY_TRACK, payload: newIndex });
};

/*
 * Pause currently playing track
 */
export const playingTrackIsPaused = (isPaused) => (dispatch) => {
    dispatch({ type: SESSION_PLAYING_TOGGLE, payload: isPaused });
};
