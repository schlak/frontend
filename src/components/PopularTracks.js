import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";

import { nRowsOfAlbums } from "../utils/sortTracks";

import TrackBig from "./Tracks/TrackBig";

function PopularTracks(props) {
    // Get tracks from store
    const tracks = useSelector((state) => state.music.tracks.data);
    const [tracksToRender, setTracksToRender] = useState([]);

    // Find the top 5 most listened to tracks
    useEffect(() => {
        let stats = [];

        for (const i in tracks) {
            const timesPlayed = tracks[i].stats.timesPlayed;
            if (timesPlayed > 0) {
                stats.push([i, tracks[i].stats.timesPlayed]);
            }
        }

        stats = orderBy(stats, [1], ["desc", "asc"]);

        setTracksToRender(stats.slice(0, 6));
    }, [tracks]);

    return (
        <>
            {
                (tracksToRender.length > 2) &&
                <div className="popular-tracks">
                    <h2>Popular Tracks</h2>
                    <div className="track-container grid grid-tracks-big">
                        {
                            tracksToRender.map((track, index) => {
                                return <TrackBig index={track[0]} size="big" key={index} />;
                            })
                        }
                    </div>
                </div>
            }
        </>
    );
}

export default PopularTracks;
