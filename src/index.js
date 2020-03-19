import React from "react"
import ReactDOM from "react-dom"

import App from "src/App/app"
import { Auth0Provider } from "src/RedButton/auth0-spa"

import * as serviceWorker from "src/lib/helpers/serviceWorker"
import config from "./Authorization/auth0.config"
import history from "src/lib/helpers/history"

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
};

ReactDOM.render(
  <Auth0Provider
    domain={ config.domain }
    client_id={ config.clientId }
    redirect_uri="http://localhost:3000/dashboard/red-button/callback"
    onRedirectCallback={ onRedirectCallback }
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
