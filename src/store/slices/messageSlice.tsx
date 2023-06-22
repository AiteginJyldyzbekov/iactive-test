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

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (data: FormData) => {
    const response = await Api.message.getMessages(data);
    return response;
  }
);

export const fetchNewMessages = createAsyncThunk(
  'messages/fetchNewMessages',
  async (data: FormData) => {
    const response = await Api.message.getMessages(data);
    return response;
  }
);

export const fetchOldMessages = createAsyncThunk(
  'messages/fetchOldMessages',
  async (data: FormData) => {
    const response = await Api.message.getMessages(data);
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
  name: "messages",
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
    builder.addCase(fetchMessages.pending, (state) => {
      state.loading = LoadingStatus.pending;
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.loading = LoadingStatus.succeeded;
      state.messages = action.payload.Messages;
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.loading = LoadingStatus.failed;
      state.error = action.error.message as string;
    });

    // Get new messages
    builder.addCase(fetchNewMessages.pending, (state) => {
      state.loading = LoadingStatus.pending;
    });
    builder.addCase(fetchNewMessages.fulfilled, (state, action) => {
      const isNewMessages = String(action.payload) === "no message";
      if (isNewMessages) {
        state.messages = state.messages;
      } else if (action.payload) {
        const newMessages = action.payload.Messages?.reverse();

        if (state.ascending === "DESC") {
          state.messages = state.messages.concat(newMessages);
        } else {
          state.messages = newMessages.concat(state.messages);
        }
      }
      state.loading = LoadingStatus.succeeded;

    });
    builder.addCase(fetchNewMessages.rejected, (state, action) => {
      state.loading = LoadingStatus.failed;
      state.error = action.error.message as string;
    });

    // Get old messages
    builder.addCase(fetchOldMessages.pending, (state) => {
      state.loading = LoadingStatus.pending;
    });
    builder.addCase(fetchOldMessages.fulfilled, (state, action) => {
      const newMessages = action.payload.Messages?.reverse();
      if (state.ascending === "DESC") {
        state.messages = newMessages.concat(state.messages);
      } else {
        state.messages = state.messages.concat(newMessages);
      }
      state.loading = LoadingStatus.succeeded;
    });
    builder.addCase(fetchOldMessages.rejected, (state, action) => {
      state.loading = LoadingStatus.failed;
      state.error = action.error.message as string;
    });
  },
});

export const { setNewMessage, sortArrayByDate, setAscending } =
  messagesSlice.actions;
export default messagesSlice.reducer;