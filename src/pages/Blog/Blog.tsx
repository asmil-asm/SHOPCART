import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { BlogsAction } from "@store/actions/BlogsAction";
import { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import PageTransition from "@components/feedback/Animation/PageTransition";
import { cleanBlogs } from "@store/Blogs/BlogSlice";
import Loading from "@components/feedback/Loading/Loading";
import { useTranslation } from "react-i18next";

const Blog = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");

  useEffect(() => {
    const promise = dispatch(BlogsAction());
    return () => {
      promise.abort();
      dispatch(cleanBlogs());
    };
  }, [dispatch]);

  const { blogs, loading, error } = useAppSelector((state) => state.blogs);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleReadMore = (id: number) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const getBlogTitle = (blog: any) =>
    isArabic
      ? blog.title_ar || blog.title_en || ""
      : blog.title_en || blog.title_ar || "";

  const getBlogDescription = (blog: any) =>
    isArabic
      ? blog.discreption_ar || blog.discreption_en || ""
      : blog.discreption_en || blog.discreption_ar || "";

  return (
    <Loading type="blogs" loading={loading} error={error}>
      <PageTransition>
      <Grid sx={{ margin: "20px" }} container spacing={2} className="blogs">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog: any) => {
            const isOpen = openIndex === blog.id;
            const title = getBlogTitle(blog);
            const description = getBlogDescription(blog);

            return (
              <Grid
                container
                key={blog.id}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={`http://localhost:1337${blog?.blog?.url}`}
                    title={title}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        fontSize: "20px",
                        lineClamp: "2",
                        color: "var(--main-color)",
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#333",
                        display: "-webkit-box",
                        WebkitLineClamp: isOpen ? "unset" : 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => toggleReadMore(blog.id)} size="small">
                      {isOpen ? t("blog.showLess") : t("blog.readMore")}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        ) : (
          <div>{t("blog.empty")}</div>
        )}
      </Grid>
      </PageTransition>
    </Loading>
  );
};

export default Blog;