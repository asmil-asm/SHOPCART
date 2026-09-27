// RecommendedProducts.tsx
import Slider from "@components/common/Slider/Slider";
import { useAppSelector } from "@store/Hooks";
import { useTranslation } from "react-i18next";
import Waiting from "@components/feedback/Animation/Waiting";
const RecommendedProducts = () => {
  const { records } = useAppSelector((state) => state.products);
  const { t } = useTranslation();

  const recommended = records.filter((item) => item.Recommended);

  return (
    <section className="BestProducts">
      {recommended.length > 0 ? (
        <Slider
          title={t("slider.recommended")}
          text={t("slider.recommendedDesc")}
          products={recommended}
        />
      ):(<Waiting/>)}
    </section>
  );
};

export default RecommendedProducts;