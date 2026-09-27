import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import Skeleton from '@mui/material/Skeleton';

const CategoriesSkeleton = () => {
  const skeletons = Array.from({ length: 6 });

  return (
    <section className='categories'>
      <Skeleton variant="text" width={200} height={40} animation="wave" />
      <Skeleton variant="text" width={400} height={20} animation="wave" />
      <Swiper
        modules={[Autoplay, EffectCoverflow]}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }}
        autoplay={{ delay: 3000 }}
        grabCursor={true}
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
        {skeletons.map((_, index) => (
          <SwiperSlide key={index} className='category'>
            <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
            <Skeleton variant="text" width="80%" height={30} animation="wave" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CategoriesSkeleton;