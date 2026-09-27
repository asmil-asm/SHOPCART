import { createAsyncThunk} from "@reduxjs/toolkit"
import type { Tfilter } from "@typeCustome/TypeFilter"
import axios from 'axios'
import qs from 'qs'
import axiosError from "@util/axiosError"
export const FilterAction=createAsyncThunk('products/productGETation',async(filters:Tfilter,thunkAPI)=>{
const {rejectWithValue}=thunkAPI
const queryFilters: Record<string, any> = {};
if (filters.category_en ) {
    queryFilters.category_en = { $in: filters.category_en };
    }
   if (filters.rating > 0) {
      queryFilters.rating = { $gte: filters.rating };
    }
   if (filters.Recommended) {
  queryFilters.Recommended = { $eq: true };  
}

if(filters.search?.trim())
{
  const term=filters.search.trim()
  const search={
$or:[
{ title_en: { $containsi: term } },
    { title_ar: { $containsi: term } },
    { category_en: { $containsi: term } },
          { category_ar: { $containsi: term } },  ]
  }
   const otherFilters = { ...queryFilters };
      Object.keys(queryFilters).forEach((k) => delete queryFilters[k]);

      queryFilters.$and = [otherFilters,search];
    }

  



    queryFilters.price = {
      $gte: filters.priceRange.min,
      $lte: filters.priceRange.max,
    };
      
    const queryString=qs.stringify(
        {filters:queryFilters,populate:'*'},
        {encodeValuesOnly:true}
    )
    try {
    const res= await axios.get(`/proudcts?${queryString}`);
    
return res.data.data
} catch (error) {
return rejectWithValue(axiosError(error))}
})