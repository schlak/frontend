import socketIOClient from "socket.io-client";
import { isMobile } from "react-device-detect";

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
    COLOR_UPDATE_CURRENT,
    UPDATE_USER_SEARCH,
    FILTER_TOGGLE_TAG,
    FILTER_RESET_TAGS,
    SOCKET_CONNECTED_USERS,
    SOCKET_GLOBAL_PLAYING,
} from "./actionTypes";

// Initial state of app
const initialState = {
    color: {
        colors: [
            "#d5f1ff",
            "#cdfff5",
            "#cdffda",
            "#fcffcd",
            "#ffeecd",
            "#ffcde8",
            "#fccdff",
            "#d5e0ff",
        ],
        current: Math.floor(Math.random() * 7), // Select a random color to start
    },
    music: {
        tracks: {
            didError: false,
            isFetching: true,
            filter: {
                tags: [],
                search: "",
            },
            queue: [],
            albumsData: [],
            filteredData: [],
            data: [],
        },
    },
    session: {
        actions: {
            shuffle: false,
            repeat: false,
            showPip: false, // picture-in-picture
        },
        playing: {
            audioRef: {},
            didError: false,
            isPaused: true,
            status: {
                duration: null,
                position: null,
                isMute: false,
                volume: isMobile
                    ? 100
                    : JSON.parse(localStorage.getItem("volume")) || 50,
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
        connection: socketIOClient(`${process.env.REACT_APP_API}`, {
            transports: ["websocket"],
        }),
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
                        playlistCollection: action.payload[2]
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

        case QUEUE_REMOVE:
            return {
                ...state,
                music: {
                    ...state.music,
                    tracks: {
                        ...state.music.tracks,
                        queue: [
                            ...state.music.tracks.queue.filter(
                                // Remove the track from the queue
                                (track) => track !== action.payload
                            ),
                        ],
                    },
                },
            };

        case QUEUE_PUSH:
            return {
                ...state,
                music: {
                    ...state.music,
                    tracks: {
                        ...state.music.tracks,
                        queue: [...state.music.tracks.queue, action.payload],
                    },
                },
            };

        case QUEUE_NEW:
            return {
                ...state,
                music: {
                    ...state.music,
                    tracks: {
                        ...state.music.tracks,
                        queue: [...action.payload],
                    },
                },
            };

        case SESSION_PLAY_TRACK:
            // Do nothing if still fetching album index
            if (state.music.tracks.isFetching || state.music.tracks.didError)
                return state;

            // Update track stats
            // * Last played timestamp
            // * Times played count
            // prettier-ignore
            state.music.tracks.data[action.payload].stats.lastPlayed = Date.now();
            // prettier-ignore
            state.music.tracks.data[action.payload].stats.timesPlayed += 1;

            return {
                ...state,
                session: {
                    ...state.session,
                    playing: {
                        ...state.session.playing,
                        didError: false,
                        isPaused: false,
                        index: parseInt(action.payload),
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
                            ...action.payload,
                        },
                    },
                },
            };

        case SESSION_PLAYING_AUDIO_REF:
            return {
                ...state,
                session: {
                    ...state.session,
                    playing: {
                        ...state.session.playing,
                        audioRef: action.payload,
                    },
                },
            };

        case SESSION_VOLUME:
            localStorage.setItem("volume", action.payload);

            return {
                ...state,
                session: {
                    ...state.session,
                    playing: {
                        ...state.session.playing,
                        status: {
                            ...state.session.playing.status,
                            volume: action.payload,
                        },
                    },
                },
            };

        case SESSION_VOLUME_MUTE:
            return {
                ...state,
                session: {
                    ...state.session,
                    playing: {
                        ...state.session.playing,
                        status: {
                            ...state.session.playing.status,
                            isMute: action.payload,
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
                        shuffle: !state.session.actions.shuffle,
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
                        repeat: !state.session.actions.repeat,
                    },
                },
            };

        case SESSION_PIP_TOGGLE:
            return {
                ...state,
                session: {
                    ...state.session,
                    actions: {
                        ...state.session.actions,
                        showPip: !state.session.actions.showPip,
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
                            search: action.payload,
                        },
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
                            tags: action.payload.tags,
                        },
                        filteredData: action.payload.filteredData,
                    },
                },
            };

        case FILTER_RESET_TAGS:
            return {
                ...state,
                music: {
                    ...state.music,
                    tracks: {
                        ...state.music.tracks,
                        filter: {
                            ...state.music.tracks.filter,
                            tags: [],
                        },
                        filteredData: [],
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
                        connectedUsers: action.payload,
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

        case COLOR_UPDATE_CURRENT:
            return {
                ...state,
                color: {
                    ...state.color,
                    current: action.payload,
                },
            };

        case COLOR_NEXT:
            // Pick a random color
            // If the random color is the current color, increment color by one,
            // and loop back to the begining once finished
            let nextCurrent = Math.floor(Math.random() * 7);
            if (nextCurrent === state.color.current) {
                nextCurrent = state.color.current + 1;
                if (nextCurrent > state.color.colors.length - 1)
                    nextCurrent = 0;
            }

            return {
                ...state,
                color: {
                    ...state.color,
                    current: nextCurrent,
                },
            };

        default:
            return state;
    }
}

export default musicApp;
