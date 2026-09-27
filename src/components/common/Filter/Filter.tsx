import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Rating,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
  Fab,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useAppSelector } from '@store/Hooks';
import { useState } from 'react';
import FilterMobile from './FilterMobile';
import './Filter.css';
import useFilter from '@hooks/useFilter';
import { useTranslation } from 'react-i18next';

export default function Filter() {
  const [show, setShow] = useState(false);
  const PRICE_BOUNDS: [number, number] = [0, 10000];
  const CATEGORIES = useAppSelector((state) => state.category.records);
  const RATING_OPTIONS = [4, 3, 2, 1];
  const { handleBestSale, handleCategories, handleRating, handleReset, handlePrice } = useFilter();
  const { filter } = useAppSelector((state) => state.filter);
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language.startsWith('ar');

  const getCategoryLabel = (cat: any) =>
    isArabic
      ? cat.title_ar || cat.category_ar || cat.title_en || cat.category_en
      : cat.title_en || cat.category_en || cat.title_ar || cat.category_ar;

  const getCategoryValue = (cat: any) =>
    cat.category_en || cat.title_en || cat.slug;

  const selectedCategories = Array.isArray(filter.category_en)
    ? filter.category_en
    : filter.category_en
    ? [filter.category_en]
    : [];

  const isAllSelected = selectedCategories.length === 0;

  const handleAll = () => {
    handleCategories([]);
  };

  return (
    <>
      <Box className="filter-sidebar">
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Box className="filter-header-title">
            <FilterAltOutlinedIcon className="filter-icon" />
            <Typography variant="h6" className="filter-title">
              {t('filter.title')}
            </Typography>
          </Box>
          <Button
            onClick={handleReset}
            size="small"
            startIcon={<RestartAltIcon fontSize="small" />}
            className="clear-btn"
          >
            {t('filter.reset')}
          </Button>
        </Stack>

        <Divider className="filter-divider" />

        <FilterSection title={t('filter.category')} defaultExpanded>
          <FormGroup sx={{ gap: 0.5 }}>
            <FormControlLabel
              className="filter-form-label"
              control={
                <Checkbox
                  onChange={handleAll}
                  checked={isAllSelected}
                  size="small"
                  className="custom-checkbox"
                />
              }
              label={<Typography>{t('filter.allCategories')}</Typography>}
            />

            {CATEGORIES?.map((cat: any) => {
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

              return (
                <FormControlLabel
                  key={cat.id || cat.documentId}
                  className="filter-form-label"
                  control={
                    <Checkbox
                      onChange={handleToggle}
                      checked={Boolean(categoryValue) && isChecked}
                      size="small"
                      className="custom-checkbox"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      {categoryLabel}
                    </Typography>
                  }
                />
              );
            })}
          </FormGroup>
        </FilterSection>

        <FilterSection title={t('filter.price')}>
          <Box sx={{ px: 1, pt: 1 }}>
            <Slider
              size="small"
              disableSwap
              min={PRICE_BOUNDS[0]}
              max={PRICE_BOUNDS[1]}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `$${v}`}
              className="price-slider"
              value={[filter.priceRange.min, filter.priceRange.max]}
              onChange={(_e, newValue) => {
                const [min, max] = newValue as number[];
                handlePrice({ min, max });
              }}
            />
            <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
              <TextField
                value={filter.priceRange.min}
                onChange={(e) => handlePrice({ ...filter.priceRange, min: Number(e.target.value) })}
                size="small"
                label={t('filter.minimum')}
                type="number"
                fullWidth
                className="dark-input"
              />
              <TextField
                value={filter.priceRange.max}
                onChange={(e) => handlePrice({ ...filter.priceRange, max: Number(e.target.value) })}
                size="small"
                label={t('filter.maximum')}
                type="number"
                fullWidth
                className="dark-input"
              />
            </Stack>
          </Box>
        </FilterSection>

        <FilterSection title={t('filter.customerRatings')}>
          <FormControl fullWidth>
            <RadioGroup
              value={filter.rating}
              onChange={(event) => handleRating(Number(event.target.value))}
            >
              <FormControlLabel
                value={0}
                control={<Radio size="small" className="custom-radio" />}
                className="filter-form-label"
                label={<Typography variant="body2">{t('filter.allEvaluations')}</Typography>}
              />
              {RATING_OPTIONS.map((r) => (
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
        </FilterSection>

        <FilterSection title={t('filter.offers')} defaultExpanded>
          <FormControlLabel
            className="filter-form-label-switch"
            control={
              <Switch
                checked={filter.Recommended}
                onChange={(event) => handleBestSale(event.target.checked)}
                size="small"
                className="custom-switch"
              />
            }
            label={
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {t('filter.recommended')}
                </Typography>
                <Typography variant="caption" color="rgba(255, 255, 255, 0.5)">
                  {t('filter.recommendedHint')}
                </Typography>
              </Box>
            }
          />
        </FilterSection>
      </Box>

      <Fab
        variant="extended"
        onClick={() => setShow(true)}
        className="list-filter-btn"
        sx={{
          display: 'none',
          '@media (max-width: 700px)': {
            display: 'inline-flex',
          },
        }}
      >
        <FilterListIcon sx={{ mr: 1 }} />
        {t('filter.button')}
      </Fab>

      <FilterMobile
        open={show}
        onClose={() => setShow(false)}
        categories={CATEGORIES}
        price={PRICE_BOUNDS}
        rating={RATING_OPTIONS}
      />
    </>
  );
}

function FilterSection({
  title,
  children,
  defaultExpanded = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) {
  return (
    <Accordion
      disableGutters
      elevation={0}
      defaultExpanded={defaultExpanded}
      className="filter-accordion"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon fontSize="small" className="expand-icon" />}
        className="filter-accordion-summary"
      >
        <Typography variant="subtitle2" className="accordion-title">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: '0 0 16px 0' }}>{children}</AccordionDetails>
    </Accordion>
  );
}