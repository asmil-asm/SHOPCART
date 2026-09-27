import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useAppSelector,useAppDispatch } from "@store/Hooks";
import type { OrderStatus } from "@typeCustome/TypeOrder";
import { reseteOrder } from "@store/order/orderSlice";

const statusColor = (
  status: OrderStatus
): "success" | "info" | "error" | "warning" | "default" => {
  switch (status) {
    case "delivered":
    case "paid":
      return "success";
    case "shipped":
      return "info";
    case "cancelled":
      return "error";
    case "pending":
      return "warning";
    default:
      return "default";
  }
};

const statusLabel = (status: OrderStatus): string => {
  const map: Record<OrderStatus, string> = {
    delivered: "Delivered",
    shipped: "Shipped",
    paid: "Paid",
    pending: "Pending",
    cancelled: "Cancelled",
  };
  return map[status] ?? status;
};

export function OrdersTab() {
  const { order } = useAppSelector((state) => state.order);
const dispatch=useAppDispatch()
  if (!order?.orderId) return null;

  return (
    <Stack sx={{ gap: 2 }}>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 1,
              mb: 2,
            }}
          >
            <Stack
              sx={{
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Order #{order.orderId}
              </Typography>
              <Chip
                size="small"
                label={statusLabel(order.state)}
                color={statusColor(order.state)}
              />
            </Stack>
            {order.paymentMethod && (
              <Typography variant="body2" color="text.secondary">
                Payment: {order.paymentMethod.toUpperCase()}
              </Typography>
            )}
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Stack sx={{ gap: 1.5 }}>
            {order.orederItem?.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No items in this order.
              </Typography>
            ) : (
              order.orederItem.map((item, index) => (
                <Stack
                  key={`${item.productID}-${index}`}
                  sx={{ flexDirection: "row", alignItems: "center", gap: 2 }}
                >
                  <Avatar
                    src={item.image}
                    alt={item.name}
                    variant="rounded"
                    sx={{ width: 48, height: 48 }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                      noWrap
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Stack>
              ))
            )}
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 2,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Total: ${Number(order.total || 0).toFixed(2)}
            </Typography>
            <Stack sx={{ flexDirection: "row", gap: 1 }}>
             
              <Button size="small" variant="outlined" color="secondary" onClick={()=>dispatch(reseteOrder())}>
              Delete All
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}