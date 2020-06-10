import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import musicApp from "./store/reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Array of middleware to use with redux-store
const middlewares = [thunk];

// Add logger middleware during development
if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

// Create redux store
const store = createStore(musicApp, applyMiddleware(...middlewares));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
