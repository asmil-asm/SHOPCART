import { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Rating,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import SpeakerIcon from "@mui/icons-material/Speaker";
import { ProfileHeader } from "./ProfileHeader";
import { WishlistTab } from "./WishlistTab";
import { AddressesTab } from "./AddressesTab";
import { OrdersTab } from "./OrdersTab";
import { SettingsTab } from "./SettingsTab";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PageTransition from "@components/feedback/Animation/PageTransition";


const profileTabs = [
  { label: "Orders", icon: <ShoppingBagIcon fontSize="small" /> },
  { label: "Wishlist", icon: <FavoriteIcon fontSize="small" /> },
  { label: "Addresses", icon: <LocationOnIcon fontSize="small" /> },
  { label: "Settings", icon: <SettingsIcon fontSize="small" /> },
];

export default function ProfilePage() {
  const [tab, setTab] = useState(0);

  return (
    <PageTransition>
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f7fb", py: { xs: 2, md: 5 } }}>
      <Box sx={{ maxWidth: 960, mx: "auto", px: { xs: 2, sm: 3 } }}>
        <ProfileHeader onEditClick={() => setTab(3)} />

        <Card sx={{ borderRadius: 3, mt: 3 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            allowScrollButtonsMobile
            sx={{
              px: { xs: 1, sm: 2 },
              pt: 1,
              "& .MuiTab-root": { minHeight: 56 },
              "& .Mui-selected": { color: "#127fff" },
              "& .MuiTabs-indicator": { backgroundColor: "#127fff" },
            }}
          >
            {profileTabs.map((t) => (
              <Tab
                key={t.label}
                icon={t.icon}
                iconPosition="start"
                label={t.label}
              />
            ))}
          </Tabs>

          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            {tab === 0 && <OrdersTab />}
            {tab === 1 && <WishlistTab />}
            {tab === 2 && <AddressesTab />}
            {tab === 3 && <SettingsTab />}
          </CardContent>
        </Card>
      </Box>
    </Box>
    </PageTransition>
  );
}
