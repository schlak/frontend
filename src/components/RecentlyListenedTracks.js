import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";

import TrackBig from "./Tracks/TrackBig";

function RecentlyListenedTracks(props) {
    // Get tracks from store
    const tracks = useSelector((state) => state.music.tracks.data);
    const [tracksToRender, setTracksToRender] = useState([]);

    // Find 5 most recently listened to tracks
    useEffect(() => {
        let stats = [];
        let numberOfTracks = 15;

        for (const i in tracks) {
            const lastPlayed = tracks[i].stats.lastPlayed;
            if (lastPlayed !== -1) {
                stats.push([i, tracks[i].stats.lastPlayed]);
            }
        }

        stats = orderBy(stats, [1], ["desc", "asc"]);

        if (window.innerWidth < 1000) {
            numberOfTracks = 8;
        } else if (window.innerWidth < 1400) {
            numberOfTracks = 9;
        } else if (window.innerWidth < 1800) {
            numberOfTracks = 12;
        }

        setTracksToRender(stats.slice(0, numberOfTracks));
    }, [tracks]);

    return (
        <>
            {tracksToRender.length > 2 && (
                <div className="most-listened-tracks">
                    <h2>Recently Played</h2>
                    <div className="track-container grid grid-tracks-big">
                        {tracksToRender.map((track, index) => {
                            return (
                                <TrackBig
                                    index={parseInt(track[0])}
                                    size="big"
                                    key={index}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}

export default RecentlyListenedTracks;
