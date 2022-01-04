import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchChannels } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      const { payload } = action;
      messagesAdapter.setAll(state, payload.messages);
    });
  },
});

export const { addMessage } = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
