import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { useInterval } from "hooks/useInterval";
import { colorNext } from "store/actionCreators";

function GlobalColor() {
    const dispatch = useDispatch();
    const location = useLocation();

    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    const updateGlobalColor = () => {
        dispatch(colorNext());
    };

    // Update global color every 30 seconds
    useInterval(() => {
        updateGlobalColor();
    }, 30000);

    // Update global color on URL change
    useEffect(() => {
        if (location.pathname !== currentPath) {
            setCurrentPath(location.pathname);
            updateGlobalColor();
        }
    }, [location]);

    return <></>;
}

export default GlobalColor;
