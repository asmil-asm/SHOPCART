import {
  Box,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const CartItemsSkeleton = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("md")
  );

  const skeletons = Array.from(
    { length: 4 },
    (_, i) => i
  );

  return (
    <Box sx={{ width: "100%" }}>
      {isMobile ? (
        <Stack spacing={2}>
          {skeletons.map((index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                border: 1,
                borderColor: "divider",
                p: 2,
              }}
            >
              <Stack
                direction="row"
                spacing={2}
              >
                {/* Image */}
                <Skeleton
                  variant="rectangular"
                  width={96}
                  height={120}
                  sx={{
                    width: 96,
                    height: 120,
                    flexShrink: 0,
                  }}
                />

                <Box
                  sx={{
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  {/* Title + QtyControl + Remove */}
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent:
                        "space-between",
                      alignItems:
                        "flex-start",
                      gap: 1,
                    }}
                  >
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize:
                          "1rem",
                        width: "45%",
                      }}
                    />

                    <Skeleton
                      variant="rectangular"
                      width={90}
                      height={32}
                      sx={{ borderRadius: 1 }}
                    />

                    <Skeleton
                      variant="circular"
                      width={28}
                      height={28}
                    />
                  </Stack>

                  {/* Unit price */}
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: "0.875rem",
                      width: "30%",
                      mb: 1.5,
                    }}
                  />

                  {/* Total */}
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: "1rem",
                      width: "35%",
                    }}
                  />
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>
      ) : (
        /* ============ DESKTOP SKELETON ============ */
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            border: 1,
            borderColor: "divider",
            overflow: "auto",
            height: "600px",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{ bgcolor: "grey.50" }}
              >
                {[
                  "Images",
                  "Product",
                  "Unit Price",
                  "Quantity",
                  "Total",
                  "Remove",
                ].map((h) => (
                  <TableCell
                    key={h}
                    align="center"
                  >
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "1rem",
                        width: "60%",
                        mx: "auto",
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {skeletons.map((index) => (
                <TableRow key={index}>
                  {/* Image */}
                  <TableCell align="center">
                    <Skeleton
                      variant="rectangular"
                      width={100}
                      height={125}
                      sx={{
                        width: 100,
                        height: 125,
                        mx: "auto",
                      }}
                    />
                  </TableCell>

                  {/* Product title */}
                  <TableCell align="center">
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "1rem",
                        width: "70%",
                        mx: "auto",
                      }}
                    />
                  </TableCell>

                  {/* Unit price */}
                  <TableCell align="center">
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "1rem",
                        width: "50%",
                        mx: "auto",
                      }}
                    />
                  </TableCell>

                  {/* Quantity control */}
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent:
                          "center",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={90}
                        height={32}
                        sx={{ borderRadius: 1 }}
                      />
                    </Box>
                  </TableCell>

                  {/* Total */}
                  <TableCell align="center">
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "1rem",
                        width: "50%",
                        mx: "auto",
                      }}
                    />
                  </TableCell>

                  {/* Remove button */}
                  <TableCell align="center">
                    <Skeleton
                      variant="circular"
                      width={32}
                      height={32}
                      sx={{ mx: "auto" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CartItemsSkeleton;