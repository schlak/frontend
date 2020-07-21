import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    socketConnectedUserCount,
    socketGlobalPlaying
} from "../store/actionCreators";

function SocketGlobal() {
    const dispatch = useDispatch();

    const playingIndex = useSelector((state) => state.session.playing.index);
    const socket = useSelector((state) => state.socket.connection);

    useEffect(() => {
        // Live connected user count
        socket.on("connected_count", (payload) => {
            dispatch(socketConnectedUserCount(payload));
        });

        // Live global playing tracks
        socket.on("global_tracks_playing", (payload) => {
            dispatch(socketGlobalPlaying(payload));
        });
    }, [dispatch, socket]);

    // Send currently playing track
    useEffect(() => {
        socket.emit("play_track", {
           track: playingIndex
        });
    }, [socket, playingIndex]);

    return (<></>);
}

export default SocketGlobal;
