import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { uniqBy } from "lodash";

import TrackMini from "./Tracks/TrackMini";

function ActiveUsers(props) {
    // Connected users
    const socket = useSelector((state) => state.socket.connection);
    const [users, setUsers] = useState(0);
    const [globalPlaying, setGlobalPlaying] = useState([]);

    useEffect(() => {
        // Live connected user count
        socket.on("connected_count", (payload) => {
            setUsers(payload);
        });

        // Live global playing tracks
        socket.on("global_tracks_playing", (payload) => {
            setGlobalPlaying(payload);
        });
    }, [socket]);

    return (
        <div className="active-users">
            <h2>Active Users</h2>
            <p>There are currently <strong>{users}</strong> active users</p>

            <div className="track-container">
                {
                    uniqBy(globalPlaying, "playing").map((user, index) => {
                        return <TrackMini index={user.playing} key={index} />;
                    })
                }
            </div>
        </div>
    );
}

export default ActiveUsers;
