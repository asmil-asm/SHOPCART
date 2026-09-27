import { createSlice } from '@reduxjs/toolkit'
import { TopBrandAction } from '@store/actions/TopBrandActions';
import type { TLoading } from '@typeCustome/TypeLoading';
import { isString } from '@typeCustome/guard';
interface ProductState {
    records:{brand:any}[]
    loading: TLoading
    error: string | null;
}
const initialState:ProductState={  
    records:[],       
loading: 'idle'  ,  
 error: null
}
export const TopBrandSlice=createSlice({
    name:'TopBrnad',
initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(TopBrandAction.pending,(state)=>{
            state.loading='pending';
           state.error=null
            

        })
        builder.addCase(TopBrandAction.fulfilled,(state,action)=>{
            state.loading='succeed';
            state.records=action.payload;
        })
        builder.addCase(TopBrandAction.rejected,(state,action)=>{
            state.loading='failed';
            if(isString(action.payload))

            state.error=action.payload
        
        })

        }

})
export default TopBrandSlice.reducer