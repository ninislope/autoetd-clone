// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from "react-hot-loader";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./store";

document.addEventListener("DOMContentLoaded", () => {
    const HotApp = hot(module)(App);
    render(
        <Provider store={store}>
            <HotApp />
        </Provider>,
        document.querySelector("#root"),
    );
});
