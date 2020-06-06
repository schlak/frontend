import React, { useState, useEffect } from "react";
import TrackList from "./components/trackList/trackList"
import { api } from "./utils/api";
import "./styles/index.scss";

function App() {

    // All tracks sorted into albums
    const [albums, setAlbums] = useState([]);

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
            <div className="container" style={{margin: "50px auto"}}>
                <TrackList albums={albums} />
            </div>
        </div>
    );
}

export default App;
