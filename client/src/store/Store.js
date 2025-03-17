import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user/user.slice";
import messageReducer from "./slice/message/message.slice";
import socketReducer from "./slice/socket/socket.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    messageReducer: messageReducer,
    socketReducer: socketReducer,
  },
  //It igroner serializable errors
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["socketReducer.socket"],
      }
      
    }),
});
