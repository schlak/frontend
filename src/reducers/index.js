import {
    FETCH_ALBUMS_START,
    FETCH_ALBUMS_SUCCESS,
    FETCH_ALBUMS_FAILURE,
} from "../actions/music";

// Initial state of app
const initialState = {
    music: {
        albums: {
            didError: false,
            isFetching: false,
            items: []
        }
    },
    session: {
        playing: {
            isPlaying: false,
            isPaused: false,
            index: {
                album: 0,
                track: 0
            }
        },
        selected: {},
    },
    socket: {
        global: {
            connectedUsers: 0,
            session: {
                playing: []
            },
            messages: [],
        }
    }
}

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
                        items: []
                    }
                }
            }

        case FETCH_ALBUMS_SUCCESS:
            return {
                ...state,
                music: {
                    ...state.music,
                    albums: {
                        ...state.music.albums,
                        isFetching: false,
                        items: action.payload
                    }
                }
            }

        case FETCH_ALBUMS_FAILURE:
            return {
                ...state,
                music: {
                    ...state.music,
                    albums: {
                        ...state.music.albums,
                        didError: true,
                        isFetching: false
                    }
                }
            }

        default:
            return state;
    }
}

export default musicApp;
