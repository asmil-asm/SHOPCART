import type { TProducts } from "@typeCustome/TypeProducts";

export type TCartItem = {
  id: number;
  documentId: string;
  quantity: number;

  proudct: TProducts;
};

export type TCart = {
  items: TCartItem[];

  loading: "idle" | "pending" | "succeed" | "failed";

  error: string | null;
};