import {
    FETCH_ALBUMS_START,
    FETCH_ALBUMS_SUCCESS,
    FETCH_ALBUMS_FAILURE,
    SESSION_PLAY_TRACK,
    SESSION_PLAYING_TOGGLE,
    SESSION_VOLUME,
    SESSION_PLAYING_UPDATE_STATUS,
    WINDOW_ISDESKTOP,
} from "./actionTypes";

// Initial state of app
const initialState = {
    music: {
        albums: {
            didError: false,
            isFetching: true,
            items: [],
        },
    },
    session: {
        playing: {
            isPaused: true,
            status: {
                duration: null,
                position: null,
                volume: 50
            },
            index: {
                album: null,
                track: null,
            },
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
    window: {
        isDesktop: true
    },
};

function musicApp(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALBUMS_START:
            return {
                ...state,
                music: {
                    ...state.music,
                    albums: {
                        ...state.music.albums,
                        didError: false,
                        isFetching: true,
                        items: [],
                    },
                },
            };

        case FETCH_ALBUMS_SUCCESS:
            return {
                ...state,
                music: {
                    ...state.music,
                    albums: {
                        ...state.music.albums,
                        isFetching: false,
                        items: action.payload,
                    },
                },
            };

        case FETCH_ALBUMS_FAILURE:
            return {
                ...state,
                music: {
                    ...state.music,
                    albums: {
                        ...state.music.albums,
                        didError: true,
                        isFetching: false,
                    },
                },
            };

        case SESSION_PLAY_TRACK:
            // Do nothing if still fetching album index
            if (state.music.albums.isFetching || state.music.albums.didError)
                return state;

            return {
                ...state,
                session: {
                    ...state.session,
                    playing: {
                        ...state.session.playing,
                        index: action.payload,
                        track:
                            state.music.albums.items[action.payload.album]
                                .tracks[action.payload.track],
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

        case WINDOW_ISDESKTOP:
            return {
                ...state,
                window: {
                    ...state.window,
                    isDesktop: action.payload
                },
            };

        default:
            return state;
    }
}

export default musicApp;
