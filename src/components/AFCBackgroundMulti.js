import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { isMobileOnly } from "react-device-detect";
import { useInterval } from "../hooks/useInterval";

import { colorNext } from "../store/actionCreators";

import AFCBackground from "./AFCBackground";

function AFCBackgroundMulti(props) {
    const dispatch = useDispatch();

    const colors = useSelector((state) => state.color.colors);
    const colorIndex = useSelector((state) => state.color.current);

    // Array of AFCBackground components being rendered
    const [afcbackgrounds, setAfcbackgrounds] = useState([
        <AFCBackground key={0} color={colors[colorIndex]} />,
    ]);

    const updateGlobalColor = () => {
        dispatch(colorNext());
    };

    // Wait for global color to change before spawning a new background
    useEffect(() => {
        // Spawn a new AFCBackground to slide-down
        const lastComponent = afcbackgrounds[afcbackgrounds.length - 1];
        const newKey = lastComponent.key + 1;
        setAfcbackgrounds([
            ...afcbackgrounds.slice(-2),
            <AFCBackground key={newKey} color={colors[colorIndex]} />,
        ]);
    }, [colorIndex]);

    // Spawn a new AFCBackground every 30 seconds
    useInterval(() => {
        updateGlobalColor();
    }, 30000);

    // Spawn a new AFCBackground on URL change
    const location = useLocation();
    useEffect(() => {
        if (!isMobileOnly) updateGlobalColor();
    }, [location]);

    return <>{afcbackgrounds}</>;
}

export default AFCBackgroundMulti;
