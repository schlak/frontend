import { api } from "../utils/api";

/*
 * action types
 */

export const FETCH_ALBUMS_START = "FETCH_ALBUMS_START";
export const FETCH_ALBUMS_SUCCESS = "FETCH_ALBUMS_SUCCESS";
export const FETCH_ALBUMS_FAILURE = "FETCH_ALBUMS_FAILURE";

/*
 * action creators
 */

export const fetchAlbums = () => dispatch => {
    dispatch({ type: FETCH_ALBUMS_START, payload: [] });

    //
    api()
        .get("/albums")
        .then((res) => {
            console.log("Albums:", res.data);
            dispatch({ type: FETCH_ALBUMS_SUCCESS, payload: res.data });
        })
        .catch(error => {
            dispatch({ type: FETCH_ALBUMS_FAILURE, payload: error });
        });
}
