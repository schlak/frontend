import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function SocketGlobal() {
    const session = useSelector((state) => state.session);
    const socket = useSelector((state) => state.socket.connection);

    // Send currently playing track
    useEffect(() => {
        socket.emit("play_track", {
           track: session.playing.index
        });
    }, [session]);

    return (<></>);
}

export default SocketGlobal;
