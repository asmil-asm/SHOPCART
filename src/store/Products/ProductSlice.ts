import { createSlice } from '@reduxjs/toolkit'
import { ProductAction } from '@store/actions/ProductAction'
import type { Terror } from '@typeCustome/TypeError'
import type {TLoading} from '@typeCustome/TypeLoading'
import type {TProducts} from "@typeCustome/TypeProducts"
import { isString } from '@typeCustome/guard'

interface ProductState {
    records:TProducts[],
    loading: TLoading;
    error:Terror;
}
const initialState:ProductState={  
    records:[],  
loading: 'idle'  ,  
 error: null
}
export const ProductSlice=createSlice({
    name:'products',
initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(ProductAction.pending,(state)=>{
            state.loading='pending';
           state.error=null
            

        })
        builder.addCase(ProductAction.fulfilled,(state,action)=>{
            state.loading='succeed';
            state.records=action.payload;
        })
        builder.addCase(ProductAction.rejected,(state,action)=>{
            state.loading='failed';
            if(isString(action.payload))
            state.error=action.payload
        
        })

        }

})
export default ProductSlice.reducer