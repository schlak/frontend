import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Tags() {
    // Get selected tags from store
    const albumStore = useSelector((state) => state.music.albums);
    const selectedTags = albumStore.filter.tags;
    const [tags, setTags] = useState(selectedTags);

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

    const handleToggleTag = (e) => {}

    return (
        <div className="tags">
            {
                tags.map((tag, key) => {
                    return (
                        <div className="tag" key={key} onClick={handleToggleTag}>
                            <button>{tag}</button>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Tags;
