import { useAppDispatch,useAppSelector} from "@store/Hooks"
import { setCategories,setBestSale,setRating,resetFilter,setPrice,setSearch } from "@store/Filter/FilterSlice"
import { useEffect,useState,useCallback  } from "react"
import { FilterAction } from "@store/actions/FilterAction"
import { useNavigate } from "react-router-dom"
const useFilter = () => {
      const { filter} = useAppSelector((state) => state.filter);
      const [term,setTerm]=useState('')
    const dispatch=useAppDispatch()
    const navigate=useNavigate()
   useEffect(() => {
  const timer = setTimeout(() => {
    dispatch(FilterAction(filter));
  }, 300);
  return () => clearTimeout(timer);
}, [dispatch, filter]);
 useEffect(() => {
    const timer = setTimeout(() => {
      const value = term.trim();
      if (!value) return;
      if (filter.search === value) return;

      dispatch(setSearch(value));

      if (!location.pathname.startsWith("/search")) {
        navigate(`/search?q=${encodeURIComponent(value)}`);
      }1
    }, 400);

    return () => {clearTimeout(timer)};
  }, [term, filter.search, dispatch, navigate, location.pathname]);

const handleSearch=useCallback((data:string)=>{
setTerm(data)
},[])
  const handleCategories=useCallback((slug: string[])=>{
dispatch(setCategories(slug))
dispatch(FilterAction({ 
    ...filter, 
    category_en: slug 
  }))  },[dispatch])
    const handleRating=useCallback((data:number)=>{
dispatch(setRating(data))
  },[dispatch])
    const handleBestSale=useCallback((data:boolean)=>{
dispatch(setBestSale(data))
  },[dispatch])
     const handlePrice=useCallback((data:unknown)=>{
dispatch(setPrice(data))
  },[dispatch])
    const handleReset=useCallback(()=>{
dispatch(resetFilter())
  },[dispatch])
  return {handleBestSale,handleCategories,handleRating,handleReset,handlePrice,handleSearch,term}
  
}

export default useFilter