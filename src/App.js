import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Audio from "./components/Audio";

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

    return (
        <>
            <Audio />
            <div className="App">
                <div className="container">
                    <div className="app-wrapper">

                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
