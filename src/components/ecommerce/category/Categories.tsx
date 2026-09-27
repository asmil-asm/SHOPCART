import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/Hooks';
import { CategoryAction } from '@store/actions/CategoryAction';
import Loading from '@components/feedback/Loading/Loading';
import useFilter from '@hooks/useFilter';
import { useTranslation } from 'react-i18next';
import './Categories.css';

const Categories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.category);
  const { handleCategories } = useFilter();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language.startsWith('ar');
  const isRTL = i18n.dir() === 'rtl';

  useEffect(() => {
    if (!records.length) {
      dispatch(CategoryAction());
    }
  }, [dispatch, records.length]);

  const getCategoryLabel = (cat: any) =>
    isArabic
      ? cat?.title_ar || cat?.category_ar || cat?.title_en || cat?.category_en
      : cat?.title_en || cat?.category_en || cat?.title_ar || cat?.category_ar;

  const getCategoryValue = (cat: any) =>
    cat?.category_en || cat?.title_en || cat?.slug;

  const handleCategory = (catValue: string) => {
    handleCategories([catValue]);
    navigate('/products');
  };

  return (
    <Loading type="categories" loading={loading} error={error}>
      <section className="categories">
        <h1>{t('categories.title')}</h1>
        <p>{t('categories.subtitle')}</p>

        <Swiper
          key={i18n.language}
          dir={isRTL ? 'rtl' : 'ltr'}
          modules={[Autoplay, EffectCoverflow, Pagination]}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 50,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          pagination={{ clickable: true }}
          spaceBetween={15}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            480: { slidesPerView: 2, spaceBetween: 15 },
            640: { slidesPerView: 3, spaceBetween: 15 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
            1280: { slidesPerView: 5, spaceBetween: 25 },
          }}
        >
          {records && records.length > 0 ? (
            records.map((cat: any) => {
              const label = getCategoryLabel(cat);
              const value = getCategoryValue(cat);

              return (
                <SwiperSlide key={cat?.id || cat?.documentId} className="category">
                  <div
                    onClick={() => handleCategory(value)}
                    className="category-card"
                  >
                    <div className="image-wrapper">
                      <img
                        src={`http://localhost:1337${cat?.category?.url}`}
                        alt={label || 'category'}
                      />
                    </div>
                    <p>{label}</p>
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <div className="no-products">{t('categories.empty')}</div>
          )}
        </Swiper>
      </section>
    </Loading>
  );
};

export default Categories;