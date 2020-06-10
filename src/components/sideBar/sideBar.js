import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Oscilloscope from "oscilloscope";

function SideBar() {
    // Get session state from store
    const session = useSelector((state) => state.session);
    const track = session.playing.track;
    let coverURL = `${process.env.REACT_APP_API}/tracks/${track.id}/cover/600`;

    if (!track.id) {
        coverURL = `${process.env.REACT_APP_API}/tracks/example/cover/600`;
    }

    // Scroll to playing track
    const handleScrollToTrack = () => {
        if (track.id) {
            const $track = document.getElementById(track.id);
            $track.scrollIntoView();
        }
    }

    useEffect(() => {
        if (track.id) {
            const audioContext = new window.AudioContext();
            const audioElement = window.soundManager.sounds[window.soundManager.soundIDs[0]]._a;
            audioElement.crossOrigin = "anonymous";

            // create source from html5 audio element
            const source = audioContext.createMediaElementSource(audioElement);

            // attach oscilloscope
            const scope = new Oscilloscope(source, { fftSize: 2048 });

            // start default animation loop
            const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#222222";
            scope.animate(ctx);

            //  reconnect audio output to speakers
            source.connect(audioContext.destination);
        }
    }, [track.id]);

    return (
        <div className="side-bar">
            <div className="wrapper">
                <div className="album-cover">
                    <img src={coverURL} alt="album cover" width="100%" draggable="false" />
                </div>
                <div className="oscilloscope">
                    <canvas id="canvas" width="1200px" height="300px"></canvas>
                </div>
                <div className="track-info" onClick={handleScrollToTrack}>
                    <p className="track-title">{track.metadata.title}</p>
                    <p className="track-artist">{track.metadata.artist}</p>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
