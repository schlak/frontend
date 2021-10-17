import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";

import { fetchTracks } from "./store/actionCreators";

import Audio from "./components/Audio/Audio";
import AudioControlBar from "./components/Audio/AudioControlBar";
import FloatingAlbumCover from "./components/FloatingAlbumCover";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import GlobalColor from "./components/GlobalColor";
import SocketGlobal from "./components/SocketGlobal";

import Home from "./routes/Home";
import Albums from "./routes/Albums";
import AlbumIndividual from "./routes/AlbumIndividual";
import Playlists from "./routes/Playlists";
import Tracks from "./routes/Tracks";

import "./styles/index.scss";

function App() {
    const dispatch = useDispatch();
    const sessionTrack = useSelector((state) => state.session.playing.track);

    // Fetch tracks index from api
    useEffect(() => {
        dispatch(fetchTracks());
    }, []);

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
            <div className={`App ${isMobile ? "is-mobile" : "is-desktop"}`}>
                <div className="app-wrapper">
                    {/* Navbar + Navlinks & Title + Search-bar */}
                    <NavBar content="title" />

                    {/* Routes */}
                    <div className="app-page">
                        <Route path="/" exact render={(props) => <Home />} />
                        <Route
                            path="/albums"
                            exact
                            render={(props) => <Albums />}
                        />
                        <Route
                            path="/albums/:id"
                            render={(props) => <AlbumIndividual />}
                        />
                        <Route
                            path="/playlists"
                            render={(props) => <Playlists />}
                        />
                        <Route path="/tracks" render={(props) => <Tracks />} />
                    </div>

                    {/* Audio Control Bar */}
                    <AudioControlBar render={["all"]} />
                    {window.innerWidth < 750 && (
                        <AudioControlBar render={["track"]} offset={true} />
                    )}

                    {/* MISC elements with position fixed/absolute */}
                    <FloatingAlbumCover />
                    <GlobalColor />
                    {/* <AFCBackgroundMulti /> */}

                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default App;
