import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Chance from "chance";

import { nRowsOfAlbums } from "utils/sortTracks";

import Album from "./Tracks/Album";

function RandomSelection(props) {
    // Get albums list from store
    const albums = useSelector((state) => state.music.tracks.albumsData);
    const [albumsToRender, setAlbumsToRender] = useState([-1, -1, -1, -1]);

    // Generate up-to 10 - unique - random numbers (used as album indexes)
    useEffect(() => {
        const chance = new Chance();
        let albumsAmmount = nRowsOfAlbums(1);
        if (albumsAmmount === 2) albumsAmmount = 4;
        let albumsMaxIndex = albumsAmmount - 1;
        if (albums.length > 0) albumsMaxIndex = albums.length - 1;
        if (albums.length > 0 && albums.length < albumsAmmount)
            albumsAmmount = albums.length;

        setAlbumsToRender(
            chance.unique(chance.integer, albumsAmmount, {
                min: 0,
                max: albumsMaxIndex,
            })
        );
    }, [albums.length]);

    return (
        <div className="random-selection">
            <h2>Random Selection</h2>
            <div className="track-container grid grid-albums">
                {albumsToRender.map((albumIndex, index) => {
                    if (typeof albums[albumIndex] !== "undefined") {
                        return <Album album={albums[albumIndex]} key={index} />;
                    }

                    return <Album album={false} key={index} />;
                })}
            </div>
        </div>
    );
}

export default RandomSelection;
