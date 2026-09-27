import { createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
import axiosError from "@util/axiosError"
export const ProductAction=createAsyncThunk('products/productGETation',async(_,thunkAPI)=>{
const {rejectWithValue}=thunkAPI
    try {
    const res= await axios.get('/proudcts?populate=*');
    
return res.data.data
} catch (error) {
return rejectWithValue(axiosError(error))}
})