import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import blogReducer from "./reducers/blogReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
  },
});

export default store;
