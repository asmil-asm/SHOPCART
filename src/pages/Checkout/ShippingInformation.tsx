import { Box, Typography } from "@mui/material";
import styles from "./Checkout.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vaildationChechInfo, type stateCheckInfo } from "@vaildation/vaildationCheckinfo";
import { useDispatch } from "react-redux";
import { setOrderInfo } from "@store/order/orderSlice";
import { useTranslation } from "react-i18next";

interface props {
  onNext: () => void;
}

const ShippingInformation = ({ onNext }: props) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "he" || i18n.language === "fa";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<stateCheckInfo>({
    resolver: zodResolver(vaildationChechInfo),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      city: "",
      address: "",
      phone: "",
      notes: "",
      email: "",
    },
  });

  const submit = (data: stateCheckInfo) => {
    dispatch(setOrderInfo(data));
    onNext();
  };

  return (
    <Box
      dir={isRTL ? "rtl" : "ltr"}
      className={styles.checkoutWrapper}
      sx={{ maxWidth: 1200, m: "auto" }}
    >
      <form onSubmit={handleSubmit(submit)} className={styles.form}>
        <Typography className={styles.formTitle}>{t("Billing Details")}</Typography>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="FirstName">{t("First Name")}</label>
            {errors.firstName && <p className="error">{errors.firstName.message}</p>}

            <input
              {...register("firstName")}
              id="FirstName"
              type="text"
              placeholder={t("Enter your First name")}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="LastName">{t("Last Name")}</label>
            {errors.lastName && <p className="error">{errors.lastName.message}</p>}

            <input
              {...register("lastName")}
              id="LastName"
              type="text"
              placeholder={t("Enter your Last name")}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="phone">{t("Phone")}</label>
            {errors.phone && <p className="error">{errors.phone.message}</p>}

            <input
              {...register("phone")}
              id="phone"
              type="text"
              placeholder={t("+1 234 567 890")}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="city">{t("City")}</label>
            {errors.city && <p className="error">{errors.city.message}</p>}

            <input {...register("city")} id="city" type="text" placeholder={t("Your city")} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="address">{t("Address")}</label>
            {errors.address && <p className="error">{errors.address.message}</p>}

            <textarea
              {...register("address")}
              id="address"
              rows={5}
              placeholder={t("Street, building, apartment...")}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="notes">{t("Notes")}</label>
            <textarea
              {...register("notes")}
              id="notes"
              rows={5}
              placeholder={t("Additional notes (optional)")}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="email">{t("Email")}</label>
            {errors.email && <p className="error">{errors.email.message}</p>}

            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder={t("you@example.com")}
            />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          {t("Continue")}
        </button>
      </form>
    </Box>
  );
};

export default ShippingInformation;