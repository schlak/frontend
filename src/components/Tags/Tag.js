import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

function Tag({ tag, handleOnClick }) {
    const selectedTags = useSelector((state) => state.music.tracks.filter.tags);
    let isSelected = false;

    // If tag is active
    // -> exists within filtered array
    if (selectedTags.includes(tag))
        isSelected = true;

    // Return Skeleton tag if value is falsy
    if (!tag) {
        return <Skeleton width="70px" height="28px" style={{margin: "4px"}} />;
    }

    return (
        <div
            className={`tag${isSelected ? " selected" : ""}`}
            onClick={() => handleOnClick(tag)}
        >
            {tag}
        </div>
    );
}

export default Tag;
