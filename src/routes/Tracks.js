import React from "react";

import TrackList from "../components/TrackList/TrackList";

function Tracks() {
    return (
        <>
            <div className="Tracks container">
                <section>
                    <h2>Tracks</h2>
                    <TrackList />
                </section>
            </div>
        </>
    );
}

export default Tracks;
