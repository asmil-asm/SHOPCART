import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector } from "@store/Hooks";
import QtyControl from "../QtyControl/QtyControl";
import useCartActions from "@hooks/useCartActions";
import { useTranslation } from "react-i18next";

const money = (v: number | undefined | null, lang: string) =>
  new Intl.NumberFormat(lang.startsWith("ar") ? "ar-EG" : "en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(v ?? 0);

const CartItms = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { items } = useAppSelector((state) => state.cart);
  const { handleRemoveFromCart } = useCartActions();
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language.startsWith("ar");

  const getProductTitle = (product: any) =>
    isArabic
      ? product?.title_ar || product?.title_en || t("cart.product")
      : product?.title_en || product?.title_ar || t("cart.product");

  const headers = [
    t("cart.headers.images"),
    t("cart.headers.product"),
    t("cart.headers.unitPrice"),
    t("cart.headers.quantity"),
    t("cart.headers.total"),
    t("cart.headers.remove"),
  ];

  return (
    <Box sx={{ width: "100%" }}>
      {isMobile ? (
        <Stack spacing={2}>
          {items.map((item) => {
            const product = item.proudct;
            const imageUrl = product?.image?.[0]?.url || product?.product?.url;
            const title = getProductTitle(product);
            const price = product?.price || 0;

            return (
              <Paper
                key={item.documentId}
                elevation={0}
                sx={{ border: 1, borderColor: "divider", p: 2 }}
              >
                <Stack direction="row" spacing={2}>
                  <Box
                    component="img"
                    src={
                      imageUrl
                        ? `http://localhost:1337${imageUrl}`
                        : "/placeholder-product.png"
                    }
                    alt={title}
                    loading="lazy"
                    width={96}
                    height={120}
                    sx={{ width: 96, height: 120, objectFit: "cover", flexShrink: 0 }}
                  />

                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 1,
                      }}
                    >
                      <Typography sx={{ fontWeight: 600, minWidth: 0 }}>
                        {title}
                      </Typography>

                      <QtyControl quantityNum={item.quantity} id={item.documentId} />

                      <IconButton
                        aria-label={t("cart.removeItem")}
                        size="small"
                        onClick={() => handleRemoveFromCart(item.documentId)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Stack>

                    <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                      {money(price, i18n.language)}
                    </Typography>

                    <Typography sx={{ fontWeight: 700 }}>
                      {money(price * item.quantity, i18n.language)}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            );
          })}

          {items.length === 0 && (
            <Paper
              elevation={0}
              sx={{ border: 1, borderColor: "divider", p: 4, textAlign: "center" }}
            >
              <Typography color="text.secondary">{t("cart.empty")}</Typography>
            </Paper>
          )}
        </Stack>
      ) : (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ border: 1, borderColor: "divider", overflow: "auto", height: "600px" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                {headers.map((h) => (
                  <TableCell key={h} align="center" sx={{ fontWeight: 700 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((item) => {
                const product = item.proudct;
                const imageUrl = product?.image?.[0]?.url || product?.product?.url;
                const title = getProductTitle(product);
                const price = product?.price || 0;

                return (
                  <TableRow key={item.documentId}>
                    <TableCell align="center">
                      <Box
                        component="img"
                        src={
                          imageUrl
                            ? `http://localhost:1337${imageUrl}`
                            : "/placeholder-product.png"
                        }
                        alt={title}
                        width={100}
                        height={125}
                        sx={{ width: 100, height: 125, objectFit: "cover" }}
                      />
                    </TableCell>

                    <TableCell align="center">{title}</TableCell>

                    <TableCell align="center">{money(price, i18n.language)}</TableCell>

                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <QtyControl quantityNum={item.quantity} id={item.documentId} />
                      </Box>
                    </TableCell>

                    <TableCell align="center">
                      {money(price * item.quantity, i18n.language)}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        aria-label={t("cart.removeItem")}
                        onClick={() => handleRemoveFromCart(item.documentId)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}

              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    {t("cart.empty")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CartItms;