import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { type stateContact } from "@vaildation/vaildationContact";
 export const ContactAction=createAsyncThunk('contact/send',async(data:stateContact,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
try {
    const response=await axios.post('/contacts',{
 data:{
    name:data.name,
 email:data.email,
 message:data.message
 }
 
})
return response.data
} catch (error:any) {
return rejectWithValue(
        error.response?.data?.error?.message || error.message ||  "occurred"
      )  

  }
 })