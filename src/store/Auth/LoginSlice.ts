import { createSlice } from "@reduxjs/toolkit";
import type { Terror } from "@typeCustome/TypeError";
import type { TLoading } from "@typeCustome/TypeLoading";
import { isString } from "@typeCustome/guard";
import { LoginAction } from "@store/actions/LoginAction";
type LoginState={
    user:any,
    loading:TLoading,
    error:Terror,
    token: string | null,
    lastActivity:number
}
const initialState:LoginState={
    user:null,
    loading:'idle',
    error:null,
    token:null,
    lastActivity: Date.now()
}
const LoginSlice=createSlice({
    name:'login',
    initialState,
    reducers:{logout:(state)=>{
        state.user=null,
        state.token=null,
        state.lastActivity=0
     
    },
     updateActivity: (state) => {
      state.lastActivity = Date.now();
    },
},
    extraReducers:(builder)=>{
        builder.addCase(LoginAction.pending,(state)=>{
            state.loading='pending'
            state.error=null

        }),
        builder.addCase(LoginAction.fulfilled,(state,action)=>{
            state.loading='succeed'
            state.user=action.payload.user,
            state.token=action.payload.jwt,
            state.lastActivity = Date.now()
        }),
        builder.addCase(LoginAction.rejected,(state,action)=>{
            state.loading='failed'
            if(isString(action.payload))
                state.error=action.payload
        })
    }
})
export const {logout,updateActivity}=LoginSlice.actions
export default LoginSlice.reducer