import { useAppSelector } from "@store/Hooks"
import { Box , Grid } from "@mui/material"
import ProductItem from "../ProductItem/ProductItem"
import './ProductsComponenets.css'
const ProductsComponenets= () => {
    const {records}=useAppSelector(state=>state.products)

  return (
     <Box sx={{padding:'10px'}}>
   <Grid container spacing={2} sx={{justifyContent:'center'}}>
   { records && records.length>0?(
       records.map((cat=>{
           return( 
          <Box  className='products'>
         <ProductItem cat={cat}/>
          </Box>
       )
       }))
   ):(          <div>Emmpty</div>
   )
      
   }
   </Grid>
      </Box>
    
  )
}

export default ProductsComponenets