import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";

import TrackBig from "./Tracks/TrackBig";

function PopularTracks(props) {
    // Get tracks from store
    const tracks = useSelector((state) => state.music.tracks.data);
    const [tracksToRender, setTracksToRender] = useState([]);

    // Find the top 5 most listened to tracks
    useEffect(() => {
        let stats = [];
        let numberOfTracks = 15;

        for (const i in tracks) {
            const timesPlayed = tracks[i].stats.timesPlayed;
            if (timesPlayed > 1) {
                stats.push([i, tracks[i].stats.timesPlayed]);
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
                <div className="popular-tracks">
                    <h2>Popular Tracks</h2>
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

export default PopularTracks;
