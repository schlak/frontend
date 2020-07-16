import React, { useState, useEffect } from "react";
import { isMobileOnly } from "react-device-detect";
import { useInterval } from "../hooks/useInterval";

import AFCBackground from "./AFCBackground";

function AFCBackgroundMulti(props) {
    // Spawn a new AFCBackground to slide-down
    // on-top of current one every 20 seconds
    const [afcbackgrounds, setAfcbackgrounds] = useState([<AFCBackground key={0} />]);

    const spawnAFCBackground = () => {
        const lastComponent = afcbackgrounds[afcbackgrounds.length-1];
        const newKey = lastComponent.key + 1;
        setAfcbackgrounds(
            [lastComponent, <AFCBackground key={newKey} />]
        );
    }

    useInterval(() => {
        if (!isMobileOnly)
            spawnAFCBackground();
    }, 20000);

    return (<>{afcbackgrounds}</>);
}

export default AFCBackgroundMulti;
