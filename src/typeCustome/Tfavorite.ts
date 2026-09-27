import type { TProducts } from "@typeCustome/TypeProducts";

export type TFavoriteItem = {
  id: number;
  documentId: string;
  proudct: TProducts;
};

export type TFavorite = {
  favorite: TFavoriteItem[];
  loading: "idle" | "pending" | "succeed" | "failed";

  error: string | null;
};