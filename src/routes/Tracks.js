import React from "react";

import TrackList from "components/TrackList/TrackList";
import Tags from "components/Tags/Tags";

function Tracks() {
    return (
        <>
            <div className="Tracks container">
                <section>
                    <h2>Tracks</h2>
                    <Tags />
                    <TrackList />
                </section>
            </div>
        </>
    );
}

export default Tracks;
