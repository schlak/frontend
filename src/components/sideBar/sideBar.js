import React from "react";

import AlbumCover from "./albumCover";
import Oscilloscope from "./oscilloscope";
import TrackInfo from "./trackInfo";

function SideBar() {
    return (
        <div className="side-bar">
            <div className="wrapper">
                <AlbumCover />
                <Oscilloscope />
                <TrackInfo isFixedToTop={false} />
            </div>
        </div>
    );
}

export default SideBar;
