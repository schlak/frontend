import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://music.merritt.es/", {
    autoConnect: true,
});

function Users() {
    // Connected users
    const [users, setUsers] = useState(0);

    useEffect(() => {
        // Live connected user count
        socket.on("connected_count", (payload) => {
            setUsers(payload);
        });
    }, []);

    return <div className="users">Users: {users}</div>;
}

export default Users;
