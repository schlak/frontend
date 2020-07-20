import React from "react";

import AlbumList from "../components/TrackList/AlbumList";

function Albums() {
    return (
        <>
            <div className="Albums container">
                <section>
                    <h2>Albums</h2>
                    <AlbumList />
                </section>
            </div>
        </>
    );
}

export default Albums;
