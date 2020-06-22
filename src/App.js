import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

import "./styles/index.scss";

import Audio from "./components/audio";
// import Users from "./components/users";
import SideBar from "./components/sideBar/sideBar";
import TrackList from "./components/trackList/trackList";
import TrackInfo from "./components/sideBar/trackInfo";
import SearchBar from "./components/search/searchBar";
import Tags from "./components/search/tags";

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
        <div className="App">
            <div className="container">
                <div className="app-wrapper">
                    <Audio />

                    <div className="main">
                        {isMobile && <TrackInfo isFixedToTop={false} />}
                        <div className="filter-options">
                            <SearchBar />
                            <Tags />
                        </div>
                        <TrackList />
                    </div>

                    {
                        !isMobile &&
                        <SideBar />
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
