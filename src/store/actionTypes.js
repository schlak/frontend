/*
 * action types
 */

export const FETCH_TRACKS_START = "FETCH_TRACKS_START";
export const FETCH_TRACKS_SUCCESS = "FETCH_TRACKS_SUCCESS";
export const FETCH_TRACKS_FAILURE = "FETCH_TRACKS_FAILURE";

export const SESSION_PLAY_TRACK = "SESSION_PLAY_TRACK";
export const SESSION_PLAYING_TOGGLE = "SESSION_PLAYING_TOGGLE";
export const SESSION_TRACK_ERROR = "SESSION_TRACK_ERROR";
export const SESSION_PLAYING_UPDATE_STATUS = "SESSION_PLAYING_UPDATE_STATUS";
export const SESSION_PLAYING_AUDIO_REF = "SESSION_PLAYING_AUDIO_REF";
export const SESSION_VOLUME = "SESSION_VOLUME";
export const SESSION_VOLUME_MUTE = "SESSION_VOLUME_MUTE";
export const SESSION_SHUFFLE_TOGGLE = "SESSION_SHUFFLE_TOGGLE";
export const SESSION_REPEAT_TOGGLE = "SESSION_REPEAT_TOGGLE";
export const SESSION_PIP_TOGGLE = "SESSION_PIP_TOGGLE";

export const COLOR_NEXT = "COLOR_NEXT";
export const COLOR_UPDATE_CURRENT = "COLOR_UPDATE_CURRENT";

export const UPDATE_USER_SEARCH = "UPDATE_USER_SEARCH";
export const FILTER_TOGGLE_TAG = "FILTER_TOGGLE_TAG";
export const FILTER_RESET_TAGS = "FILTER_RESET_TAGS";

export const SOCKET_CONNECTED_USERS = "SOCKET_CONNECTED_USERS";
export const SOCKET_GLOBAL_PLAYING = "SOCKET_GLOBAL_PLAYING";
