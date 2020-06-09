import React from "react";
import { render } from "@testing-library/react";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import musicApp from "../store/reducer";
import thunk from "redux-thunk";

import App from "../App";

const store = createStore(musicApp, applyMiddleware(thunk));

test("renders app", () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );
});
