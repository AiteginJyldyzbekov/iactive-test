import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../api/Api";
import { messageType } from "../types";
import { LoadingStatus } from "../../types/types";

type InitialStateType = {
  messages: messageType[];
  loading: LoadingStatus | null;
  error: string | null;
  ascending: string;
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
  ascending: "DESC",
  loading: LoadingStatus.idle,
  error: null,
};
export const messagesSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setNewMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    sortArrayByDate: (state, action) => {
      const { messages, ascending } = action.payload;

      const sortedArray = [...messages].sort((a, b) => {
        if (ascending) {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
      });

      state.messages = sortedArray;
    },
    setAscending: (state, action) => {
      state.ascending = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get all messages
    builder.addCase(getMessages.pending, (state) => {
      state.loading = LoadingStatus.pending;
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.loading = LoadingStatus.succeeded;
      state.messages = action.payload.Messages;
    });
    builder.addCase(getMessages.rejected, (state, action) => {
      state.loading = LoadingStatus.failed;
      state.error = action.error.message as string;
    });

    // Get new messages
    builder.addCase(getNewMessages.pending, (state) => {
      state.loading = LoadingStatus.pending;
    });
    builder.addCase(getNewMessages.fulfilled, (state, action) => {
      const isNewMessages = String(action.payload) === "no message";
      if (isNewMessages) {
        state.messages = state.messages;
      } else if (action.payload) {
        const newMessages = action.payload.Messages?.reverse();

        if (state.ascending === "DESC") {
          state.messages = newMessages.concat(state.messages);
          console.log(state.messages);
        } else {
          state.messages = state.messages.concat(newMessages);
          console.log(state.messages);
        }
      }
      state.loading = LoadingStatus.succeeded;

    });
    builder.addCase(getNewMessages.rejected, (state, action) => {
      state.loading = LoadingStatus.failed;
      state.error = action.error.message as string;
    });

    // Get old messages
    builder.addCase(getOldMessages.pending, (state) => {
      state.loading = LoadingStatus.pending;
    });
    builder.addCase(getOldMessages.fulfilled, (state, action) => {
      state.loading = LoadingStatus.succeeded;
      const newMessages = action.payload.Messages?.reverse();
      if (state.ascending === "DESC") {
        state.messages = newMessages.concat(state.messages);
        console.log(state.messages);
      } else {
        state.messages = state.messages.concat(newMessages);
        console.log(state.messages);
      }
    });
    builder.addCase(getOldMessages.rejected, (state, action) => {
      state.loading = LoadingStatus.failed;
      state.error = action.error.message as string;
    });
  },
});

export const { setNewMessage, sortArrayByDate, setAscending } =
  messagesSlice.actions;
export default messagesSlice.reducer;