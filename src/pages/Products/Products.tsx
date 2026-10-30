import Filter from "@components/common/Filter/Filter";
import { Box, Stack, Pagination } from "@mui/material";
import { useAppSelector} from "@store/Hooks";
import ProductItem from "@components/ecommerce/ProductItem/ProductItem";
import Waiting from "@components/feedback/Animation/Waiting";
import { useMemo, useState,useEffect} from "react";
import useFilter from "@hooks/useFilter";
import "./Products.css";

const ITEMS_PER_PAGE = 15;

const Products = () => {
  const { products,filter} = useAppSelector((state) => state.filter);
  const [page, setPage] = useState(1);
  const {handleReset}=useFilter()
   console.log(products)
        console.log(filter)
  useEffect(()=>{
return(()=>{
handleReset()

})
  },[handleReset])
  const handlePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const currentPage = useMemo(() => {
    if (!products) return [];
    const startPage = (page - 1) * ITEMS_PER_PAGE;
    return products.slice(startPage, startPage + ITEMS_PER_PAGE);
  }, [products, page]);

  const pageCount = useMemo(() => {
    if (!products || products.length === 0) return 0;
    return Math.ceil(products.length / ITEMS_PER_PAGE);
  }, [products]);

  return (
    <Box className="products-wrapper">
      <Stack direction="row" className="products-layout" spacing={1}>
        <Filter />

        <Box className="products-content">
          <Box className="products-grid">
            {products && products.length > 0 ? (
              currentPage.map((cat) => (
                
                <Box key={cat.id} className="products-item">
                  <ProductItem cat={cat} />
                </Box>
              ))
            ) : (

              <Waiting />
            )}
          </Box>
        </Box>
      </Stack>

      {pageCount > 0 && (
        <Box className="pagination-wrapper">
          <Pagination
            page={page}
            count={pageCount}
            onChange={handlePage}
            shape="rounded"
            color="standard"
            siblingCount={1}
            boundaryCount={1}
            showFirstButton
            showLastButton
            className="products-pagination"
          />
        </Box>
      )}
    </Box>
  );
};

export default Products;