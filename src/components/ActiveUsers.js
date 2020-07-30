import React from "react";
import { useSelector } from "react-redux";
import { uniqBy } from "lodash";

import TrackBig from "./Tracks/TrackBig";

function ActiveUsers(props) {
    const users = useSelector((state) => state.socket.global.connectedUsers);
    const globalPlaying = useSelector((state) => state.socket.global.playing);

    return (
        <div className="active-users">
            <h2>Active Users</h2>
            <p>There are currently <strong>{users}</strong> active users</p>

            <div className="track-container grid grid-tracks-big">
                {
                    uniqBy(globalPlaying, "playing").map((user, index) => {
                        return <TrackBig index={user.playing} size="big" key={index} />;
                    })
                }
            </div>
        </div>
    );
}

export default ActiveUsers;
