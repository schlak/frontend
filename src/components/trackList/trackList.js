import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";

import { fetchAlbums } from "../../store/actionCreators";

import Album from "./album";
import TrackInfo from "../sideBar/trackInfo";

function TrackList() {
    const dispatch = useDispatch();

    // Get album list from store
    const albumStore = useSelector((state) => state.music.albums);
    const albums = albumStore.data;
    const isLoading = albumStore.isFetching || albumStore.didError;

    // Fetch albums from api
    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    return (
        <div className="track-list">
            {isMobile && <TrackInfo isFixedToTop={false} />}

            {isLoading &&
                [...Array(4)].map((x, key) =>
                    <Album albumIndex={-1} key={key} />
                )
            }

            {albums.map((album, key) => {
                return <Album albumIndex={key} key={key} />;
            })}
        </div>
    );
}

export default TrackList;
