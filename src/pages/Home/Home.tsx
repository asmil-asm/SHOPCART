import Hero from "@components/common/HeroSection/Hero";
import Features from "@components/common/Features/Featres";
import "./Home.css";
import Categories from "@components/ecommerce/category/Categories";
import NewProducts from "@components/ecommerce/ProductsSlide/NewProducts";
import BestSaleProducts from "@components/ecommerce/ProductsSlide/BestSaleProducts";
import RecommendedProducts from "@components/ecommerce/ProductsSlide/RecommendedProducts";
import banner1 from "@assets/banner-home/banner-3-2.png";
import banner2 from "@assets/banner-home/banner-home-2.png";
import banner3 from "@assets/banner-home/ads-2.png";
import banner4 from "@assets/banner-home/banner-7-1.png";
import TopBrand from "@components/ecommerce/TopBrand/TopBrand";
import ButtonAnimation from "@components/feedback/Animation/ButtonAnimation";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="home">
      <Hero />
      <Features />
      <Categories />
      <NewProducts />

      <div className="banners">
        <div className="box">
          <div className="text">
            <h1>{t("home.xiaomi11")}</h1>
            <ButtonAnimation>
              <button onClick={() => navigate("/products")}>
                {t("hero.shopNow")}
              </button>
            </ButtonAnimation>
          </div>
          <img src={banner1} alt={t("home.xiaomi11")} />
        </div>

        <div className="box">
          <div className="text">
            <h1>{t("home.xiaomiBuds")}</h1>
            <ButtonAnimation>
              <button onClick={() => navigate("/products")}>
                {t("hero.shopNow")}
              </button>
            </ButtonAnimation>
          </div>
          <img src={banner2} alt={t("home.xiaomiBuds")} />
        </div>
      </div>

      <BestSaleProducts />

      <div className="ads">
        <img src={banner3} alt={t("home.adsAlt")} />
      </div>

      <RecommendedProducts />

      <div className="recommended">
        <div className="text">
          <h1>{t("home.iphonePro")}</h1>
          <p>{t("home.iphoneDesc")}</p>
          <ButtonAnimation>
            <button onClick={() => navigate("/products")}>
              {t("hero.shopNow")}
            </button>
          </ButtonAnimation>
        </div>
        <img src={banner4} alt={t("home.iphonePro")} />
      </div>

      <TopBrand />
    </div>
  );
};

export default Home;