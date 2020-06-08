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

    useEffect(() => {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new window.MediaMetadata({
                title: audio.playing.metadata.title,
                artist: audio.playing.metadata.artist,
                album: audio.playing.metadata.album,
                artwork: [
                    { src: `${process.env.REACT_APP_API}/tracks/${audio.playing.id}/cover/96`, sizes: '96x96', type: 'image/jpeg' },
                    { src: `${process.env.REACT_APP_API}/tracks/${audio.playing.id}/cover/192`, sizes: '192x192', type: 'image/jpeg' },
                    { src: `${process.env.REACT_APP_API}/tracks/${audio.playing.id}/cover/256`, sizes: '256x256', type: 'image/jpeg' },
                    { src: `${process.env.REACT_APP_API}/tracks/${audio.playing.id}/cover/512`, sizes: '512x512', type: 'image/jpeg' },
                    { src: `${process.env.REACT_APP_API}/tracks/${audio.playing.id}/cover/1024`, sizes: '1024x1024', type: 'image/jpeg' },
                ]
            });

            navigator.mediaSession.setActionHandler('pause', setPlaying(false));
            navigator.mediaSession.setActionHandler('play', setPlaying(true));
        }
    }, [audio.playing.metadata.title, audio.playing.metadata.artist, audio.playing.metadata.album, audio.playing.id]);

    return (
        <div className="audio">
            {typeof audio.playing.id === "string" &&
                <Sound
                    url={`${process.env.REACT_APP_API}/tracks/${audio.playing.id}/audio`}
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
