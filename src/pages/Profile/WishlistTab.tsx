import { Box } from "@mui/material";
import { useAppSelector } from "@store/Hooks";
import HeartEmpty from "@components/feedback/Animation/HeartEmpty";
import ProductItem from "@components/ecommerce/ProductItem/ProductItem";

export function WishlistTab() {
  const { favorite } = useAppSelector((state) => state.favorite);
if(!favorite) return [];
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 2,
      }}
    >
      {favorite && favorite.length > 0 ? (
        favorite.map((cat: any) => (
          <div className="box" key={cat.id}>
            
              <ProductItem cat={cat.proudct}/>
          </div>
        ))
      ) : (
        <HeartEmpty />
      )}
    </Box>
  );
}