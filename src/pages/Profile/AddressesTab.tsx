import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";
import {
  vaildationAddress,
  type stateAddress,
} from "@vaildation/vaildationAddress";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

export function AddressesTab() {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<stateAddress>({
    defaultValues: { place: "", city: "", address: "" },
    mode: "onBlur",
    resolver: zodResolver(vaildationAddress),
  });

  const [Data, setData] = useState<stateAddress[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("address");
    if (!stored) return [];
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? (parsed as stateAddress[]) : [];
    } catch {
      return [];
    }
  });

  const [show, setShow] = useState(false);

  const submit = async (data: stateAddress) => {
    const updated = [...Data, data];
    setData(updated);
    localStorage.setItem("address", JSON.stringify(updated));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
    setShow(false);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
        gap: 2,
      }}
    >
      {Data.map((address) => (
        <Card key={address.place} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Stack sx={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
              <Avatar
                sx={{ bgcolor: "rgba(18, 127, 255, 0.08)", color: "#127fff" }}
              >
                <LocationOnIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle2">{address.place}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {address.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {address.address}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}

      <Card
        sx={{
          borderRadius: 3,
          border: "2px dashed rgba(18, 127, 255, 0.4)",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 140,
          cursor: "pointer",
          "&:hover": {
            borderColor: "#127fff",
            bgcolor: "rgba(18,127,255,0.03)",
          },
        }}
        onClick={() => setShow(true)}
      >
        <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}>
          <AddIcon sx={{ color: "#127fff" }} />
          <Typography variant="subtitle2" sx={{ color: "#127fff" }}>
            {t("addresses.addNew")}
          </Typography>
        </Stack>
      </Card>

      {show && (
        <form onSubmit={handleSubmit(submit)}>
          <Stack direction="column" sx={{ gap: "10px", background: "white" }}>
            <label>{t("addresses.place")}</label>
            {errors.place && <p className="error">{errors.place.message}</p>}
            <input {...register("place")} name="place" type="text" />

            <label>{t("addresses.city")}</label>
            {errors.city && <p className="error">{errors.city.message}</p>}
            <input {...register("city")} name="city" type="text" />

            <label>{t("addresses.address")}</label>
            {errors.address && <p className="error">{errors.address.message}</p>}
            <input {...register("address")} name="address" type="text" />
          </Stack>

          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <button
              type="submit"
              style={{
                background: "var(--main-color)",
                border: "none",
                padding: "10px",
                margin: "10px 0",
                color: "white",
                cursor: "pointer",
              }}
            >
              {t("addresses.save")}
            </button>
            <button
              type="button"
              style={{
                background: "var(--main-color-hover)",
                border: "none",
                padding: "10px",
                margin: "10px 0",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => setShow(false)}
            >
              {t("addresses.close")}
            </button>
          </Stack>
        </form>
      )}
    </Box>
  );
}