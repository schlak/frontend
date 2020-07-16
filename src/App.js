import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchTracks } from "./store/actionCreators";

import AFCBackgroundMulti from "./components/AFCBackgroundMulti";
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
                    <div className="app-page">
                        <Route path="/" exact render={props => <Home />} />
                        <Route path="/albums" render={props => <Albums />} />
                        <Route path="/artists" render={props => <Artists />} />
                        <Route path="/tracks" render={props => <Tracks />} />
                    </div>

                    {/* AFCBackground */}
                    <AFCBackgroundMulti />
                </div>
            </div>
        </>
    );
}

export default App;
