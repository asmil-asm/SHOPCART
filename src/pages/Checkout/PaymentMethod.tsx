import { useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Radio,
  Typography,
  TextField,
  Grid,
  Stack,
  Divider,
  InputAdornment,
  Button,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PayPalIcon from "@mui/icons-material/Payment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch } from "react-redux";
import { setOrderPaymentMethod } from "@store/order/orderSlice";
import { useTranslation } from "react-i18next";

type PaymentMethodType = "card" | "paypal" | "cod";

interface PaymentFormData {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

interface props {
  onNext: () => void;
  onBack: () => void;
}

const PaymentMethod = ({ onNext, onBack }: props) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "he" || i18n.language === "fa";

  const [method, setMethod] = useState<PaymentMethodType>("card");

  const [form, setForm] = useState<PaymentFormData>({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const PAYMENT_OPTIONS: {
    id: PaymentMethodType;
    label: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "card",
      label: t("Credit / Debit Card"),
      description: t("Visa, Mastercard, Amex"),
      icon: <CreditCardIcon fontSize="large" />,
    },
    {
      id: "paypal",
      label: t("PayPal"),
      description: t("Pay securely with your PayPal account"),
      icon: <PayPalIcon fontSize="large" />,
    },
    {
      id: "cod",
      label: t("Cash on Delivery"),
      description: t("Pay when you receive your order"),
      icon: <LocalShippingIcon fontSize="large" />,
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const digits = value.replace(/\D/g, "").slice(0, 16);
      const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
      setForm((prev) => ({ ...prev, cardNumber: formatted }));
      return;
    }

    if (name === "expiry") {
      const digits = value.replace(/\D/g, "").slice(0, 4);
      const formatted =
        digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
      setForm((prev) => ({ ...prev, expiry: formatted }));
      return;
    }

    if (name === "cvv") {
      const digits = value.replace(/\D/g, "").slice(0, 4);
      setForm((prev) => ({ ...prev, cvv: digits }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    dispatch(setOrderPaymentMethod(method));
    onNext();
  };

  return (
    <Box
      dir={isRTL ? "rtl" : "ltr"}
      sx={{
        width: "100%",
        maxWidth: 720,
        mx: "auto",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mb: 3, fontSize: { xs: "1.25rem", sm: "1.5rem", fontWeight: 700 } }}
      >
        {t("Payment Method")}
      </Typography>

      <Stack spacing={2}>
        {PAYMENT_OPTIONS.map((option) => {
          const selected = method === option.id;

          return (
            <Card
              key={option.id}
              variant="outlined"
              sx={{
                borderWidth: 2,
                borderColor: selected ? "primary.main" : "divider",
                bgcolor: selected ? "primary.50" : "background.paper",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "primary.light",
                  transform: "translateY(-1px)",
                  boxShadow: 2,
                },
              }}
            >
              <CardActionArea onClick={() => setMethod(option.id)} sx={{ p: 1 }}>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    py: 1.5,
                    "&:last-child": { pb: 1.5 },
                  }}
                >
                  <Box
                    sx={{
                      color: selected ? "primary.main" : "text.secondary",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {option.icon}
                  </Box>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1rem", fontWeight: 600 } }}>
                      {option.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" } }}
                    >
                      {option.description}
                    </Typography>
                  </Box>

                  <Radio checked={selected} value={option.id} name="payment-method" color="primary" />
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Stack>

      {method === "card" && (
        <Box
          sx={{
            mt: 3,
            p: { xs: 2, sm: 3 },
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: "grey.50",
          }}
        >
          <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: "center" }}>
            <LockIcon fontSize="small" color="success" />
            <Typography variant="body2" color="text.secondary">
              {t("Your payment information is encrypted and secure")}
            </Typography>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={2}>
            <Grid sx={{ xs: 12 }}>
              <TextField
                fullWidth
                label={t("Card Number")}
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                slotProps={{
                  htmlInput: {
                    inputMode: "numeric",
                    maxLength: 19,
                  },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreditCardIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            <Grid sx={{ xs: 12 }}>
              <TextField
                fullWidth
                label={t("Cardholder Name")}
                name="cardName"
                value={form.cardName}
                onChange={handleChange}
                placeholder="Name on card"
              />
            </Grid>

            <Grid sx={{ xs: 6, sm: 6 }}>
              <TextField
                fullWidth
                label={t("Expiry Date")}
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                slotProps={{
                  htmlInput: { inputMode: "numeric", maxLength: 5 },
                }}
              />
            </Grid>

            <Grid sx={{ xs: 6, sm: 6 }}>
              <TextField
                fullWidth
                label={t("CVV")}
                name="cvv"
                type="password"
                value={form.cvv}
                onChange={handleChange}
                placeholder="123"
                slotProps={{
                  htmlInput: {
                    inputMode: "numeric",
                    maxLength: 4,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {method === "paypal" && (
        <Box
          sx={{
            mt: 3,
            p: 3,
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: "grey.50",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {t("You'll be redirected to PayPal to complete your purchase securely.")}
          </Typography>
        </Box>
      )}

      {method === "cod" && (
        <Box
          sx={{
            mt: 3,
            p: 3,
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: "grey.50",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {t("Please have the exact amount ready when your order arrives.")}
          </Typography>
        </Box>
      )}
      <Button onClick={handleContinue} variant="contained" sx={{ mt: 3 }}>
        {t("Continue")}
      </Button>
    </Box>
  );
};

export default PaymentMethod;