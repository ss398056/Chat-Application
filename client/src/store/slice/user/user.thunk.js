import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../utilities/axios.instance.js";

export const loginUserThunk =  createAsyncThunk('user/login',async ({username,password}, thunkAPI) => {
    try{
        const response = await axiosInstance.post('/user/login', {
            username,
            password
        })
        const data = response.data; 
        //console.log(response.data);
        return data;
    }
    catch(error){
         //console.log(error.response.data.error)
        // toast.error(error.response.data.error)
        return thunkAPI.rejectWithValue(error?.response?.data?.error)
    }
})

export const signupUserThunk =  createAsyncThunk('user/signup',async ({username,password, gender, fullName}, thunkAPI) => {
    try{
        const response = await axiosInstance.post('/user/register', {
            fullName,
            username,
            password,
            gender
        })
        const data = response.data; 
        //console.log(response.data);
        return data;
    }
    catch(error){
        // console.log(error.response.data.error)
        // toast.error(error.response.data.error)
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})


export const logoutUserThunk =  createAsyncThunk('user/logout',async ( thunkAPI ) => {
    try{
        const response = await axiosInstance.post('/user/logout')
        const data = response.data; 
        //console.log(response.data);
        return data;
    }
    catch(error){
        // console.log(error.response.data.error)
        // toast.error(error.response.data.error)
        return thunkAPI.rejectWithValue(error?.response?.data?.error)
    }
})


export const getOtherUsersThunk =  createAsyncThunk('user/users',async (thunkAPI) => {
    try{
        const response = await axiosInstance.get('/user/users')
        const data = response.data; 
        //console.log(response.data);
        return data;
    }
    catch(error){
         //console.log("error",error.response.data.error)
        // toast.error(error.response.data.error)
        return thunkAPI.rejectWithValue(error?.response?.data?.error || "Something went wrong!")
    }
})


export const getUserProfileThunk =  createAsyncThunk('user/profile',async ( thunkAPI ) => {
    try{
        const response = await axiosInstance.get('/user/profile')
        const data = response.data; 
        //console.log(response.data);
        return data;
    }
    catch(error){
        // console.log(error.response.data.error)
        // toast.error(error.response.data.error)
        return thunkAPI.rejectWithValue(error?.response?.data?.error)
    }
})