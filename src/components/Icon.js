import React from "react";
import { ReactSVG } from "react-svg";

function Icon({ name }) {
    return <ReactSVG src={`icons/${name}.svg`} />;
}

export default Icon;
