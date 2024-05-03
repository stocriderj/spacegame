import {configureStore} from "@reduxjs/toolkit";
// import rootReducer from "./reducers"; // Create this file later
import authReducer from "./features/authSlice";
import galaxyReducer from "./features/galaxySlice";
import userReducer from "./features/userSlice";

const rootReducer = {
  auth: authReducer,
  galaxy: galaxyReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
  // Add middleware, enhancers, and other store configurations here if needed
});

export default store;
