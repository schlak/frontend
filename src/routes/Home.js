import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

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
