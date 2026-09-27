import {
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useAppSelector } from "@store/Hooks";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import useCartActions from "@hooks/useCartActions";

import { memo } from "react";

type Props = {
  id: string;
  quantityNum: number;
};

const QtyControl = ({
  id,
  quantityNum,
}: Props) => {
  const { handleUpdateQuantity} = useCartActions();
const {loading}=useAppSelector(state=>state.cart)
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        width: 150,
        overflow: "hidden",
      }}
    >
      <IconButton
        aria-label="Decrease quantity"
        onClick={() =>
          handleUpdateQuantity(
            quantityNum - 1,
            id
          )
        }
        disabled={quantityNum <= 1}
        sx={{
          borderRadius: 0,
          flex: 1,
        }}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>

      <Divider
        orientation="vertical"
        flexItem
      />

      <Typography
        sx={{
          flex: 1,
          textAlign: "center",
        }}
      >
        {quantityNum}
      </Typography>

      <Divider
        orientation="vertical"
        flexItem
      />

      <IconButton
        aria-label="Increase quantity"
        onClick={() =>
          handleUpdateQuantity(
            quantityNum + 1,
            id
          )
        }
        sx={{
          borderRadius: 0,
          flex: 1,
        }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default memo(QtyControl);