import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { playNextTrack, playingTrackIsPaused, sessionUpdatePlayingStatus } from "../store/actionCreators";

import Sound from "react-sound";

function Audio() {
    const dispatch = useDispatch();

    // Get session state from store
    const session = useSelector((state) => state.session);
    const track = session.playing.track;

    const handlePlayNextTrack = () => {
        dispatch(playNextTrack(session.playing.index));
    };

    const handlePlaying = (audio) => {
        dispatch(sessionUpdatePlayingStatus({
            duration: audio.duration,
            position: audio.position,
        }));
    }

    // Listen for keypress
    // Pause audio on 'space' or 'k'
    useEffect(() => {
        const onKeyUp = ({ code }) => {
            if (code === "KeyP" || code === "KeyK") {
                // Check if there is a track playing
                if (track.id) {
                    dispatch(playingTrackIsPaused(!session.playing.isPaused));
                }
            }
        };

        document.addEventListener("keyup", onKeyUp);
        return () => {
            document.removeEventListener("keyup", onKeyUp);
        };
    });

    // MediaMetadata audio API
    useEffect(() => {
        if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new window.MediaMetadata({
                title: track.metadata.title,
                artist: track.metadata.artist,
                album: track.metadata.album,
                artwork: [
                    {
                        src: `${process.env.REACT_APP_API}/tracks/${track.id}/cover/96`,
                        sizes: "96x96",
                        type: "image/jpeg",
                    },
                    {
                        src: `${process.env.REACT_APP_API}/tracks/${track.id}/cover/192`,
                        sizes: "192x192",
                        type: "image/jpeg",
                    },
                    {
                        src: `${process.env.REACT_APP_API}/tracks/${track.id}/cover/256`,
                        sizes: "256x256",
                        type: "image/jpeg",
                    },
                    {
                        src: `${process.env.REACT_APP_API}/tracks/${track.id}/cover/512`,
                        sizes: "512x512",
                        type: "image/jpeg",
                    },
                    {
                        src: `${process.env.REACT_APP_API}/tracks/${track.id}/cover/1024`,
                        sizes: "1024x1024",
                        type: "image/jpeg",
                    },
                ],
            });

            navigator.mediaSession.setActionHandler(
                "pause",
                dispatch(playingTrackIsPaused(true))
            );
            navigator.mediaSession.setActionHandler(
                "play",
                dispatch(playingTrackIsPaused(false))
            );
        }
    }, [
        dispatch,
        session.playing.index,
        track.id,
        track.metadata.album,
        track.metadata.artist,
        track.metadata.title,
    ]);

    return (
        <>
            {typeof track.id === "string" && (
                <Sound
                    url={`${process.env.REACT_APP_API}/tracks/${track.id}/audio`}
                    playStatus={
                        session.playing.isPaused
                            ? Sound.status.PAUSED
                            : Sound.status.PLAYING
                    }
                    volume={session.playing.status.volume}
                    onPlaying={handlePlaying}
                    onFinishedPlaying={handlePlayNextTrack}
                />
            )}
        </>
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
