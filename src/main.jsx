import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import { getUser } from "./features/authSlice.js";
import { getGalaxy } from "./features/galaxySlice.js";
import {getAuthUser} from "./features/userSlice.js";

import "leaflet/dist/leaflet.css";
import "./assets/css/index.css";

store.dispatch(getUser(false));
store.dispatch(getGalaxy());
store.dispatch(getAuthUser());


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
