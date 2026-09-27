// BestSaleProducts.tsx
import Slider from "@components/common/Slider/Slider";
import { useAppSelector } from "@store/Hooks";
import { useTranslation } from "react-i18next";
import Waiting from "@components/feedback/Animation/Waiting";
const BestSaleProducts = () => {
  const { records } = useAppSelector((state) => state.products);
  const { t } = useTranslation();

  const discountProducts = records.filter(
    (item: any) => item.discount && item.discount > 0
  );

  return (
    <section className="bestSalePrducts" >
      {discountProducts.length > 0 ? (
        <Slider
          title={t("slider.bestSale")}
          text={t("slider.bestSaleDesc")}
          products={discountProducts}
        />
      ):(<Waiting/>)}
    </section>
  );
};

export default BestSaleProducts;