import {configureStore} from "@reduxjs/toolkit";
// import rootReducer from "./reducers"; // Create this file later
import authReducer from "./features/authSlice";
import galaxyReducer from "./features/galaxySlice";

const rootReducer = {
  auth: authReducer,
  galaxy: galaxyReducer,
};

const store = configureStore({
  reducer: rootReducer,
  // Add middleware, enhancers, and other store configurations here if needed
});

export default store;
