import socketIOClient from "socket.io-client";
import { isMobile } from "react-device-detect";

import {
    FETCH_TRACKS_START,
    FETCH_TRACKS_SUCCESS,
    FETCH_TRACKS_FAILURE,
    SESSION_PLAY_TRACK,
    SESSION_TRACK_ERROR,
    SESSION_PLAYING_TOGGLE,
    SESSION_PLAYING_UPDATE_STATUS,
    SESSION_VOLUME,
    SESSION_SHUFFLE_TOGGLE,
    SESSION_REPEAT_TOGGLE,
    UPDATE_USER_SEARCH,
    FILTER_TOGGLE_TAG,
    SOCKET_CONNECTED_USERS,
    SOCKET_GLOBAL_PLAYING,
} from "./actionTypes";

// Initial state of app
const initialState = {
    music: {
        tracks: {
            didError: false,
            isFetching: true,
            filter: {
                tags: [],
                search: ""
            },
            albumsData: [],
            filteredData: [],
            data: [],
        },
    },
    session: {
        actions: {
            shuffle: false,
            repeat: false,
        },
        playing: {
            didError: false,
            isPaused: true,
            status: {
                duration: null,
                position: null,
                volume: isMobile ? 100 : 50
            },
            index: -1,
            track: {
                id: null,
                metadata: {},
            },
        },
        selected: {},
    },
    socket: {
        connection: socketIOClient(`${process.env.REACT_APP_API}`),
        global: {
            connectedUsers: 0,
            playing: [],
            messages: [],
        },
    },
};

function musicApp(state = initialState, action) {
    switch (action.type) {
        case FETCH_TRACKS_START:
            return {
                ...state,
                music: {
                    ...state.music,
                    tracks: {
                        ...state.music.tracks,
                        didError: false,
                        isFetching: true,
                        data: [],
                    },
                },
            };

        case FETCH_TRACKS_SUCCESS:
            return {
                ...state,
                music: {
                    ...state.music,
                    tracks: {
                        ...state.music.tracks,
                        isFetching: false,
                        albumsData: action.payload[1],
                        data: action.payload[0],
                    },
                },
            };

        case FETCH_TRACKS_FAILURE:
            return {
                ...state,
                music: {
                    ...state.music,
                    tracks: {
                        ...state.music.tracks,
                        didError: true,
                        isFetching: false,
                    },
                },
            };

        case SESSION_PLAY_TRACK:
            // Do nothing if still fetching album index
            if (state.music.tracks.isFetching || state.music.tracks.didError)
                return state;

            return {
                ...state,
                session: {
                    ...state.session,
                    playing: {
                        ...state.session.playing,
                        didError: false,
                        isPaused: false,
                        index: action.payload,
                        track: state.music.tracks.data[action.payload],
                    },
                },
            };

        case SESSION_PLAYING_TOGGLE:
            // Check if there is a track playing
            if (!state.session.playing.track.id) return state;

            return {
                ...state,
                session: {
                    ...state.session,
                    playing: {
                        ...state.session.playing,
                        isPaused: action.payload,
                    },
                },
            };

        case SESSION_TRACK_ERROR:
            // Do nothing if still fetching album index
            if (state.music.tracks.isFetching || state.music.tracks.didError)
                return state;

            return {
                ...state,
                session: {
                    ...state.session,
                    playing: {
                        ...state.session.playing,
                        didError: true,
                        isPaused: true,
                    },
                },
            };

        case SESSION_PLAYING_UPDATE_STATUS:
            return {
                ...state,
                session: {
                    ...state.session,
                    playing: {
                        ...state.session.playing,
                        status: {
                            ...state.session.playing.status,
                            ...action.payload
                        },
                    },
                },
            };

        case SESSION_VOLUME:
            return {
                ...state,
                session: {
                    ...state.session,
                    playing: {
                        ...state.session.playing,
                        status: {
                            ...state.session.playing.status,
                            volume: action.payload
                        },
                    },
                },
            };

        case SESSION_SHUFFLE_TOGGLE:
            return {
                ...state,
                session: {
                    ...state.session,
                    actions: {
                        ...state.session.actions,
                        repeat: false,
                        shuffle: !state.session.actions.shuffle
                    },
                },
            };

    case SESSION_REPEAT_TOGGLE:
        return {
            ...state,
            session: {
                ...state.session,
                actions: {
                    ...state.session.actions,
                    shuffle: false,
                    repeat: !state.session.actions.repeat
                },
            },
        };

        case UPDATE_USER_SEARCH:
            return {
                ...state,
                music: {
                    ...state.music,
                    tracks: {
                        ...state.music.tracks,
                        filter: {
                            ...state.music.tracks.filter,
                            search: action.payload
                        }
                    },
                },
            };

        case FILTER_TOGGLE_TAG:
            return {
                ...state,
                music: {
                    ...state.music,
                    tracks: {
                        ...state.music.tracks,
                        filter: {
                            ...state.music.tracks.filter,
                            tags: action.payload.tags
                        },
                        filteredData: action.payload.filteredData
                    },
                },
            };

        case SOCKET_CONNECTED_USERS:
            return {
                ...state,
                socket: {
                    ...state.socket,
                    global: {
                        ...state.socket.global,
                        connectedUsers: action.payload
                    },
                },
            };


    case SOCKET_GLOBAL_PLAYING:
        return {
            ...state,
            socket: {
                ...state.socket,
                global: {
                    ...state.socket.global,
                    playing: action.payload,
                },
            },
        };

        default:
            return state;
    }
}

export default musicApp;
