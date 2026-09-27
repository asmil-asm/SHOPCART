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

  return (
    <section className="newProducts">
      {newProducts.length > 0 ? (
        <Slider
          title={t("slider.newProducts")}
          text={t("slider.newProductsDesc")}
          products={newProducts}
        />
      ):(<Waiting/>)}
    </section>
  );
};

export default NewProducts;