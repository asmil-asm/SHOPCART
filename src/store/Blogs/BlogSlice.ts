import { createSlice} from "@reduxjs/toolkit";
import type { TBlogs } from "@typeCustome/TypeBlogs";
import type { Terror } from "@typeCustome/TypeError";
import type { TLoading } from "@typeCustome/TypeLoading";
import { BlogsAction}  from "@store/actions/BlogsAction";
import { isString } from "@typeCustome/guard";
interface blogState{
blogs:TBlogs[],
loading:TLoading,
error:Terror
}
const initialState:blogState={
    blogs:[],
loading: 'idle',  
 error: null
}

const BlogSlice=createSlice({
    name:'blogs',
    initialState,
    reducers:{
        cleanBlogs:(state)=>{
            state.blogs=[]
        }
    },
    extraReducers:(builder)=>{
builder.addCase(BlogsAction.pending,(state)=>{
    state.loading='pending'
    state.error=null
}),
builder.addCase(BlogsAction.fulfilled,(state,action)=>{
        state.loading='succeed'
    state.blogs=action.payload
}),
builder.addCase(BlogsAction.rejected,(state,action)=>{
    state.loading='failed'
            if(isString(action.payload))
        state.error=action.payload
})
    }
})
export const {cleanBlogs}= BlogSlice.actions
export default BlogSlice.reducer