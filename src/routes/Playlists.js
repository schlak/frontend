import React from "react";

import PlaylistCollection from "components/PlaylistCollection/PlaylistCollection";

function Playlists() {
    return (
        <>
            <div className="Playlists container">
                <section>
                    <h2>Playlists</h2>
                    <PlaylistCollection/>
                </section>
            </div>
        </>
    );
}

export default Playlists;
