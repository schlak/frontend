import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Tag from "./tag";

function Tags() {
    // Get selected tags from store
    const albumStore = useSelector((state) => state.music.albums);
    const isLoading = albumStore.isFetching || albumStore.didError;
    const [tags, setTags] = useState([]);

    // Populate genre tags
    useEffect(() => {
        setTags(
            albumStore.data.reduce(function(filtered, album, key) {
                const genre = album.genre.toLowerCase();

                // Only add unique genre tags
                if (!filtered.includes(genre)) {
                    filtered.push(genre);
                }

                return filtered;
            }, []).sort()
        );
    }, [albumStore.data]);

    return (
        <div className="tags">
            {isLoading &&
                [...Array(7)].map((x, key) =>
                    <Tag tag={null} key={key} />
                )
            }

            {
                tags.map((tag, key) => {
                    return <Tag tag={tag} key={key} />
                })
            }
        </div>
    );
}

export default Tags;
