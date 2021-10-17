import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { isMobileOnly } from "react-device-detect";
import { useInterval } from "../hooks/useInterval";

import { colorNext } from "../store/actionCreators";

function GlobalColor() {
    const dispatch = useDispatch();

    const updateGlobalColor = () => {
        dispatch(colorNext());
    };

    // Spawn a new AFCBackground every 30 seconds
    useInterval(() => {
        updateGlobalColor();
    }, 30000);

    // Spawn a new AFCBackground on URL change
    const location = useLocation();
    useEffect(() => {
        if (!isMobileOnly) updateGlobalColor();
    }, [location]);

    return <></>;
}

export default GlobalColor;
