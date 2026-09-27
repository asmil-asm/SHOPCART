import{ createSlice }from '@reduxjs/toolkit';
import { FavoriteAction } from '@store/actions/FavoriteAction';
import { isString } from '@typeCustome/guard';
import type { TFavorite } from '@typeCustome/Tfavorite';

const initialState:TFavorite={
    favorite:[],
    loading:'idle',
    error:null

}
const FavoriteSlice = createSlice({
name: 'favorite',
initialState,
reducers:{
    
 cleanFavoriteItems:(state)=>{
    state.favorite=[]
 }
},
extraReducers:(builder)=>{
    builder.addCase(FavoriteAction.pending,(state)=>{
        state.loading='pending'
        state.error=null
    }),
    builder.addCase(FavoriteAction.fulfilled,(state,action)=>{
        state.loading='succeed',
        state.favorite=action.payload?.wishlist_items
    }),
    builder.addCase(FavoriteAction.rejected,(state,action)=>{
state.loading='failed';
if(isString(action.payload))
    state.error=action.payload
    })
}
})
export const {cleanFavoriteItems}=FavoriteSlice.actions;
export default FavoriteSlice.reducer;