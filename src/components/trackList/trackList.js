import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAlbums } from "../../store/actionCreators";

import Album from "./album";
import TrackInfo from "../sideBar/trackInfo";

function TrackList() {
    const dispatch = useDispatch();

    // Get album list from store
    const albums = useSelector((state) => state.music.albums.items);
    const isLoading = useSelector((state) => state.music.albums.isFetching);
    const isDesktop = useSelector((state) => state.window.isDesktop);

    // Fetch albums from api
    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    return (
        <div className="track-list">
            {!isDesktop && <TrackInfo isFixedToTop={false} />}

            {isLoading && <div className="loading offset">Loading...</div>}

            {albums.map((album, key) => {
                return <Album albumIndex={key} key={key} />;
            })}
        </div>
    );
}

export default TrackList;
