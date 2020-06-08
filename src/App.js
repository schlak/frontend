import React, { useState, useEffect } from "react";

import "./styles/index.scss";

import Audio from "./components/audio";
import TrackList from "./components/trackList/trackList";
import Users from "./components/users";

function App() {
    // Audio object
    // stores currently playing and selected tracks
    const [audio, setAudio] = useState({
        playing: {
            id: null,
            metadata: {}
        },
        selected: {},
    });

    // Update title with currently playing track
    useEffect(() => {
        if (audio.playing.id) {
            document.title = `${audio.playing.metadata.artist} - ${audio.playing.metadata.title} | Music Library`
        }
    }, [audio.playing.id, audio.playing.metadata.artist, audio.playing.metadata.title]);

    return (
        <div className="App">
            <div className="container" style={{ margin: "50px auto" }}>
                <Audio audio={audio} />
                <Users />
                <TrackList audio={audio} setAudio={setAudio} />
            </div>
        </div>
    );
}

export default App;
