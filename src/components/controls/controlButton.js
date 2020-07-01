import React from "react";
import { useSelector } from "react-redux";

function ControlButton({ name, icon, isActive, onClickFunction }) {
    const trackStore = useSelector((state) => state.music.tracks);
    const isLoading = trackStore.isFetching || trackStore.didError;

    return (
        <div className={`control-button ${name}${isActive ? " selected" : ""}`} onClick={onClickFunction}>
            {
                !isLoading && icon
            }
        </div>
    );
}

export default ControlButton;
