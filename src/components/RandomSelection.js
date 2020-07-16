import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Chance from "chance";

import { groupTracksIntoAlbums } from "../utils/sortTracks";

import Album from "./Tracks/Album";

function RandomSelection(props) {
    // Get track list from store
    const trackStore = useSelector((state) => state.music.tracks.data);
    const [albums, setAlbums] = useState([]);
    const [albumsToRender, setAlbumsToRender] = useState([-1, -1, -1, -1]);

    // Sort tracks index into albums
    useEffect(() => {
        setAlbums(groupTracksIntoAlbums(trackStore, trackStore));
    }, [trackStore]);

    // Generate 4 - unique - random numbers (used as album indexes)
    useEffect(() => {
        const chance = new Chance();
        let albumsMaxIndex = 4;
        if (albums.length > 0) albumsMaxIndex = albums.length - 1;

        setAlbumsToRender(
            chance.unique(chance.integer, 4, {min: 0, max: albumsMaxIndex})
        );
    }, []);

    return (
        <div className="random-selection">
            <h2>Random Selection</h2>
            <div className="track-container">
                {
                    albumsToRender.map((albumIndex, index) => {
                        if (typeof albums[albumIndex] !== 'undefined') {
                            return <Album album={albums[albumIndex]} key={index} />;
                        }

                        return <Album album={false} key={index} />;
                    })
                }
            </div>
        </div>
    );
}

export default RandomSelection;
