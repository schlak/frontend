import { api } from "utils/api";
import {
    filterTracks,
    doesTrackExist,
    groupTracksIntoAlbums,
    groupTracksIntoPlaylists,
} from "utils/sortTracks";
import {
    FETCH_TRACKS_START,
    FETCH_TRACKS_SUCCESS,
    FETCH_TRACKS_FAILURE,
    QUEUE_REMOVE,
    QUEUE_PUSH,
    QUEUE_NEW,
    SESSION_PLAY_TRACK,
    SESSION_TRACK_ERROR,
    SESSION_PLAYING_TOGGLE,
    SESSION_PLAYING_UPDATE_STATUS,
    SESSION_PLAYING_AUDIO_REF,
    SESSION_VOLUME,
    SESSION_VOLUME_MUTE,
    SESSION_SHUFFLE_TOGGLE,
    SESSION_REPEAT_TOGGLE,
    SESSION_PIP_TOGGLE,
    COLOR_NEXT,
    UPDATE_USER_SEARCH,
    FILTER_TOGGLE_TAG,
    FILTER_RESET_TAGS,
    SOCKET_CONNECTED_USERS,
    SOCKET_GLOBAL_PLAYING,
} from "./actionTypes";

/*
 * Fetch tracks index from api
 */
export const fetchTracks = () => (dispatch) => {
    dispatch({ type: FETCH_TRACKS_START, payload: [] });

    api()
        .get("/tracks")
        .then((res) => {
            // console.log("Tracks:", res.data);
            const albums = groupTracksIntoAlbums(res.data, res.data);
            const playlistCollection = groupTracksIntoPlaylists(res.data, res.data);
            dispatch({
                type: FETCH_TRACKS_SUCCESS,
                payload: [res.data, albums, playlistCollection],
            });
        })
        .catch((error) => {
            dispatch({ type: FETCH_TRACKS_FAILURE, payload: error });
        });
};

/*
 * Remove a track from the Queue
 */
export const queueRemove = (trackIndex) => (dispatch) => {
    dispatch({ type: QUEUE_REMOVE, payload: trackIndex });
};

/*
 * Queue a track for future playback
 */
export const queuePush = (trackIndex) => (dispatch) => {
    dispatch({ type: QUEUE_PUSH, payload: trackIndex });
};

/*
 * Play a new track (adds to current session)
 */
export const playTrack = (trackIndex) => (dispatch) => {
    dispatch({ type: SESSION_PLAY_TRACK, payload: trackIndex });
};

/*
 * Play a random track (uses current filter)
 */
export const playRandomTrack = () => (dispatch, getState) => {
    const state = getState();
    const tracks = state.music.tracks.data;
    let trackList = state.music.tracks.data;
    const tags = state.music.tracks.filter.tags;

    // If filter applied: use filtered tracks
    if (tags.length > 0) trackList = state.music.tracks.filteredData;

    // Select random track
    const ranIndex = Math.floor(Math.random() * trackList.length);
    const ranTrack = trackList[ranIndex];

    // Get actual index of track in data
    const trackIndex = tracks.findIndex(
        (storeTrack) => storeTrack.id === ranTrack.id
    );

    dispatch({ type: SESSION_PLAY_TRACK, payload: trackIndex });
};

/*
 * Play next track
 */
export const playNextTrack = (trackIndex) => (dispatch, getState) => {
    const state = getState();
    let newIndex = 0;

    // Check if there is a queue (serve queue first)
    if (state.music.tracks.queue.length > 0) {
        const newQueue = [...state.music.tracks.queue];
        newIndex = newQueue.shift();
        dispatch({ type: QUEUE_NEW, payload: newQueue });
        return dispatch({ type: SESSION_PLAY_TRACK, payload: newIndex });
    }

    // If a track is currently playing
    if (typeof newIndex === "number") {
        const tracks = state.music.tracks.data;
        const filter = state.music.tracks.filter;

        // Check if filter is applied
        if (filter.tags.length > 0) {
            // #1 Re-create filter
            // #2 Is current track in filter
            const tracksFiltered = state.music.tracks.filteredData;
            const [trackExists, trackIndexFiltered] = doesTrackExist(
                tracksFiltered,
                tracks[trackIndex]
            );

            if (trackExists) {
                newIndex = trackIndexFiltered + 1;
                if (tracksFiltered.length <= newIndex) newIndex = 0;

                newIndex = tracks.findIndex(
                    (storeTrack) =>
                        storeTrack.id === tracksFiltered[newIndex].id
                );

                return dispatch({
                    type: SESSION_PLAY_TRACK,
                    payload: newIndex,
                });
            }
        }

        // #1 attempt to play next track
        newIndex = trackIndex + 1;

        // If end of all tracks
        // loop to first track
        if (tracks.length <= newIndex) {
            // #3 loop entire playlist to first track
            newIndex = 0;
        }
    }

    // Select next track
    dispatch({ type: SESSION_PLAY_TRACK, payload: newIndex });
};

/*
 * Play previous track
 */
export const playPreviousTrack = (trackIndex) => (dispatch, getState) => {
    const state = getState();
    let newIndex = 0;

    // If a track is currently playing
    if (typeof newIndex === "number") {
        const tracks = state.music.tracks.data;
        const filter = state.music.tracks.filter;

        // Check if filter is applied
        if (filter.tags.length > 0) {
            // #1 Re-create filter
            // #2 Is current track in filter
            const tracksFiltered = state.music.tracks.filteredData;
            const [trackExists, trackIndexFiltered] = doesTrackExist(
                tracksFiltered,
                tracks[trackIndex]
            );

            if (trackExists) {
                newIndex = trackIndexFiltered - 1;
                if (newIndex < 0) newIndex = tracksFiltered.length - 1;

                newIndex = tracks.findIndex(
                    (storeTrack) =>
                        storeTrack.id === tracksFiltered[newIndex].id
                );

                return dispatch({
                    type: SESSION_PLAY_TRACK,
                    payload: newIndex,
                });
            }
        }

        // #1 attempt to play previous track
        newIndex = trackIndex - 1;

        // If end of all tracks
        // loop to end track
        if (newIndex < 0) {
            // #3 loop entire playlist to end track
            newIndex = tracks.length - 1;
        }
    }

    // Select next track
    dispatch({ type: SESSION_PLAY_TRACK, payload: newIndex });
};

/*
 * Decide what to play based on current session
 */
export const playNextTrackBasedOnSession =
    (playNext = true) =>
    (dispatch, getState) => {
        const state = getState();

        if (state.session.actions.shuffle) return dispatch(playRandomTrack());

        if (playNext) {
            dispatch(playNextTrack(state.session.playing.index));
        } else {
            dispatch(playPreviousTrack(state.session.playing.index));
        }
    };

/*
 * Pause currently playing track
 */
export const playingTrackIsPaused = (isPaused) => (dispatch) => {
    dispatch({ type: SESSION_PLAYING_TOGGLE, payload: isPaused });
};

/*
 * Track unable to play; error
 */
export const playingTrackDidError = () => (dispatch) => {
    dispatch({ type: SESSION_TRACK_ERROR, payload: true });
};

/*
 * Update status of playing track
 */
export const sessionUpdatePlayingStatus = (status) => (dispatch) => {
    dispatch({ type: SESSION_PLAYING_UPDATE_STATUS, payload: status });
};

/*
 * Update html audio reference
 */
export const sessionUpdateAudioRef = (audioRef) => (dispatch) => {
    dispatch({ type: SESSION_PLAYING_AUDIO_REF, payload: audioRef });
};

/*
 * Change volume to an exact ammount (0/100)
 */
export const changeVolume = (newVolume) => (dispatch) => {
    dispatch({ type: SESSION_VOLUME, payload: newVolume });
};

/*
 * Mute volume - previous volume level is not effected
 */
export const muteVolume = (isMute) => (dispatch) => {
    dispatch({ type: SESSION_VOLUME_MUTE, payload: isMute });
};

/*
 * Toggle shuffle
 */
export const shuffleToggle = () => (dispatch) => {
    dispatch({ type: SESSION_SHUFFLE_TOGGLE });
};

/*
 * Toggle repeat
 */
export const repeatToggle = () => (dispatch) => {
    dispatch({ type: SESSION_REPEAT_TOGGLE });
};

/*
 * Toggle PIP - picture-in-picture
 */
export const pipToggle = () => (dispatch) => {
    dispatch({ type: SESSION_PIP_TOGGLE });
};

/*
 * New global color
 */
export const colorNext = () => (dispatch) => {
    dispatch({ type: COLOR_NEXT });
};

/*
 * Update search input value
 */
export const updateUserSearch = (search) => (dispatch) => {
    dispatch({ type: UPDATE_USER_SEARCH, payload: search });
};

/*
 * Toggle filter tags array value
 */
export const filterToggleTag = (tag) => (dispatch, getState) => {
    const state = getState();
    const tracks = state.music.tracks;
    const filter = tracks.filter;
    const tags = [...filter.tags];
    let tracksFiltered = [];

    // If tag already exists in tags array
    // -> remove it
    if (tags.includes(tag)) {
        const index = tags.indexOf(tag);
        if (index !== -1) tags.splice(index, 1);
    } else {
        // -> add tag
        tags.push(tag);
    }

    // Filter tracks
    if (tags.length > 0) {
        tracksFiltered = filterTracks(tracks.data, tracks.data, {
            ...filter,
            tags,
        });
    }

    // Update tags array
    dispatch({
        type: FILTER_TOGGLE_TAG,
        payload: {
            tags: tags,
            filteredData: tracksFiltered,
        },
    });
};

/*
 * Reset all selected tags
 */
export const filterResetTags = () => (dispatch) => {
    dispatch({ type: FILTER_RESET_TAGS });
};

/*
 * Socket: update connected users
 */
export const socketConnectedUserCount = (count) => (dispatch) => {
    dispatch({ type: SOCKET_CONNECTED_USERS, payload: count });
};

/*
 * Socket: update global playing session
 */
export const socketGlobalPlaying = (playing) => (dispatch) => {
    dispatch({ type: SOCKET_GLOBAL_PLAYING, payload: playing });
};
