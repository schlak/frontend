import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import musicApp from "./store/reducer";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { init as bugcatchInit } from "@bug-catch/browser";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Log version number
const appVersion = process.env.REACT_APP_VERSION || "> 0.0.0";
console.log(`Music Library [Version ${appVersion}]`);

// Bugcatch init
// logs all errors
if (process.env.REACT_APP_BUGCATCH_ENABLE) {
    bugcatchInit({
        base_url: `${process.env.REACT_APP_API}/bugcatch`,
        release: appVersion,
    });
}

// Array of middleware to use with redux-store
const middlewares = [thunk];

// Add logger middleware during development
if (process.env.NODE_ENV === "development") {
    middlewares.push(
        createLogger({
            collapsed: true,
            predicate: (getState, action) =>
                action.type !== "SESSION_PLAYING_UPDATE_STATUS",
        })
    );
}

// Create redux store
const store = createStore(musicApp, applyMiddleware(...middlewares));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
