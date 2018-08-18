import React from "react";
import ReactDOM from "react-dom";
import Game from "components/Game";
import configureStore from "./configureStore";

const store = configureStore();

ReactDOM.render(<Game store={store} />, document.getElementById("root"));
