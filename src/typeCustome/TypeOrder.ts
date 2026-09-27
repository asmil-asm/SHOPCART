import type { TorderItem } from "./TypeOrderItem";

export type PaymentMethodType = "card" | "paypal" | "cod";

export type OrderStatus =
  | "delivered"
  | "shipped"
  | "paid"
  | "pending"
  | "cancelled";

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
  email: string;
}

export type Torder = {
  paymentMethod: PaymentMethodType | null;
  state: OrderStatus;
  total: number;
  shippingInfo: ShippingInfo | null;
 orederItem: TorderItem[];
  orderId?: number;
};