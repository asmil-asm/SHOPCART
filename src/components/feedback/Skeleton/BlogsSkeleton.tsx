import { Skeleton, Grid, Card, CardContent, CardActions } from "@mui/material";
  import { useAppSelector } from "@store/Hooks";
const BlogsSkeleton = () => {
  const{blogs}=useAppSelector(state=>state.blogs)
  const skeletons = Array.from({ length: 5 }, (_, i) => i);

  return (
    <Grid sx={{ margin: '20px' }} container spacing={2} className="blogs">
      {skeletons.map((index) => (
        <Grid container key={index} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Card sx={{ maxWidth: 345 }}>
            <Skeleton variant="rectangular" width="345px" height="140px" />
            <CardContent>
              <Skeleton variant="text" sx={{ fontSize: '20px', width: '80%' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </CardContent>
            <CardActions>
              <Skeleton variant="rectangular" width="80px" height="30px" />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogsSkeleton;