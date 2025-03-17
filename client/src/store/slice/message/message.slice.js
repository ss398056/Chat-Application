import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getUserAllMessagesWithSingleUserThunk, sendMessageThunk } from "./message.thunk";

const initialState = {
  messageLoading: false,
  participants : null,
  conversation: null
};
export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setNewMessage: (state, action)=>{
      const oldConversation = state.conversation ?? []; 
      state.conversation = [...oldConversation, action.payload]
    }
  },
  extraReducers: (builder) => {

    //Send Message Process
    builder.addCase(sendMessageThunk.pending, (state, action) => {
      state.messageLoading = true; 
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      //console.log("Fulfilled..");
      const oldConversation = state.conversation ?? []; 
      state.conversation = [...oldConversation, action.payload.sentMessage]
    });
    builder.addCase(sendMessageThunk.rejected, (state, action) => {
      
    });

    
    //Get User All Messages With A Single User
    builder.addCase(getUserAllMessagesWithSingleUserThunk.pending, (state, action) => {
      state.messageLoading = true;
    });
    builder.addCase(getUserAllMessagesWithSingleUserThunk.fulfilled, (state, action) => {
      state.messageLoading = false;
      state.conversation = action.payload?.messages || null;
      state.participants = action.payload?.participants || null;
    });
    builder.addCase(getUserAllMessagesWithSingleUserThunk.rejected, (state, action) => {
      state.messageLoading = false;
    });

  },
});

// Action creators are generated for each case reducer function
export const {setNewMessage, } = messageSlice.actions;

export default messageSlice.reducer;
