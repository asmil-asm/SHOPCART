// NewProducts.tsx
import Slider from "@components/common/Slider/Slider";
import { useAppSelector } from "@store/Hooks";
import { useTranslation } from "react-i18next";
import Waiting from "@components/feedback/Animation/Waiting";
const NewProducts = () => {
  const { records } = useAppSelector((state) => state.products);
  const { t } = useTranslation();
  const dateNow = new Date();

  const newProducts = records.filter((item) => {
    const date = new Date(item.time);
    const isSameMonth =
      date.getMonth() === dateNow.getMonth() ||
      dateNow.getMonth() - date.getMonth() <= 1;
    return isSameMonth;
  });
const products =
  newProducts.length >= 7
    ? newProducts.slice(0, 7)  
    : [...newProducts, ...records.filter(p => !newProducts.includes(p))].slice(0, 7);
  return (
    <section className="newProducts">
      {newProducts.length > 0 ? (
        <Slider
          title={t("slider.newProducts")}
          text={t("slider.newProductsDesc")}
          products={products}
        />
      ):(<Waiting/>)}
    </section>
  );
};

export default NewProducts;