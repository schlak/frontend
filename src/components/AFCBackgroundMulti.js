import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isMobileOnly } from "react-device-detect";
import { useInterval } from "../hooks/useInterval";

import AFCBackground from "./AFCBackground";

function AFCBackgroundMulti(props) {
    // Array of AFCBackground components being rendered
    const [afcbackgrounds, setAfcbackgrounds] = useState([<AFCBackground key={0} />]);

    // Spawn a new AFCBackground to slide-down
    const spawnAFCBackground = () => {
        const lastComponent = afcbackgrounds[afcbackgrounds.length-1];
        const newKey = lastComponent.key + 1;
        setAfcbackgrounds(
            [...afcbackgrounds.slice(-2), <AFCBackground key={newKey} />]
        );
    }

    // Spawn a new AFCBackground every 30 seconds
    useInterval(() => {
        if (!isMobileOnly)
            spawnAFCBackground();
    }, 30000);

    // Spawn a new AFCBackground on URL change
    const location = useLocation();
    useEffect(() => {
        if (!isMobileOnly)
            spawnAFCBackground();
    }, [location]);

    return (<>{afcbackgrounds}</>);
}

export default AFCBackgroundMulti;
