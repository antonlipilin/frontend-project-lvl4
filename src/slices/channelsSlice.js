/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getAuthHeader from '../getAuthHeader.js';

const channelsAdapter = createEntityAdapter();

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const res = await axios.get('/api/v1/data', { headers: getAuthHeader() });
    return res.data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ currentChannelId: null }),
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, action) => {
      const id = action.payload;
      delete state.entities[id];
      state.ids = state.ids.filter((i) => i !== id);
      state.currentChannelId = id === state.currentChannelId ? 1 : state.currentChannelId;
    },
    renameChannel: channelsAdapter.updateOne,
    changeCurrentChannel: (state, action) => {
      const { id } = action.payload;
      state.currentChannelId = id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      const { payload } = action;
      channelsAdapter.setAll(state, payload.channels);
      state.currentChannelId = payload.currentChannelId;
    });
  },
});

export const {
  addChannel, removeChannel, renameChannel, changeCurrentChannel,
} = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
