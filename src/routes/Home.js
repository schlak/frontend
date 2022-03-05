import React from "react";

import ActiveUsers from "components/ActiveUsers";
import PopularTracks from "components/PopularTracks";
import RandomSelection from "components/RandomSelection";
import RecentlyListenedTracks from "components/RecentlyListenedTracks";

function Home() {
    return (
        <>
            <div className="Home container">
                <section>
                    <RandomSelection />
                </section>
                <section>
                    <PopularTracks />
                </section>
                <section>
                    <RecentlyListenedTracks />
                </section>
                <section>
                    <ActiveUsers />
                </section>
            </div>
        </>
    );
}

export default Home;
