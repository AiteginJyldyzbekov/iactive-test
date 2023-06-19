import { createSlice } from "@reduxjs/toolkit";
import { messageType } from "../types";

type initialStateType = {
  messages: messageType[];
  isLoading: boolean;
};

const initialState: initialStateType = {
  messages: [
    {
      attachments: [{ type: "", url: "" }],
      author: "",
      channel: "",
      content: "",
      date: "",
      id: "",
      region: "",
      senderNumber: "",
    },
  ],
  isLoading: true,
};

export const messagesSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setAllMessages: (state, action) => {
      state.messages = action.payload;
    },
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
    setIsloading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAllMessages, setNewMessage, sortArrayByDate, setIsloading } =
  messagesSlice.actions;
export default messagesSlice.reducer;