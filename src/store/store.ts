import { configureStore } from '@reduxjs/toolkit';
import modalReducer from "./modalSlice";
import themeReducer from "./themeSlice"

const store = configureStore({
  reducer: {
    modal: modalReducer,
    theme: themeReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export default store;