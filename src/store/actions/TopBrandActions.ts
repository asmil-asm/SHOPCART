import { createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
import axiosError from "@util/axiosError"
export const TopBrandAction=createAsyncThunk('TopBrand/TopBrandGETation',async(_,thunkAPI)=>{
const {rejectWithValue}=thunkAPI
    try {
    const res= await axios.get('/top-brands?populate=*');    
return res.data.data
} catch (error) {
return rejectWithValue(axiosError(error))}
})