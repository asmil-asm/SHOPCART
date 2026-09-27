import { createSlice } from "@reduxjs/toolkit";
import type {TLoading} from "@typeCustome/TypeLoading"
import type { Terror } from "@typeCustome/TypeError";
import { isString } from "@typeCustome/guard";
import { ContactAction } from "@store/actions/ContactActions";
import { type stateContact } from "@vaildation/vaildationContact";
interface ContactState {
data:stateContact
    loading: TLoading
    error: Terror
}
const initialState:ContactState ={  
   data:{name:'',email:'',message:''}, 
loading: 'idle',  
 error: null
}
const ContactSlice=createSlice({
    name:'contact',
initialState,
reducers:{},
extraReducers:(builder)=>{
        builder.addCase(ContactAction.pending,(state)=>{
            state.loading='pending';
           state.error=null
            

        })
        builder.addCase(ContactAction.fulfilled,(state,action)=>{
            state.loading='succeed';
            state.data=action.payload;
        })
        builder.addCase(ContactAction.rejected,(state,action)=>{
            state.loading='failed';
            if(isString(action.payload))
            state.error=action.payload
        
        })

        }
})
export default ContactSlice.reducer