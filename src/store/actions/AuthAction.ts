import { createAsyncThunk } from "@reduxjs/toolkit";
import type { stateForm } from "@vaildation/validationRegister";
import api from "@services/API/apiUser";
 export const AuthAction=createAsyncThunk('register/auth',async(data:stateForm,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
try {
    const response=await api.post('/auth/local/register',{
    username:data.email,
   email: data.email,
  password: data.password,
 
},
{
          withCredentials: true,
        }
)
return response.data
} catch (error:any) {
 

  rejectWithValue(error)}
 })