import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useAppSelector, useAppDispatch } from "@store/Hooks";
import { logout } from "@store/Auth/LoginSlice";
import { useTranslation } from "react-i18next";

export function ProfileHeader({ onEditClick }: { onEditClick: () => void }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.login);
  const { items } = useAppSelector((state) => state.cart);
  const { favorite } = useAppSelector((state) => state.favorite);

  if (!user) return null;

  const name = user.email.slice(0, 1).toUpperCase();

  return (
    <Card sx={{ overflow: "hidden", borderRadius: 3 }}>
      <Box
        sx={{
          height: { xs: 90, sm: 130 },
          background:
            "linear-gradient(120deg, #127fff 0%, #0965d0 60%, #0a4fa8 100%)",
        }}
      />
      <CardContent sx={{ pt: 0, pb: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-end" },
            gap: 2,
            mt: -6,
            px: { xs: 2, sm: 4 },
          }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <IconButton
                size="small"
                onClick={onEditClick}
                aria-label={t("profile.editPictureAria")}
                sx={{
                  bgcolor: "#127fff",
                  color: "#fff",
                  "&:hover": { bgcolor: "#0965d0" },
                }}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <Avatar
              sx={{
                width: { xs: 96, sm: 120 },
                height: { xs: 96, sm: 120 },
                fontSize: { xs: 32, sm: 40 },
                fontWeight: 700,
                color: "#fff",
                border: "5px solid #fff",
                background:
                  "linear-gradient(135deg, #127fff 0%, #0965d0 100%)",
              }}
            >
              {name}
            </Avatar>
          </Badge>

          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", sm: "start" },
              mb: { sm: 1 },
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>

          <Stack
            sx={{
              flexDirection: "row",
              gap: 1,
              mb: { sm: 1 },
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={onEditClick}
              variant="contained"
              startIcon={<EditIcon />}
            >
              {t("profile.editProfile")}
            </Button>
            <Button
              onClick={() => dispatch(logout())}
              variant="outlined"
              color="secondary"
            >
              {t("profile.logOut")}
            </Button>
          </Stack>
        </Box>

        <Stack
          sx={{
            flexDirection: "row",
            gap: { xs: 3, sm: 6 },
            justifyContent: { xs: "center", sm: "flex-start" },
            px: { xs: 2, sm: 4 },
            mt: 3,
          }}
        >
          {[
            { label: t("profile.orders"), value: `${items.length}` },
            { label: t("profile.wishlist"), value: `${favorite.length}` },
          ].map((stat) => (
            <Box key={stat.label} sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ color: "#127fff" }}>
                {stat.value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}