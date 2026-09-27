import { Typography, Stack, Button, Box, CircularProgress, Alert } from "@mui/material";
import { orderAction } from "@store/actions/orderAction";
import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { useTranslation } from "react-i18next";
import { clearItems } from "@store/actions/CartAction";
const ReviewConfirm = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "he" || i18n.language === "fa";

  const { order, loading, error } = useAppSelector(state => state.order);
  const { items } = useAppSelector(state => state.cart);

  const total = items.reduce(
    (sum, item) => sum + item.proudct.price * item.quantity,
    0
  );

const handleConfirm = async () => {
  try {
    await dispatch(orderAction()).unwrap();
    await dispatch(clearItems()).unwrap();
  } catch (err) {
    console.error("Confirm failed:", err);
  }
};

  const isSubmitting = loading === "pending";
  const isConfirmed = loading === "succeed" && !!order.orderId;

  return (
    <Box
      dir={isRTL ? "rtl" : "ltr"}
      sx={{ background: "white", padding: "20px", margin: "auto", maxWidth: 1000, borderRadius: "10px" }}
    >
      <Typography variant="h1" sx={{ color: "var(--main-color)", fontSize: "30px", textAlign: "center" }}>
        {t("Review & Confirm")}
      </Typography>

      <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", margin: "20px 0" }}>
        <div>
          <Typography>{t("First Name")}: {order.shippingInfo?.firstName}</Typography>
          <Typography>{t("Last Name")}: {order.shippingInfo?.lastName}</Typography>
          <Typography>{t("Phone")}: {order.shippingInfo?.phone}</Typography>
        </div>
        <div>
          <Typography>{t("Email")}: {order.shippingInfo?.email}</Typography>
          <Typography>{t("City")}: {order.shippingInfo?.city}</Typography>
          <Typography>{t("Address")}: {order.shippingInfo?.address}</Typography>
        </div>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ justifyContent: "space-around" }}>
        <Typography>{t("Payment Method")}: {order.paymentMethod}</Typography>
        <Typography>{t("Total")}: {total}</Typography>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {isConfirmed ? (
        <Alert severity="success" sx={{ mt: 3 }}>
          {t("Your order has been created successfully, order number #{{orderId}}", { orderId: order.orderId })}
        </Alert>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button variant="contained" onClick={handleConfirm} disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={22} color="inherit" /> : t("Confirm Order")}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ReviewConfirm;