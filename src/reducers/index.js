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
        default:
            return state;
    }
}

export default musicApp;
