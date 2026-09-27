import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "@typeCustome/TypeLoading";
import type { Terror } from "@typeCustome/TypeError";
import type { Torder } from "@typeCustome/TypeOrder";
import { orderAction } from "@store/actions/orderAction";
import { isString } from "@typeCustome/guard";
interface stateOrder{
    order:Torder,
    loading:TLoading,
    error:Terror
}

const initialState:stateOrder={
  order: {
     paymentMethod: 'card',
    state: "pending",
    total: 0,
    shippingInfo: null,
orederItem: [],
  },    
  loading:'idle',
    error:null

}
const orderSlice=createSlice({
    name:'order',
    initialState,
    reducers:{
        setOrderInfo:(state,action)=>{
            state.order.shippingInfo=action.payload
        },
        setOrderPaymentMethod:(state,action)=>{
state.order.paymentMethod=action.payload
        },
        reseteOrder:(state)=>{
            state.order=initialState.order
            state.loading='idle',
            state.error=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(orderAction.pending,(state)=>{
            state.loading='pending',
            state.error=null
        }),
        builder.addCase(orderAction.fulfilled,(state,action)=>{
            state.loading='succeed',
        state.order.orederItem = action.payload.items;
        state.order.total=action.payload.total
        state.order.orderId= action.payload.id;

        }),
        builder.addCase(orderAction.rejected,(state,action)=>{
state.loading='failed'
if(isString(action.payload))
            state.error=action.payload
        })
    }
    
})
export const {setOrderInfo,setOrderPaymentMethod,reseteOrder}=orderSlice.actions
export default orderSlice.reducer