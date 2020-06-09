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
 * Pause currently playing track
 */
export const playingTrackIsPaused = (isPaused) => (dispatch) => {
    dispatch({ type: SESSION_PLAYING_TOGGLE, payload: isPaused });
};
