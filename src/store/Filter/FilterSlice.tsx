import { createSlice } from "@reduxjs/toolkit";
import type { TProducts } from "@typeCustome/TypeProducts";
import type { Tfilter } from "@typeCustome/TypeFilter";
import type { TLoading } from "@typeCustome/TypeLoading";
import type { Terror } from "@typeCustome/TypeError";
import { FilterAction } from "@store/actions/FilterAction";
import { isString } from "@typeCustome/guard";
interface filterState{
    products:TProducts[],
    filter:Tfilter,
    loading:TLoading,
    error:Terror
}
const initialState:filterState={
    products:[],
    filter:{category_en:[],category_ar:[],rating:0,Recommended:false,priceRange:{min:0,max:10000},search: ""}, 
loading: 'idle'  ,  
 error: null
}
const FilterSlice=createSlice({
    name:'filter',
    initialState,
    reducers:{
        setCategories:(state,action)=>{
state.filter.category_en = action.payload;

        },
        setRating:(state,action)=>{
        state.filter.rating=action.payload
        },
        setBestSale:(state,action)=>{
            state.filter.Recommended=action.payload
        },
        setPrice:(state,action)=>{
state.filter.priceRange=action.payload
        },
        setSearch:(state,action)=>{
state.filter.search=action.payload
        },
        resetFilter:(state)=>{
            state.filter={category_en:[],category_ar:[],rating:0,Recommended:false,priceRange:{min:0,max:10000},search:''}
        },
          clearSearch: (state) => {
  state.filter.search = "";
  state.products = [];
  state.loading = 'idle';
  state.error = null;
},
    },
    extraReducers:(builder)=>{
builder.addCase(FilterAction.pending,(state)=>{
    state.loading='pending',
    state.error=null
}),
builder.addCase(FilterAction.fulfilled,(state,action)=>{
    state.loading='succeed'
    state.products=action.payload
}),
builder.addCase(FilterAction.rejected,(state,action)=>{
    state.loading='failed'
    if(isString(action.payload))
            state.error=action.payload
})
    }


})
export const {setCategories,setRating,setBestSale,resetFilter,setPrice,setSearch,clearSearch}=FilterSlice.actions
export default FilterSlice.reducer