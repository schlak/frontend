import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { isIE } from "react-device-detect";
import oscilloscope from "oscilloscope";

function Oscilloscope() {
    // Get session state from store
    const session = useSelector((state) => state.session);
    const track = session.playing.track;

    useEffect(() => {
        if (track.id && document.getElementById("canvas")) {
            const audioContext = new window.AudioContext();
            const audioElement = window.soundManager.sounds[window.soundManager.soundIDs[0]]._a;
            audioElement.crossOrigin = "anonymous";

            // create source from html5 audio element
            const source = audioContext.createMediaElementSource(audioElement);

            // attach oscilloscope
            const scope = new oscilloscope(source, { fftSize: 2048 });

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
        <div className="oscilloscope">
            {
                !isIE &&
                <canvas id="canvas" width="1200px" height="300px"></canvas>
            }
        </div>
    );
}

export default Oscilloscope;
