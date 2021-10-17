import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import AFCBackground from "./AFCBackground";

function AFCBackgroundMulti(props) {
    const colors = useSelector((state) => state.color.colors);
    const colorIndex = useSelector((state) => state.color.current);

    // Array of AFCBackground components being rendered
    const [afcbackgrounds, setAfcbackgrounds] = useState([
        <AFCBackground key={0} color={colors[colorIndex]} />,
    ]);

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

    return <>{afcbackgrounds}</>;
}

export default AFCBackgroundMulti;
