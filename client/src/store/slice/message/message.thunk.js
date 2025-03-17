import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../utilities/axios.instance.js";

export const sendMessageThunk =  createAsyncThunk('user/message/send',async ({reciverId, message}, thunkAPI) => {
    try{
        const response = await axiosInstance.post(`/user/message/send/${reciverId}`, {
            message
        })
        const data = response.data; 
        console.log(response.data);
        return data;
    }
    catch(error){
        // console.log(error.response.data.error)
        // toast.error(error.response.data.error)
        return thunkAPI.rejectWithValue(error?.response?.data?.error)
    }
})



export const getUserAllMessagesWithSingleUserThunk =  createAsyncThunk('user/message/getmessages',async ({receiverId}, thunkAPI) => {
    try{
        const response = await axiosInstance.get(`/user/message/getmessages/${receiverId}`)
        const data = response?.data?.conversation; 
        console.log("Messages",response.data);
        return data;
    }
    catch(error){
        // console.log(error.response.data.error)
        // toast.error(error.response.data.error)
        return thunkAPI.rejectWithValue(error?.response?.data?.error)
    }
})