import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isMobileOnly } from "react-device-detect";
import { useInterval } from "./hooks/useInterval";

import { fetchTracks } from "./store/actionCreators";

import AFCBackground from "./components/AFCBackground";
import Audio from "./components/Audio";
import NavBar from "./components/NavBar";
import NavLinks from "./components/NavLinks";

import Home from "./routes/Home";
import Albums from "./routes/Albums";
import Artists from "./routes/Artists";
import Tracks from "./routes/Tracks";

import "./styles/index.scss";

function App() {
    const dispatch = useDispatch();
    const session = useSelector((state) => state.session);

    // Fetch tracks index from api
    useEffect(() => {
        dispatch(fetchTracks());
    }, [dispatch]);

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
                    {/* Navbar + Navlinks */}
                    <NavBar content="title" />
                    <div style={{marginTop: "100px"}}></div>
                    <NavLinks />

                    {/* Routes */}
                    <Route path="/" exact render={props => <Home />} />
                    <Route path="/albums" render={props => <Albums />} />
                    <Route path="/artists" render={props => <Artists />} />
                    <Route path="/tracks" render={props => <Tracks />} />

                    {/* AFCBackground */}
                    {afcbackgrounds}
                </div>
            </div>
        </>
    );
}

export default App;
