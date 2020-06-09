import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import "./styles/index.scss";

import Audio from "./components/audio";
import TrackList from "./components/trackList/trackList";
import Users from "./components/users";

function App() {
    // Get session state from store
    const session = useSelector(state => state.session);

    // Update title with currently playing track
    useEffect(() => {
        if (session.playing.track.id) {
            document.title = `${session.playing.track.metadata.artist} - ${session.playing.track.metadata.title} | Music Library`
        }
    }, [session.playing.track.id, session.playing.track.metadata.artist, session.playing.track.metadata.title]);

    return (
        <div className="App">
            <div className="container" style={{ margin: "50px auto" }}>
                <Audio />
                <Users />
                <TrackList />
            </div>
        </div>
    );
}

export default App;
