import React from "react";
import Routes from "src/router";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import Boot from "src/redux/boot";

import AppProvider from "src/App/AppProvider";
import GlobalStyles from "src/assets/styles/globalStyle";


const App = () => (
  <Provider store={ store }>
    <AppProvider>
      <>
        <GlobalStyles />
        <Routes />
      </>
    </AppProvider>
  </Provider>
);
Boot()
  .then(() => App())
  .catch(error => console.error(error));

export default App;
