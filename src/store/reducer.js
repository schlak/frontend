import {
    FETCH_TRACKS_START,
    FETCH_TRACKS_SUCCESS,
    FETCH_TRACKS_FAILURE,
    SESSION_PLAY_TRACK,
    SESSION_PLAYING_TOGGLE,
    SESSION_TRACK_ERROR,
    SESSION_VOLUME,
    SESSION_PLAYING_UPDATE_STATUS,
    UPDATE_USER_SEARCH,
    FILTER_TOGGLE_TAG,
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
            data: [],
        },
    },
    session: {
        playing: {
            didError: false,
            isPaused: true,
            status: {
                duration: null,
                position: null,
                volume: 50
            },
            index: null,
            track: {
                id: null,
                metadata: {},
            },
        },
        selected: {},
    },
    socket: {
        global: {
            connectedUsers: 0,
            session: {
                playing: [],
            },
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
                        data: action.payload,
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
                            tags: action.payload
                        },
                    },
                },
            };

        default:
            return state;
    }
}

export default musicApp;
