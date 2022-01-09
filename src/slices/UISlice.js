/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const UISlice = createSlice({
  name: 'UI',
  initialState: {
    modal: {
      modalType: null,
      item: null,
    },
  },
  reducers: {
    setModalInfo: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const { setModalInfo } = UISlice.actions;
export default UISlice.reducer;
