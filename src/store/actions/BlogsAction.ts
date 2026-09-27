import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosError from "@util/axiosError";
export const BlogsAction=createAsyncThunk('blogs/BlogsGetAction',async(_,thunkAPI)=>{
    const {rejectWithValue,signal}=thunkAPI
try {
        const response=await axios.get('/blogs?populate=*',{signal})
          
return response.data.data
} catch (error) {
return rejectWithValue(axiosError(error))
}    
})