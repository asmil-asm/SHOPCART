import { Link } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Rating,
  Stack,
  IconButton,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAppSelector } from '@store/Hooks';
import { IncartItem } from '@store/Cart/Selector/IncartItem';
import { InFavoriteItem } from '@store/Favorite/Selector/InFavoriteItem';
import useCartActions from '@hooks/useCartActions';
import { useTranslation } from 'react-i18next';
import './ProductItem.css';

interface ProductItemProps {
  cat: any;
}

const ProductItem = ({ cat }: ProductItemProps) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith('ar');
const productId=cat.id
  const isInCart = useAppSelector(IncartItem(cat?.id));
  const isInFavorite = useAppSelector(InFavoriteItem(cat?.id));
  const { handleAddToCart, handleAddToFavorite } = useCartActions();
    if(!cat) return null


  const imageUrl = cat?.image?.[0]?.url || cat?.product?.url;
  const title = isArabic
    ? cat?.title_ar || cat?.title_en || t('product.name')
    : cat?.title_en || cat?.title_ar || t('product.name');

  const price = new Intl.NumberFormat(isArabic ? 'ar-EG' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(cat?.price || 0));

  return (
    <Card
      className="products"
      sx={{
        maxWidth: 400,
        height: '100%',
        padding: '5px',
        position: 'relative',
      }}
    >
      <Link to={`/products/${productId}`}>
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={`http://localhost:1337${imageUrl}`}
        />

        <CardContent sx={{ margin: '5px 0' }}>
          <Typography
            sx={{ color: 'var(--main-color)' }}
            gutterBottom
            variant="h5"
          >
            {price}
          </Typography>

          <Typography
            sx={{
              fontSize: '15px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: 'var(--main-color)',
            }}
            gutterBottom
            variant="h5"
          >
            {title}
          </Typography>

          <Stack spacing={1}>
            <Rating value={cat?.rating || 0} precision={0.5} readOnly />
          </Stack>
        </CardContent>
      </Link>

      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          onClick={() => !isInCart && handleAddToCart(cat)}
          sx={{
            backgroundColor: isInCart
              ? 'var(--main-color-hover)'
              : 'var(--main-color)',
            '&:hover': {
              backgroundColor: 'var(--main-color-hover)',
            },
            color: 'white',
            padding: '3px 10px',
            cursor: isInCart ? 'not-allowed' : 'pointer',
          }}
          size="small"
        >
          {isInCart ? t('product.added') : t('product.addToCart')}
        </Button>

        <IconButton
          sx={{
            color: isInFavorite
              ? 'var(--main-color)'
              : 'var(--main-color-hover)',
          }}
          size="small"
          onClick={() => !isInFavorite && handleAddToFavorite(cat)}
          aria-label={t('product.addToFavorite')}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </CardActions>

      {cat?.discount && (
        <span
          className="discount"
          style={{ position: 'absolute' }}
        >
          {cat.discount}%
        </span>
      )}
    </Card>
  );
};

export default ProductItem;