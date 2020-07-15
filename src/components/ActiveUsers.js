import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

function ActiveUsers(props) {
    // Connected users
    const [users, setUsers] = useState(0);

    useEffect(() => {
        // Connect to socket
        const socket = socketIOClient(`${process.env.REACT_APP_API}`);

        // Live connected user count
        socket.on("connected_count", (payload) => {
            setUsers(payload);
        });

        // Disconnect from socket when component dismounts
        return () => socket.disconnect();
    }, []);

    return (
        <div className="active-users">
            <h2>Active Users</h2>
            <p>There are currently <strong>{users}</strong> active users</p>
        </div>
    );
}

export default ActiveUsers;
