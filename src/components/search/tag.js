import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterToggleTag } from "../../store/actionCreators";

function Tag({ tag }) {
    const dispatch = useDispatch();

    // Get selected tags from store
    const selectedTags = useSelector((state) => state.music.albums.filter.tags);
    let isSelected = false;

    // If tag is active
    // -> exists within filtered array
    if (selectedTags.includes(tag))
        isSelected = true;

    // Toggle tag in filter array
    const handleToggleTag = (e) => {
        dispatch(filterToggleTag(tag));
    }

    return (
        <div className={`tag${isSelected ? " selected" : ""}`} onClick={handleToggleTag}>
            <button>{tag}</button>
        </div>
    );
}

export default Tag;
