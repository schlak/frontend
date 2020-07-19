import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchTracks } from "./store/actionCreators";

import AFCBackgroundMulti from "./components/AFCBackgroundMulti";
import Audio from "./components/Audio";
import FloatingAlbumCover from "./components/FloatingAlbumCover";
import NavBar from "./components/NavBar";
import NavLinks from "./components/NavLinks";
import SocketGlobal from "./components/SocketGlobal";

import Home from "./routes/Home";
import Albums from "./routes/Albums";
import Artists from "./routes/Artists";
import Tracks from "./routes/Tracks";

import "./styles/index.scss";

function App() {
    const dispatch = useDispatch();
    const sessionTrack = useSelector((state) => state.session.playing.track);

    // Fetch tracks index from api
    useEffect(() => {
        dispatch(fetchTracks());
    }, [dispatch]);

    // Update title with currently playing track
    useEffect(() => {
        if (sessionTrack.id) {
            document.title = `${sessionTrack.metadata.artist} - ${sessionTrack.metadata.title} | Music Library`;
        }
    }, [sessionTrack]);

    return (
        <>
            <Audio />
            <SocketGlobal />
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

                    {/* Active Track Album Cover */}
                    <FloatingAlbumCover />

                    {/* AFCBackground */}
                    <AFCBackgroundMulti />

                    {/* Footer */}
                    <div style={{marginTop: "250px"}}></div>
                </div>
            </div>
        </>
    );
}

export default App;
