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
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      const { payload } = action;
      channelsAdapter.setAll(state, payload.channels);
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = payload.currentChannelId;
    });
  },
});

export const { addChannel, removeChannel, renameChannel } = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
