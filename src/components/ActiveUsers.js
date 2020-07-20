import React from "react";
import { useSelector } from "react-redux";
import { uniqBy } from "lodash";

import TrackMini from "./Tracks/TrackMini";

function ActiveUsers(props) {
    const users = useSelector((state) => state.socket.global.connectedUsers);
    const globalPlaying = useSelector((state) => state.socket.global.playing);

    return (
        <div className="active-users">
            <h2>Active Users</h2>
            <p>There are currently <strong>{users}</strong> active users</p>

            <div className="track-container flex">
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
