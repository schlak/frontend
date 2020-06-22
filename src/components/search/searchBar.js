import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSearch } from "../../store/actionCreators";

function SearchBar() {
    const dispatch = useDispatch();

    // Search input value in store
    const search = useSelector((state) => state.music.albums.filter.search);

    const updateSearch = (evt) => {
        evt.preventDefault();
        if (search !== evt.target.value) {
            dispatch(updateUserSearch(evt.target.value));
        }
    }

    return (
        <div className="search-bar">
            <input
                placeholder="Search..."
                name="music"
                value={search}
                onChange={updateSearch}
            />
        </div>
    );
}

export default SearchBar;
