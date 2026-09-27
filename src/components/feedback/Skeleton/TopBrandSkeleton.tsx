import Skeleton from "@mui/material/Skeleton";

const TopBrandSkeleton = () => {
  const skeletons = Array.from({ length: 6 }); // نفس عدد البراندات المتوقع

  return (
    <section className="brands">
      <Skeleton variant="text" width={200} height={50} animation="wave" />
      <div className="top-brand">
        {skeletons.map((_, index) => (
          <div className="brand" key={index}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={120}
              animation="wave"
              sx={{ borderRadius: "8px" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopBrandSkeleton;