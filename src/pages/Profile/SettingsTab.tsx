import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function SettingsTab() {
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const { t } = useTranslation();

  return (
    <Card sx={{ borderRadius: 3, maxWidth: 640 }}>
      <CardContent>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          <TextField
            label={t("settings.fullName")}
            defaultValue="Ismail Shahin"
            size="small"
          />
          <TextField
            label={t("settings.email")}
            defaultValue="ismail.shahin@example.com"
            size="small"
          />
          <TextField
            label={t("settings.phone")}
            defaultValue="+963 9xx xxx xxx"
            size="small"
          />
          <TextField
            label={t("settings.city")}
            defaultValue="Damascus"
            size="small"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Stack sx={{ gap: 1 }}>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="body2">
                {t("settings.orderNotifications")}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {t("settings.orderNotificationsText")}
              </Typography>
            </Box>
            <Switch
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          </Stack>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="body2">{t("settings.newsletter")}</Typography>
              <Typography variant="caption" color="text.secondary">
                {t("settings.newsletterText")}
              </Typography>
            </Box>
            <Switch
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
            />
          </Stack>
        </Stack>

        <Button variant="contained" sx={{ mt: 3 }}>
          {t("settings.saveChanges")}
        </Button>
      </CardContent>
    </Card>
  );
}