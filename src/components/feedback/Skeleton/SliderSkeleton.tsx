import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const SliderSkeleton = () => {
  const skeletons = Array.from({ length: 6 });

  return (
    <section className='slider'>
      <Skeleton variant="text" width={200} height={40} animation="wave" />
      <Skeleton variant="text" width={400} height={20} animation="wave" />
      
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
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
          <SwiperSlide key={index} className='products'>
            <Card sx={{ maxWidth: 400, height: '100%', padding: '5px', position: 'relative' }}>
              <Skeleton variant="rectangular" height={140} animation="wave" />
              
              <CardContent sx={{ margin: '5px 0' }}>
                <Skeleton variant="text" width={80} height={40} animation="wave" />
                <Skeleton variant="text" width="100%" height={30} animation="wave" />
                <Stack spacing={1}>
                  <Skeleton variant="text" width={120} height={24} animation="wave" />
                </Stack>
              </CardContent>
              
              <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton variant="rectangular" width={100} height={36} animation="wave" />
                <Skeleton variant="circular" width={40} height={40} animation="wave" />
              </CardActions>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SliderSkeleton;