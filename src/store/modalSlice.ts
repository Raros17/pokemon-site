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
//action Creator을 export햇음.

//export const selectModal = (state:RootState) => state.modal;
//reducer함수를 export해서 밖에서도 쓸 수 있다고 한다. 
//해당 slice로 정의된 전역 상태를 가져올 수 있는 함수라고 하는데...
export default modalSlice.reducer; //slice의 reducer부분을 export함 

//export const themeReducer = themeSlice.reducer;
//export const themeActions = themeSlice.actions;