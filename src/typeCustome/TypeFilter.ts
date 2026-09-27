export type Tfilter={
   category_en:string[],
   category_ar:string[],
    rating:number,
    Recommended:boolean,
    priceRange: {
    min: number;
    max: number;
  },
    search: string;
}