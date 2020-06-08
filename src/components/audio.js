import React from "react";
import Sound from "react-sound";

function Audio({ audio }) {
    return (
        <div className="audio">
            {typeof audio.playing.id === "string" &&
                <Sound
                    url={`https://music.merritt.es/api/tracks/${audio.playing.id}/audio`}
                    playStatus={Sound.status.PLAYING}
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
