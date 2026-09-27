import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@services/API/apiUser";
import type { TorderItem } from "@typeCustome/TypeOrderItem";
import type { RootState } from "@store/store";
interface StrapiCreateResponse<T> {
  data: T & { id: number };
}
 


 
interface OrderResult {
  id: number;
  total: number;
  items: TorderItem[];
}
 
export const orderAction = createAsyncThunk<
  OrderResult,
  void, 
  { state: RootState; rejectValue: string }
>("order/postOrder", async (_, { getState, rejectWithValue }) => {
  const { order, cart } = getState();
 
  const shippingInfo = order.order.shippingInfo;
  const paymentMethod = order.order.paymentMethod;
 const cartItems = cart.items 
 if (!shippingInfo) {
   
    return rejectWithValue("من فضلك أكمل بيانات الشحن أولاً");
  }
  if (!paymentMethod) {
    return rejectWithValue("من فضلك اختر طريقة الدفع");
  }
  if (!cartItems || cartItems.length === 0) {
    return rejectWithValue("السلة فارغة");
  }
 
  try {
    const shippingRes = await api.post<StrapiCreateResponse<typeof shippingInfo>>(
      "/shipping-infos",
      { data: shippingInfo }
    );
    const shippingInfoId = shippingRes.data.data.id;
 
    const total = cartItems.reduce(
      (sum, item) => sum + item.proudct.price * item.quantity,
      0
    );
 
    const orderRes = await api.post<StrapiCreateResponse<Record<string, unknown>>>(
      "/orders",
      {
        data: {
          paymentMethod,
          state: "pending",
          total,
          shipping_info: shippingInfoId,
        },
      }
    );
    const orderId = orderRes.data.data.id;
 
    const createdItems: TorderItem[] = await Promise.all(
      cartItems.map(async (item) => {
        const payload:TorderItem = {
         productID: item.proudct.documentId,
          name: item.proudct.title_en,
          price: item.proudct.price,
          image:item.proudct.product,
          quantity: item.quantity,
        };
 
        await api.post("/order-items", {
          data: { ...payload, order: orderId },
        });
 
        return payload;
      })
    );
 
    return { id: orderId, total, items: createdItems };
  } catch (error: any) {
    const message =
      error?.response?.data?.error?.message ??
      "حدث خطأ أثناء إرسال الطلب، حاول تاني";
    return rejectWithValue(message);
  }
});
 