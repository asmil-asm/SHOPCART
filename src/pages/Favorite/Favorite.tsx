import { Box , Grid} from "@mui/material"
import { useAppSelector } from "@store/Hooks"
import './Favorite.css'
import useCartActions from "@hooks/useCartActions";
import HeartEmpty from "@components/feedback/Animation/HeartEmpty";
import ProductItem from "@components/ecommerce/ProductItem/ProductItem";
import Loading from "@components/feedback/Loading/Loading";
import PageTransition from "@components/feedback/Animation/PageTransition";
const Favorite = () => {
    const {favorite,loading,error}=useAppSelector(state=>state.favorite)
    
   const {handleRemoveFromFavorite}=useCartActions()
   
  return (
    <PageTransition>
   <Box sx={{padding:'10px'}}>
<Grid container spacing={2} sx={{justifyContent:'center'}}>
{ favorite && favorite.length>0?(
    favorite.map(((cat:any)=>{
  return(
    <div key={cat.documentId} className="box">     
     <span onClick={()=>handleRemoveFromFavorite(cat.documentId)} className="close">X</span>
     <Loading type="ProductsItem" loading={loading} error={error}>
       <ProductItem cat={cat.proudct}
      
/>
 </Loading>
    </div>
   
  )
    }))
):(          < HeartEmpty />
)
   
}
</Grid>
   </Box>
   </PageTransition>
  )
}

export default Favorite