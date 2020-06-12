import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { isDesktop } from "./store/actionCreators";
import "./styles/index.scss";

import Audio from "./components/audio";
// import Users from "./components/users";
import SideBar from "./components/sideBar/sideBar";
import TrackList from "./components/trackList/trackList";

function App() {
    const dispatch = useDispatch();

    // Get session state from store
    const session = useSelector((state) => state.session);
    const windowIsDesktop = useSelector((state) => state.window.isDesktop);

    // Is desktop screen size
    const handleIsDesktop = () => {
        dispatch(isDesktop(window.innerWidth > 1300));
    };

    // Handle window re-size
    useEffect(() => {
        handleIsDesktop();
        window.addEventListener("resize", handleIsDesktop);

        return () => {
            window.removeEventListener("resize", handleIsDesktop);
        }
    }, []);

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
                    <TrackList />
                    {
                        windowIsDesktop &&
                        <SideBar />
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
