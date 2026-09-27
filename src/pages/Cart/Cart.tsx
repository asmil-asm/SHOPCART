import { Box, Container, Typography } from "@mui/material";
import Summary from "@components/ecommerce/Summary/Summary";
import CartItms from "@components/ecommerce/CartItms/CartItms";
import { useAppSelector } from "@store/Hooks";
import CartEmpty from "@components/feedback/Animation/CartEmpty";
import Loading from "@components/feedback/Loading/Loading";
import { useTranslation } from "react-i18next";
import PageTransition from "@components/feedback/Animation/PageTransition";

export default function Cart() {
  const { items, loading, error } = useAppSelector((state) => state.cart);
  const { t } = useTranslation();

  return (
    <PageTransition>
    <Box sx={{ bgcolor: "grey.50", minHeight: "100vh", py: { xs: 3, md: 6 } }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          {t("cart.title")}
        </Typography>

        {items && items.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 3, md: 5 },
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ width: { xs: "100%", md: "60%" } }}>
              <Loading type="CartItem" loading={loading} error={error}>
                <CartItms />
              </Loading>
            </Box>

            <Box sx={{ width: { xs: "100%", md: "35%" } }}>
              <Summary />
            </Box>
          </Box>
        ) : (
          <CartEmpty />
        )}
      </Container>
    </Box>
    </PageTransition>
  );
}