import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  InputBase,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { TotalPrice } from "@store/Cart/Selector/Totalquantity";
import { useState } from "react";
import { useAppSelector } from "@store/Hooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Summary = () => {
  const [shipping, setShipping] = useState("flat");
  const [coupon, setCoupon] = useState("");
  const subtotal = useAppSelector(TotalPrice) || 0;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language.startsWith("ar");

  const money = (v: number) =>
    new Intl.NumberFormat(isArabic ? "ar-EG" : "en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(v);

  const shippingCost = shipping === "flat" ? 10 : 0;
  const grandTotal = subtotal + shippingCost;

  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        position: { md: "sticky" },
        top: 24,
      }}
    >
      <Box sx={{ bgcolor: "primary.main", color: "primary.contrastText", px: 3, py: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {t("cart.shoppingCart")}
        </Typography>
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Stack
          direction="row"
          sx={{ border: 1, borderColor: "divider", borderRadius: 1, mb: 3 }}
        >
          <InputBase
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder={t("cart.couponPlaceholder")}
            sx={{ flex: 1, px: 2, py: 1 }}
            inputProps={{ "aria-label": t("cart.couponAria") }}
          />
          <Divider orientation="vertical" flexItem />
          <Button sx={{ px: 3 }}>{t("cart.apply")}</Button>
        </Stack>

        <Stack direction="row" sx={{ justifyContent: "space-between", mb: 3 }}>
          <Typography sx={{ fontWeight: 700 }}>{t("cart.subtotal")}</Typography>
          <Typography sx={{ fontWeight: 700 }}>{money(subtotal)}</Typography>
        </Stack>

        <Typography sx={{ fontWeight: 700, mb: 1 }}>
          {t("cart.shipping")}
        </Typography>
        <RadioGroup value={shipping} onChange={(e) => setShipping(e.target.value)}>
          <FormControlLabel
            value="flat"
            control={<Radio size="small" />}
            label={t("cart.flatRate")}
          />
          <FormControlLabel
            value="free"
            control={<Radio size="small" />}
            label={t("cart.freeShipping")}
          />
          <FormControlLabel
            value="pickup"
            control={<Radio size="small" />}
            label={t("cart.localPickup")}
          />
        </RadioGroup>

        <Divider sx={{ my: 3 }} />

        <Stack direction="row" sx={{ justifyContent: "space-between", mb: 3 }}>
          <Typography sx={{ fontWeight: 700 }}>{t("cart.totalLabel")}</Typography>
          <Typography sx={{ fontWeight: 700 }}>{money(grandTotal)}</Typography>
        </Stack>
      </CardContent>

      <Box sx={{ px: 3, pb: 3 }}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          sx={{ py: 1.5 }}
          onClick={() => navigate("/checkout")}
        >
          {t("cart.checkout")}
        </Button>
      </Box>
    </Card>
  );
};

export default Summary;