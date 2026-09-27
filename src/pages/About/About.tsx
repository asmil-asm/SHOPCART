import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from '@mui/material';
import { Check, ShoppingBag } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import about1 from '@assets/About/image(1).jpg';
import about2 from '@assets/About/images (2).jpg';
import about3 from '@assets/About/images.jpg';
import Stats from '@components/ecommerce/Stats/Stats';
import Testimonials from '@components/ecommerce/Testimonial/Testimonial';
import TopBrand from '@components/ecommerce/TopBrand/TopBrand';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@components/feedback/Animation/PageTransition';
import './About.css';

const About = () => {
  const { t } = useTranslation();
const navigate=useNavigate()
  const features: string[] = t('about.features', { returnObjects: true }) as string[];

  return (
    <PageTransition>
      <Box className="about-container">
        <Container maxWidth="xl">
          <div className="about-grid">
            <div className="image-collage">
              <div className="collage-main">
                <img
                  src={about1}
                  alt={t('about.imageAlt1')}
                  className="collage-image"
                />
              </div>
              <div className="collage-side">
                <img
                  src={about2}
                  alt={t('about.imageAlt2')}
                  className="collage-image"
                />
                <img
                  src={about3}
                  alt={t('about.imageAlt3')}
                  className="collage-image"
                />
              </div>
            </div>

            <div className="content-wrapper">
              <Box className="section-badge">
                <Box className="badge-dot" />
                <Typography variant="overline" className="badge-text">
                  {t('about.badge')}
                </Typography>
              </Box>

              <Typography variant="h2" className="section-title">
                {t('about.title')}
                <br className="title-break" />
                {t('about.titleBreak')}
              </Typography>

              <Typography variant="body1" className="section-subtitle">
                {t('about.subtitle')}
              </Typography>

              <List className="features-list">
                {features.map((feature, index) => (
                  <ListItem key={index} className="feature-item" disableGutters>
                    <ListItemIcon className="feature-icon-wrapper">
                      <Check className="feature-icon" />
                    </ListItemIcon>
                    <ListItemText primary={feature} className="feature-text" />
                  </ListItem>
                ))}
              </List>

              <Button
                variant="contained"
                className="shop-button"
                startIcon={<ShoppingBag />}
                onClick={()=>navigate('/products')}
              >
                {t('about.shoppingNow')}
              </Button>
            </div>
          </div>
        </Container>
      </Box>
      <Stats />
      <Testimonials />
      <TopBrand />
    </PageTransition>
  );
};

export default About;