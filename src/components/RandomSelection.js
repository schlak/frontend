import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import Chance from "chance";

import { groupTracksIntoAlbums } from "../utils/sortTracks";

function RandomSelection(props) {
    // Get album list from store
    const trackStore = useSelector((state) => state.music.tracks);
    const [albums, setAlbums] = useState([]);

    const chance = new Chance();
    let albumsMaxIndex = 4;
    if (albums.length > 0) albumsMaxIndex = albums.length - 1;

    const albumsToRender = chance.unique(chance.integer, 4, {min: 0, max: albumsMaxIndex});

    useEffect(() => {
        setAlbums(groupTracksIntoAlbums(trackStore.data, trackStore.data));
    }, [trackStore]);

    return (
        <div className="random-selection">
            <h2>Random Selection</h2>
            <div className="track-container">
                {
                    albumsToRender.map((albumIndex, index) => {
                        if (typeof albums[albumIndex] !== 'undefined') {
                            const album = albums[albumIndex];
                            const trackId = trackStore.data[album.tracks[0]].id;

                            return (
                                <div className="album" key={index}>
                                    <div className="album-cover" style={{backgroundImage: `url('${process.env.REACT_APP_API}/tracks/${trackId}/cover/600')`}}></div>
                                    <div className="album-metadata">
                                        <div className="album-metadata-album">
                                            <p>{album.album}</p>
                                        </div>
                                        <div className="album-metadata-artist">
                                            <p>{album.album_artist}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div className="album" key={index}>
                                <div className="album-cover" style={{backgroundImage: `url('${process.env.REACT_APP_API}/tracks/example/cover/600')`}}></div>
                                <div className="album-metadata">
                                    <div className="album-metadata-album">
                                        <p><Skeleton /></p>
                                    </div>
                                    <div className="album-metadata-artist">
                                        <p><Skeleton /></p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default RandomSelection;
