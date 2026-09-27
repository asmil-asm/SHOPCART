import {
  Box,
  Button,
  Stack,
  Typography,
  FormControlLabel,
  FormGroup,
  Checkbox,
  TextField,
  Slider,
  FormControl,
  RadioGroup,
  Radio,
  Rating,
  Switch,
  Drawer,
  IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import type { TCategories } from '@typeCustome/TypeCategories';
import { useTranslation } from 'react-i18next';
import './Filter.css';
import useFilter from '@hooks/useFilter';
import { useAppSelector } from '@store/Hooks';
interface StateFilter {
  open: boolean;
  onClose: () => void;
  categories: TCategories[];
  price: [number, number];
  rating: number[];
}

export default function FilterMobile({ open, onClose, categories, price, rating }: StateFilter) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith('ar');
    const { handleBestSale, handleCategories, handleRating, handleReset, handlePrice } = useFilter();
  
  const { filter } = useAppSelector((state) => state.filter);

  const getCategoryLabel = (cat: any) =>
    isArabic
      ? cat.title_ar || cat.category_ar || cat.title_en || cat.category_en
      : cat.title_en || cat.category_en || cat.title_ar || cat.category_ar;

  const getCategoryValue = (cat: any) =>
    cat.category_en || cat.title_en || cat.slug;
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        backgroundColor: '#1e1e2d',
        color: '#ffffff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: '85vh',
      }}
      className="filter-mobile"
    >
      <Stack spacing={2.5} sx={{ padding: '20px' }}>
        {/* Header */}
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {t('filter.title')}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button
                        onClick={handleReset}

              size="small"
              startIcon={<RestartAltIcon fontSize="small" />}
              className="clear-btn"
            >
              {t('filter.reset')}
            </Button>
            <IconButton onClick={onClose} sx={{ color: 'var(--second-color)' }}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Divider className="filter-divider" />

        {/* Categories Section */}
        <Box >
          <Typography variant="subtitle2" sx={{ marginBottom: '5px', fontWeight: 600 ,color:"var(--second-color)"}}>
            {t('filter.category')}
          </Typography>
          <FormGroup sx={{ gap: 0.5, maxHeight: 150, overflowY: 'auto'  }}>
            {categories.map((cat: any) => {
               const categoryValue = getCategoryValue(cat);
              const categoryLabel = getCategoryLabel(cat);

              const selected = Array.isArray(filter.category_en)
                ? filter.category_en
                : filter.category_en
                ? [filter.category_en]
                : [];

              const isChecked = selected.includes(categoryValue);

              const handleToggle = () => {
                const newValues = isChecked
                  ? selected.filter((v) => v !== categoryValue)
                  : [...selected, categoryValue];

                handleCategories(newValues);
              };
            
            return(

              <FormControlLabel  
                key={cat.id}
                className="filter-form-label"
                control={<Checkbox onChange={handleToggle}
                      checked={Boolean(categoryValue) && isChecked} size="small" className="custom-checkbox"  sx={{color:"var(--main-color)"}}/>}
                label={<Typography sx={{color:"var(--main-color)"}} variant="body2">{categoryLabel}</Typography>}
              />
            )})}
          </FormGroup>
        </Box>

        <Divider className="filter-divider" />

        {/* Price Section */}
        <Box>
          <Typography variant="subtitle2" sx={{ marginBottom: '5px', fontWeight: 600 }}>
            {t('filter.priceRange')}
          </Typography>
          <Slider
            size="small"
            disableSwap
            min={price[0]}
            max={price[1]}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => `$${v}`}
             value={[filter.priceRange.min, filter.priceRange.max]}
              onChange={(_e, newValue) => {
                const [min, max] = newValue as number[];
                handlePrice({ min, max });
              }}
            className="price-slider"
          />
          <Stack direction="row" spacing={1.5} sx={{ marginTop: '5px' }}>
            <TextField
             value={filter.priceRange.min}
                onChange={(e) => handlePrice({ ...filter.priceRange, min: Number(e.target.value) })}
              size="small"
              label={t('filter.min')}
              type="number"
              fullWidth
              className="dark-input"
            />
            <TextField
            value={filter.priceRange.max}
                onChange={(e) => handlePrice({ ...filter.priceRange, max: Number(e.target.value) })}
              size="small"
              label={t('filter.max')}
              type="number"
              fullWidth
              className="dark-input"
            />
          </Stack>
        </Box>

        <Divider className="filter-divider" />

        {/* Ratings Section */}
        <Box>
          <Typography variant="subtitle2" sx={{ marginBottom: '5px', fontWeight: 600 }}>
            {t('filter.customerRatings')}
          </Typography>
          <FormControl fullWidth>
            <RadioGroup value={filter.rating}
              onChange={(event) => handleRating(Number(event.target.value))}>
              <FormControlLabel
                value={0}
                control={<Radio size="small" className="custom-radio" />}
                className="filter-form-label"
                label={<Typography variant="body2">{t('filter.allEvaluations')}</Typography>}
              />
              {rating.map((r) => (
                <FormControlLabel
                  key={r}
                  value={r}
                  className="filter-form-label"
                  control={<Radio size="small" className="custom-radio" />}
                  label={
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Rating
                        value={r}
                        readOnly
                        size="small"
                        emptyIcon={<StarBorderIcon fontSize="inherit" className="star-empty" />}
                        className="rating-stars"
                      />
                      <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                        {t('filter.andAbove')}
                      </Typography>
                    </Stack>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

        <Divider className="filter-divider" />

        {/* Offers Section */}
        <FormControlLabel
          className="filter-form-label-switch"
          control={<Switch  checked={filter.Recommended}
                onChange={(event) => handleBestSale(event.target.checked)} size="small" className="custom-switch" />}
          label={
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {t('filter.bestSellersOnly')}
              </Typography>
              <Typography variant="caption" color="rgba(255, 255, 255, 0.5)">
                {t('filter.bestSellersHint')}
              </Typography>
            </Box>
          }
        />

        <Button
          variant="contained"
          fullWidth
          onClick={onClose}
          sx={{
            mt: 2,
            backgroundColor: 'var(--main-color)',
            color: 'white',
            fontWeight: 700,
            '&:hover': { backgroundColor: 'var(--second-color)' },
          }}
        >
          {t('filter.applyFilters')}
        </Button>
      </Stack>
    </Drawer>
  );
}