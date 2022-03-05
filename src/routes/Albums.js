import React from "react";

import AlbumList from "components/TrackList/AlbumList";
import Tags from "components/Tags/Tags";

function Albums() {
    return (
        <>
            <div className="Albums container">
                <section>
                    <h2>Albums</h2>
                    <Tags />
                    <AlbumList />
                </section>
            </div>
        </>
    );
}

export default Albums;
