import React from "react";;

function ControlButton({ name, icon, isActive, onClickFunction }) {
    return (
        <div className={`control-button ${name}${isActive ? " selected" : ""}`} onClick={onClickFunction}>
            {icon}
        </div>
    );
}

export default ControlButton;
