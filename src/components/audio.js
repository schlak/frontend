import React, { useState, useEffect } from "react";
import Sound from "react-sound";

function Audio({ audio }) {

    const [playing, setPlaying] = useState(true);

    // Listen for keypress
    // Pause audio on 'space' or 'k'
    useEffect(() => {
        const onKeyUp = ({code}) => {
            if (code === "Space" || code === "KeyK") {
                setPlaying(!playing);
            }
        }

        document.addEventListener('keyup', onKeyUp);
        return () => {
            document.removeEventListener('keyup', onKeyUp);
        }
    });

    return (
        <div className="audio">
            {typeof audio.playing.id === "string" &&
                <Sound
                    url={`https://music.merritt.es/api/tracks/${audio.playing.id}/audio`}
                    playStatus={playing ? Sound.status.PLAYING : Sound.status.PAUSED}
                    volume={25}
                />
            }
        </div>
    );

    // <Sound
    //   url="cool_sound.mp3"
    //   playStatus={Sound.status.PLAYING}
    //   volume={100}
    //   onError={() => {}}
    //   onLoading={this.handleSongLoading}
    //   onPlaying={this.handleSongPlaying}
    //   onFinishedPlaying={this.handleSongFinishedPlaying}
    // />
}

export default Audio;
