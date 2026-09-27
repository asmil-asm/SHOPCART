import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@store/Hooks";
import {
  Box,
  Stack,
  Typography,
  Card,
  Rating,
  Button,
  IconButton,
} from "@mui/material";
import { ProductAction } from "@store/actions/ProductAction";
import { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import QtyControl from "@components/ecommerce/QtyControl/QtyControl";
import Slider from "@components/common/Slider/Slider";
import useCartActions from "@hooks/useCartActions";
import { IncartItem } from "@store/Cart/Selector/IncartItem";
import { InFavoriteItem } from "@store/Favorite/Selector/InFavoriteItem";
import { useTranslation } from "react-i18next";
import "./ProductsDetalis.css";

const ProductsDetalis = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");
  const { records } = useAppSelector((state) => state.products);

  const { handleAddToCart, handleAddToFavorite } = useCartActions();
const itemDetalis = records.find(
    (item) => String(item.id) === String(id)
  );
  useEffect(() => {
    dispatch(ProductAction());
  }, [dispatch]);


  

  

  const relatedProducts = records.filter(
    (item) =>
      item.category_en === itemDetalis?.category_en &&
      item.id !== itemDetalis?.id
  );

  const isInFavorite = useAppSelector(InFavoriteItem(itemDetalis?.id));
  const isInCart = useAppSelector(IncartItem(itemDetalis?.id));

  const cartItem = useAppSelector((state) =>
    state.cart.items.find(
      (item) => item.proudct?.id === itemDetalis?.id
    )
  );
 

  const quantity = cartItem?.quantity || 0;

  const [image, setImage] = useState<string | null>(null);

  const activeImage = image ?? itemDetalis?.product?.url;

  const handleImage = (event: string) => {
    setImage(event);
  };

  useEffect(() => {
    setImage(null);
  }, [itemDetalis?.id]);

 if (!itemDetalis) {
    return null;
  }
  const title = isArabic
    ? itemDetalis.title_ar || itemDetalis.title_en
    : itemDetalis.title_en || itemDetalis.title_ar;

  const description = isArabic
    ? itemDetalis.discreption_ar || itemDetalis.discreption_en
    : itemDetalis.discreption_en || itemDetalis.discreption_ar;

  const price = new Intl.NumberFormat(isArabic ? "ar-EG" : "en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(itemDetalis.price || 0));

  return (
    <Box sx={{ margin: "20px" }}>
      <Stack
        className="content-details"
        direction="row"
        spacing={5}
        sx={{ justifyContent: "space-around" }}
      >
        <div className="media">
          <img
            className="main-image"
            style={{ margin: "auto", display: "block" }}
            src={`http://localhost:1337${activeImage || ""}`}
            alt={title}
          />

          <Stack
            direction="row"
            sx={{
              margin: "10px 0",
              gap: "10px",
              justifyContent: "center",
              alignContent: "center",
              overflowX: "auto",
            }}
          >
            {itemDetalis?.image?.map((item: any) => (
              <div
                key={item.id}
                className={`media-content ${
                  activeImage === item.url ? "active" : ""
                }`}
              >
                <img
                  onClick={() => handleImage(item.url)}
                  style={{ cursor: "pointer" }}
                  src={`http://localhost:1337${item.url}`}
                  alt={title}
                />
              </div>
            ))}
          </Stack>
        </div>

        <div>
          <Card
            className="data"
            sx={{
              width: "500px",
              height: "500px",
              background: "transparent",
              boxShadow: "none",
              textAlign: "start",
            }}
          >
            <Typography variant="h4" sx={{ color: "var(--main-color)" }}>
              {title}
            </Typography>

            <Rating
              sx={{ margin: "20px 0" }}
              value={itemDetalis.rating || 0}
              precision={1}
              readOnly
            />

            <div className="price">
              <Typography
                sx={{ color: "var(--second-color)", fontSize: "20px" }}
              >
                {price}
              </Typography>

            
                <Typography sx={{ color: "red", fontSize: "20px" }}>
                  {itemDetalis.discount}%
                </Typography>
              
            </div>

            <Typography sx={{ color: "#777", margin: "10px 0" }}>
              {description}
            </Typography>

            <Box sx={{ margin: "20px 0" }}>
              <Button
                onClick={() =>
                  !isInCart && handleAddToCart(itemDetalis)
                }
                sx={{
                  backgroundColor: isInCart
                    ? "var(--main-color-hover)"
                    : "var(--main-color)",
                  "&:hover": {
                    backgroundColor: "var(--main-color-hover)",
                  },
                  color: "white",
                  padding: "3px 10px",
                }}
                size="small"
              >
                {isInCart ? t("product.added") : t("product.addToCart")}
              </Button>

              <IconButton
                sx={{
                  color: isInFavorite
                    ? "var(--main-color)"
                    : "var(--main-color-hover)",
                }}
                size="small"
                onClick={() =>
                  !isInFavorite && handleAddToFavorite(itemDetalis)
                }
                aria-label={t("product.addToFavorite")}
              >
                <FavoriteBorderIcon />
              </IconButton>
            </Box>

            {isInCart && cartItem && (
              <QtyControl
                quantityNum={quantity}
                id={cartItem.documentId}
              />
            )}
          </Card>
        </div>
      </Stack>

      <hr className="line" />

      {relatedProducts.length > 0 && (
        <Slider
          title={t("product.relatedProducts")}
          text=""
          products={relatedProducts}
        />
      )}
    </Box>
  );
};

export default ProductsDetalis;