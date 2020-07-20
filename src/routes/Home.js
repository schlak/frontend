import React from "react";

import ActiveUsers from "../components/ActiveUsers";
import RandomSelection from "../components/RandomSelection";

function Home() {
    return (
        <>
            <div className="Home container">
                <section>
                    <RandomSelection />
                </section>
                <section>
                    <ActiveUsers />
                </section>
            </div>
        </>
    );
}

export default Home;
