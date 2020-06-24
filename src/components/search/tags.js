import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Tag from "./tag";

function Tags() {
    // Get selected tags from store
    const trackStore = useSelector((state) => state.music.tracks);
    const isLoading = trackStore.isFetching || trackStore.didError;
    const [tags, setTags] = useState([]);

    // Populate genre tags
    useEffect(() => {
        setTags(
            trackStore.data.reduce(function(filtered, track, key) {
                const genre = track.metadata.genre.toLowerCase();

                // Only add unique genre tags
                if (!filtered.includes(genre)) {
                    filtered.push(genre);
                }

                return filtered;
            }, []).sort()
        );
    }, [trackStore.data]);

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
