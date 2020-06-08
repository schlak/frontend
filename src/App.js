import React, { useState, useEffect } from "react";
import Audio from "./components/audio";
import TrackList from "./components/trackList/trackList";
import Users from "./components/users";

import { api } from "./utils/api";
import "./styles/index.scss";

function App() {
    // All tracks sorted into albums
    const [albums, setAlbums] = useState([]);

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
            document.title = `Music | ${audio.playing.metadata.artist} - ${audio.playing.metadata.title}`
        }
    }, [audio.playing.id, audio.playing.metadata.artist, audio.playing.metadata.title]);

    // Fetch tracks index
    useEffect(() => {
        api()
            .get("/albums")
            .then((res) => {
                setAlbums(res.data);
                console.log("Albums:", res.data);
            });
    }, []);

    return (
        <div className="App">
            <div className="container" style={{ margin: "50px auto" }}>
                <Audio audio={audio} />
                <Users />
                <TrackList albums={albums} audio={audio} setAudio={setAudio} />
            </div>
        </div>
    );
}

export default App;
