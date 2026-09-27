import 'swiper/css/pagination';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import type { TProducts } from '@typeCustome/TypeProducts';
import { useTranslation } from 'react-i18next';
import {useAppSelector } from "@store/Hooks";
import ProductItem from '@components/ecommerce/ProductItem/ProductItem';
import Loading from '@components/feedback/Loading/Loading';
import Waiting from '@components/feedback/Animation/Waiting';
import './Slider.css';
interface typeSlider {
  title: string;
  text: string;
  products: TProducts[];
}

const Slider = ({ title, text, products }: typeSlider) => {
const {loading,error}=useAppSelector(state=>state.products)
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  return (
    <Loading type='slider' loading={loading} error={error}>
    <section  className='slider '>
      <h1 className={`${isRTL?'title-rtl':'title-ltr'}`}>{title}</h1>
      <p>{text}</p>
      <Swiper
        modules={[Autoplay, EffectCoverflow]}
          key={i18n.language}
          dir={isRTL ? 'rtl' : 'ltr'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }}
        autoplay={{ delay: 3000 }}
        loop={true}
        pagination={{ clickable: true }}
        spaceBetween={20}
        breakpoints={{
          480: { slidesPerView: 1, spaceBetween: 15 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 25 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
          1280: { slidesPerView: 5, spaceBetween: 35 },
          1536: { slidesPerView: 6, spaceBetween: 40 },
        }}
      >
        {products && products.length > 0 ? (
          products.map((cat: any) => {

            return (
               <SwiperSlide  key={cat.id}>

               <ProductItem 
                  cat={cat} 
                 
                />

              </SwiperSlide>
             
            );
          })
        ) : (
          <Waiting/>
        )}
      </Swiper>
    </section>
    </Loading>
  );
};

export default Slider;