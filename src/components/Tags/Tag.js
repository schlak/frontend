import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

function Tag({ tag, className, handleOnClick }) {
    const selectedTags = useSelector((state) => state.music.tracks.filter.tags);
    let isSelected = false;
    let isActive = false;

    // If tag is active
    // -> exists within filtered array
    if (selectedTags.includes(tag)) isSelected = true;

    // Activate "reset tags" button
    if (selectedTags.length > 1) {
        isActive = true;
    }

    // Return Skeleton tag if value is falsy
    if (!tag) {
        return (
            <Skeleton width="70px" height="28px" style={{ margin: "4px" }} />
        );
    }

    return (
        <div
            className={`tag${isSelected ? " selected" : ""}${
                className ? ` ${className}${isActive ? " active" : ""}` : ""
            }`}
            onClick={() => handleOnClick(tag)}
        >
            {tag}
        </div>
    );
}

export default Tag;
