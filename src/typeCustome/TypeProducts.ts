export type TProducts = {
  id?: number;
  documentId?: string | number;

  title_ar: string;
  title_en: string;

  price: number;
  sale?: number;
  rating: number;

  discreption_en: string;
  discreption_ar: string;

  slug: string;

  discount?: number;
  Recommended: boolean;
  time?: any;

  category_en: string;
  category_ar: string;

  image: any[];
  product: any;
};