import React from "react"
import ReactDOM from "react-dom"

import App from "src/App/app"

import * as serviceWorker from "src/lib/helpers/serviceWorker"

// A function that routes the user to the right place

ReactDOM.render(
  <App />, document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
