import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mdiLoading } from '@mdi/js';

import { fetchAlbums } from "../../store/actionCreators";

import Icon from '@mdi/react';
import Album from "./album";

function TrackList() {
    const dispatch = useDispatch();

    // Get album list from store
    const albums = useSelector(state => state.music.albums.items);
    const isLoading = useSelector(state => state.music.albums.isFetching);

    // Fetch albums from api
    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    return (
        <div className="track-list">
            {isLoading &&
                <div className="loader offset">
                    <Icon path={mdiLoading} color="#222222" spin={1} />
                </div>
            }

            {albums.map((album, key) => {
                return (
                    <Album
                        albumIndex={key}
                        key={key}
                    />
                );
            })}
        </div>
    );
}

export default TrackList;
