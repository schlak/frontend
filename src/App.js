import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { isMobileOnly } from "react-device-detect";
import { useInterval } from "./hooks/useInterval";

import Audio from "./components/Audio";
import NavBar from "./components/NavBar";
import AFCBackground from "./components/AFCBackground";

import "./styles/index.scss";

function App() {
    // Get session state from store
    const session = useSelector((state) => state.session);

    // Update title with currently playing track
    useEffect(() => {
        if (session.playing.track.id) {
            document.title = `${session.playing.track.metadata.artist} - ${session.playing.track.metadata.title} | Music Library`;
        }
    }, [
        session.playing.track.id,
        session.playing.track.metadata.artist,
        session.playing.track.metadata.title,
    ]);

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

    return (
        <>
            <Audio />
            <div className="App">
                <div className="app-wrapper">
                    <NavBar content="title" />
                    {afcbackgrounds}

                    {/* Routes */}
                    {/*
                        <Route path="/" exact render={props => <NavBar content="search-bar" />} />
                        <Route path="/albums" render={props => <NavBar content="search-bar" />} />
                    */}
                </div>
            </div>
        </>
    );
}

export default App;
