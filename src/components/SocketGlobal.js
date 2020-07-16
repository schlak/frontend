import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function SocketGlobal() {
    const playingIndex = useSelector((state) => state.session.playing.index);
    const socket = useSelector((state) => state.socket.connection);

    // Send currently playing track
    useEffect(() => {
        socket.emit("play_track", {
           track: playingIndex
        });
    }, [socket, playingIndex]);

    return (<></>);
}

export default SocketGlobal;
