import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    playNextTrackBasedOnSession,
    playingTrackIsPaused,
    shuffleToggle
} from "../../store/actionCreators";

import ControlButton from "./controlButton";

import IconPlay from "../icons/play";
import IconPause from "../icons/pause";
import IconPrevious from "../icons/previous";
import IconNext from "../icons/next";
import IconShuffle from "../icons/shuffle";
// import IconReplay from "../icons/replay";

function Controls() {
    const dispatch = useDispatch();

    const session = useSelector((state) => state.session);
    const shuffle = session.actions.shuffle;

    const handleShuffleToggle = () => {
        dispatch(shuffleToggle());
    };

    const handlePause = () => {
        const isPaused = !session.playing.isPaused;
        dispatch(playingTrackIsPaused(isPaused));
    }

    return (
        <div className="controls">
            <div className="control-group">
                <ControlButton
                    name="previous"
                    icon={<IconPrevious />}
                    isActive={false}
                    onClickFunction={() => { dispatch(playNextTrackBasedOnSession(false)) }}
                />
                {
                    // Render play/pause button
                    !session.playing.isPaused ?
                    <ControlButton
                        name="pause"
                        icon={<IconPause />}
                        isActive={false}
                        onClickFunction={() => { handlePause() }}
                    /> :
                    <ControlButton
                        name="play"
                        icon={<IconPlay />}
                        isActive={false}
                        onClickFunction={() => { handlePause() }}
                    />
                }
                <ControlButton
                    name="next"
                    icon={<IconNext />}
                    isActive={false}
                    onClickFunction={() => { dispatch(playNextTrackBasedOnSession(true)) }}
                />
            </div>
            <ControlButton
                name="shuffle"
                icon={<IconShuffle />}
                isActive={shuffle}
                onClickFunction={handleShuffleToggle}
            />
        </div>
    );
}

export default Controls;
