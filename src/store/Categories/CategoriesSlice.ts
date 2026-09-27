import { createSlice } from "@reduxjs/toolkit";
import { CategoryAction } from "@store/actions/CategoryAction";
import type {TCategories} from "@typeCustome/TypeCategories"
import type {TLoading} from "@typeCustome/TypeLoading"
import type { Terror } from "@typeCustome/TypeError";
import { isString } from "@typeCustome/guard";
interface CategoriesState {
    records: TCategories[];
    loading: TLoading
    error: Terror
}
const initialState:CategoriesState ={  
    records:[],       
loading: 'idle',  
 error: null
}
const CategorySlice=createSlice({
    name:'category',
initialState,
reducers:{},
extraReducers:(builder)=>{
        builder.addCase(CategoryAction.pending,(state)=>{
            state.loading='pending';
           state.error=null
            

        })
        builder.addCase(CategoryAction.fulfilled,(state,action)=>{
            state.loading='succeed';
            state.records=action.payload;
        })
        builder.addCase(CategoryAction.rejected,(state,action)=>{
            state.loading='failed';
            if(isString(action.payload))
            state.error=action.payload
        
        })

        }
})
export default CategorySlice.reducer