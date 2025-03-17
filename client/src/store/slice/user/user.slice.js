import { createSlice } from "@reduxjs/toolkit";
import { getOtherUsersThunk, getUserProfileThunk, loginUserThunk, logoutUserThunk, signupUserThunk } from "./user.thunk";
import toast from "react-hot-toast";

const initialState = {
  isAuthenticated: false,
  screenLoading: true,
  buttonLoading: false,
  selectedUser: null,
  userProfile: null,
  otherUsers: []
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action)=>{
      //console.log("userId",action.payload)
      state.selectedUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    //User Login Process
    builder.addCase(loginUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
      state.screenLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      //console.log("Fulfilled..");
      state.userProfile = action.payload?.user;
      state.isAuthenticated = true
      state.buttonLoading = false;
      state.screenLoading = false;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
      state.screenLoading = false;
      toast.error(action.payload);
    });

    //User Register Process
    builder.addCase(signupUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
      state.screenLoading = true;
    });
    builder.addCase(signupUserThunk.fulfilled, (state, action) => {
      //console.log("Fulfilled..");
      state.userProfile = action.payload?.data;
      state.isAuthenticated = true
      state.buttonLoading = false;
      state.screenLoading = false;
    });
    builder.addCase(signupUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
      state.screenLoading = false;
      toast.error(action.payload);
    });


    //User Logout Process
    builder.addCase(logoutUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
      state.screenLoading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      //console.log("Fulfilled..");
      state.userProfile = null;
      state.buttonLoading = false;
      state.users = [];
      state.isAuthenticated = false;
      state.screenLoading = false;
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
      state.screenLoading = false;
      toast.error(action.payload);
    });


    //Get All Other Users
    builder.addCase(getOtherUsersThunk.pending, (state, action) => {
      state.buttonLoading = true;
      state.screenLoading = true;
    });
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      //console.log("Fulfilled..");
      state.otherUsers = action.payload?.users;
      state.isAuthenticated = true
      state.buttonLoading = false;
      state.screenLoading = false;
    });
    builder.addCase(getOtherUsersThunk.rejected, (state, action) => {
      state.buttonLoading = false;
      state.screenLoading = false;
      //toast.error(action.payload);
    });


    //Get User Profile
    builder.addCase(getUserProfileThunk.pending, (state, action) => {
      state.buttonLoading = true;
      state.screenLoading = true;
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      //console.log("Fulfilled..");
      state.userProfile = action.payload?.profile;
      state.isAuthenticated = true
      state.buttonLoading = false;
      state.screenLoading = false;
    });
    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      state.buttonLoading = false;
      state.screenLoading = false;
      //toast.error(action.payload);
    });

  },
});

// Action creators are generated for each case reducer function
export const {setSelectedUser,} = userSlice.actions;

export default userSlice.reducer;
