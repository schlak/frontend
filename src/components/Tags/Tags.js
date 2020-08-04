import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

import Tag from "./Tag";

function Tags() {
    const tracks = useSelector((state) => state.music.tracks.data);
    const isFetching = useSelector((state) => state.music.tracks.isFetching);
    const didError = useSelector((state) => state.music.tracks.didError);
    const isLoading = isFetching || didError;

    // Tags
    const [tags, setTags] = useState([]);

    // Populate genre tags
    useEffect(() => {
        setTags(
            tracks.reduce(function(filtered, track, key) {
                const genre = track.metadata.genre.toLowerCase();

                // Only add unique genre tags
                if (!filtered.includes(genre)) {
                    filtered.push(genre);
                }

                return filtered;
            }, []).sort()
        );
    }, [tracks]);

    return (
        <div className="tags">
            {isLoading &&
                [...Array(6)].map((x, key) =>
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
