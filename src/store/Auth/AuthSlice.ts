import { createSlice } from "@reduxjs/toolkit";
import type { Terror } from "@typeCustome/TypeError";
import type { TLoading } from "@typeCustome/TypeLoading";
import { AuthAction } from "@store/actions/AuthAction";
import { isString } from "@typeCustome/guard";
type AuthState={
    user:any,
    loading:TLoading,
    error:Terror,
    token: string | null
}
const initialState:AuthState={
    user:null,
    loading:'idle',
    error:null,
    token:null
}
const AuthSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(AuthAction.pending,(state)=>{
            state.loading='pending'
            state.error=null
        }),
        builder.addCase(AuthAction.fulfilled,(state,action)=>{
            state.loading='succeed'
         state.user = action.payload.user; 
      state.token = action.payload.jwt; 
        }),
        builder.addCase(AuthAction.rejected,(state,action)=>{
            state.loading='failed'
            if(isString(action.payload))
                state.error=action.payload
        })
    }
})
export default AuthSlice.reducer