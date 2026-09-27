import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import {
  ExpandMore,
  Phone,
  Email,
  Chat,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import PageTransition from "@components/feedback/Animation/PageTransition";
const theme = createTheme({
  palette: {
    primary: {
      main: "#127fff",
      dark: "#0965d0",
      light: "#4a9fff",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#64748b",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          marginBottom: 12,
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          "&:before": { display: "none" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          border: "1px solid #e2e8f0",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 24px rgba(18,127,255,0.12)",
          },
        },
      },
    },
  },
});

export default function HelpCenter() {
  const { t } = useTranslation();

  const faqs = [1, 2, 3, 4, 5, 6].map((i) => ({
    question: t(`helpCenter.faqs.q${i}.question`),
    answer: t(`helpCenter.faqs.q${i}.answer`),
  }));

  return (
    <PageTransition>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography
                variant="h2"
                sx={{ mb: 1, fontSize: { xs: "1.5rem", md: "2rem" } }}
              >
                {t("helpCenter.title")}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {t("helpCenter.subtitle")}
              </Typography>
              {faqs.map((faq, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMore color="primary" />}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>

            {/* Contact */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Card
                sx={{
                  bgcolor: "primary.main",
                  color: "#fff",
                  height: "100%",
                  border: "none",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ mb: 2 }}>
                    {t("helpCenter.stillNeedHelp")}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                    {t("helpCenter.stillNeedHelpText")}
                  </Typography>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Phone />
                      <Box>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          {t("helpCenter.callUs")}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          +1 (800) 123-4567
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Email />
                      <Box>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          {t("helpCenter.emailUs")}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          support@shopcart.example
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Chat />
                      <Box>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          {t("helpCenter.liveChat")}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {t("helpCenter.chatHours")}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      mt: 4,
                      bgcolor: "#fff",
                      color: "primary.main",
                      borderRadius: 3,
                      fontWeight: 700,
                      "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                    }}
                  >
                    {t("helpCenter.contactSupport")}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
    </PageTransition>
  );
}