import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {Provider} from "react-redux";
import store from "./store.js";
import "./assets/css/index.css";
import {getUser} from "./features/authSlice.js";

store.dispatch(getUser(false));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
