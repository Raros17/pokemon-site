import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
};

export const modalSlice = createSlice({
  name: "modal", 
  initialState,
  reducers: {
    openModal : (state) => {
        state.isOpen = true;
    },
    closeModal: (state) => {
        state.isOpen = false;
      }
      //!넣어서 그냥 하나로
  }, 
});
export const { openModal, closeModal } = modalSlice.actions; 
export default modalSlice.reducer;
