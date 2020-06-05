import React, { useState, useEffect } from "react";
import { api } from "./utils/api";
import "./styles/index.scss";

function App() {

    const [tracksIndex, setTracksIndex] = useState([]);

    // Fetch tracks index
    useEffect(() => {
        api()
            .get("/tracks")
            .then((res) => {
                setTracksIndex(res.data);
                console.log(res.data);
            });
    }, []);

    return (
        <div className="App">
            <div className="container" style={{margin: "50px auto"}}>
                {
                    tracksIndex.map((track, key) => {
                        return (
                            <div key={key} style={{marginTop: "10px"}}>
                                <p>
                                    <a href={`https://music.merritt.es/api/tracks/${track.id}/audio`} target="_blank">
                                        {track.metadata.artist} - {track.metadata.title}
                                    </a>
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default App;
