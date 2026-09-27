import { createAsyncThunk } from "@reduxjs/toolkit";
import type { stateLogin } from "@vaildation/validationLogin";
import api from "@services/API/apiUser";
export const LoginAction=createAsyncThunk('login/auth',async(data:stateLogin,thunkAPI)=>{
    try {
        const response=await api.post('/auth/local',{
          identifier: data.email,
        password: data.password
        },
      {
          withCredentials: true,
        })
        return response.data
    } catch (error:any) {
 return thunkAPI.rejectWithValue(
        error.response?.data?.error?.message ||
        "Email or password is incorrect")    }
})
