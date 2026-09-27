import {
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Stack,
} from "@mui/material";

interface ProductItemSkeletonProps {

}

const ProductItemSkeleton = ({}: ProductItemSkeletonProps) => {
  return (
    <Card
      className="products"
      sx={{
        maxWidth: 400,
        height: "100%",
        padding: "5px",
        position: "relative",
      }}
    >
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          width: "100%",
          height: 140,
          borderRadius: 1,
        }}
      />

      <CardContent sx={{ margin: "5px 0" }}>
        <Skeleton
          variant="text"
          animation="wave"
          sx={{
            fontSize: "1.5rem",
            width: "35%",
          }}
        />

        <Skeleton
          variant="text"
          animation="wave"
          sx={{
            fontSize: "0.95rem",
            width: "80%",
          }}
        />

        <Stack spacing={1} sx={{ mt: 1 }}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={120}
            height={20}
            sx={{ borderRadius: 1 }}
          />
        </Stack>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={110}
          height={32}
          sx={{ borderRadius: 1 }}
        />

        <Skeleton
          variant="circular"
          animation="wave"
          width={32}
          height={32}
        />
      </CardActions>
    </Card>
  );
};

export default ProductItemSkeleton;