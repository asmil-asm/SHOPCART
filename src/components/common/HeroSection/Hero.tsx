import banner1 from '@assets/Hero/Banner-1.jpg';
import banner2 from '@assets/Hero/Banner-2.jpg';
import banner3 from '@assets/Hero/Banner-3.jpg';
import banner4 from '@assets/Hero/Banner-4.png';
import banner5 from '@assets/Hero/Banner-5.png';
import ButtonAnimation from '@components/feedback/Animation/ButtonAnimation';
import { useNavigate } from 'react-router-dom';
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); 
  const isRTL = i18n.dir() === 'rtl'; 

  const heroBanners = [
    {
      id: 1,
      image: banner1,
      text: t('hero.banners.banner1.text'),
      description: t('hero.banners.banner1.description'),
    },
    {
      id: 2,
      image: banner2,
      text: t('hero.banners.banner2.text'),
      description: t('hero.banners.banner2.description'),
    },
    {
      id: 3,
      image: banner3,
      text: t('hero.banners.banner3.text'),
      description: t('hero.banners.banner3.description'),
    },
  ];

  return (
    <section className='hero'>
      <Swiper
        key={i18n.language}        
        dir={isRTL ? 'rtl' : 'ltr'} 
        className="hero-banner"
        modules={[Pagination, Autoplay, EffectCoverflow]}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{ delay: 3000 }}
        grabCursor={true}
        loop={true}
        slidesPerView={1}
        pagination={{ clickable: true }}
        spaceBetween={50}
      >
        {heroBanners.map((banner) => (
          <SwiperSlide key={banner.id} className='banner'>
            <div className="text">
              <h4>{banner.text}</h4>
              <p>{banner.description}</p>
              <button style={{ cursor: 'none' }}>{t('hero.shopNow')}</button>
            </div>
            <img src={banner.image} alt="banner" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='cards'>
        <div className='card'>
          <div className="text">
            <p>{t('hero.cards.card1')}</p>
            <ButtonAnimation>
              <button onClick={() => navigate('/products')}>{t('hero.shopNow')}</button>
            </ButtonAnimation>
          </div>
          <img src={banner4} alt="card" />
        </div>

        <div className='card'>
          <div className="text">
            <p>{t('hero.cards.card2')}</p>
            <ButtonAnimation>
              <button onClick={() => navigate('/products')}>{t('hero.shopNow')}</button>
            </ButtonAnimation>
          </div>
          <img src={banner5} alt="card" />
        </div>
      </div>
    </section>
  );
};

export default Hero;