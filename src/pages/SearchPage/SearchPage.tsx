import { Box , Grid} from "@mui/material"
import { useAppSelector } from "@store/Hooks"
import ProductItem from "@components/ecommerce/ProductItem/ProductItem";
import Loading from "@components/feedback/Loading/Loading";
import Waiting from "@components/feedback/Animation/Waiting";
const SearchPage = () => {
   const {loading,error,products}=useAppSelector(state=>state.filter)
    
  return (
<Box sx={{padding:'10px'}}>
<Grid container spacing={2} sx={{justifyContent:'center'}}>
{ products && products.length>0?(
    products.map(((cat:any)=>{
  return(
    <div key={cat.documentId} className="box">     
     <Loading type="ProductsItem" loading={loading} error={error}>
       <ProductItem cat={cat}
      
/>
 </Loading>
    </div>
   
  )
    }))
):(   <Waiting/>       
)
   
}
</Grid>
   </Box>  )
}

export default SearchPage