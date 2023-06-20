import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Api from "../../api/Api";
import { messageType } from "../types";

type InitialStateType = {
  messages: messageType[];
  loading: 'pending' | 'succeeded' | 'failed' | null;
  error: string | null;
};

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (data: FormData) => {
    const response = await Api.message.getMessages(data);
    return response;
  }
);

export const getNewMessages = createAsyncThunk(
  'messages/getNewMessages',
  async (data: FormData) => {
    const response = await Api.message.getMessages(data);
    return response;
  }
);

export const getOldMessages = createAsyncThunk(
  'messages/getOldMessages',
  async (data: FormData) => {
    const response = await Api.message.getMessages(data);
    console.log(response)
    return response;
  }
);

const initialState: InitialStateType = {
  messages: [],
  loading: null,
  error: null,
};
export const messagesSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setNewMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers: (builder) => {
    // Get all messages
    builder.addCase(getMessages.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.messages = action.payload.Messages;
    });
    builder.addCase(getMessages.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message as string;
    });

    // Get new messages
    builder.addCase(getNewMessages.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getNewMessages.fulfilled, (state, action) => {
      const isNewMessages = String(action.payload) === "no message";
      if (isNewMessages) {
        state.messages = state.messages
      }else if (action.payload){
        state.messages = state.messages.concat(action.payload.Messages?.reverse());
      }
      state.loading = 'succeeded';
    });
    builder.addCase(getNewMessages.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message as string;
    });

    // Get old messages
    builder.addCase(getOldMessages.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getOldMessages.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.messages = state.messages.concat(action.payload.Messages);
    });
    builder.addCase(getOldMessages.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message as string;
    });
  },
});

export const { setNewMessage } =
  messagesSlice.actions;
export default messagesSlice.reducer;