import { useEffect, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/pagination";

import avatar1 from "@assets/About/Tesmonials/download.jpg";
import avatar2 from "@assets/About/Tesmonials/images (1).jpg";
import avatar3 from "@assets/About/Tesmonials/images (2).jpg";
import avatar4 from "@assets/About/Tesmonials/images.jpg";

import "./Testimonials.css";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar: string;
};

const StyledSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(14, 0),
  },
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  margin: "0 auto",
  width: "100%",
  maxWidth: theme.breakpoints.values.lg,
  padding: theme.spacing(0, 3),
  textAlign: "center",
}));

const AvatarWrapper = styled(Box)({
  position: "relative",
  display: "inline-block",
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 112,
  height: 112,
  border: `4px solid ${theme.palette.common.white}`,
  boxShadow: theme.shadows[3],
  [theme.breakpoints.up("sm")]: {
    width: 128,
    height: 128,
  },
}));

const QuoteBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: -4,
  insetInlineEnd: -4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: theme.shadows[2],
}));

const QuoteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ width: 20, height: 20 }}
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

const TestimonialCard = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Testimonials = () => {
  const [mounted, setMounted] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  useEffect(() => {
    setMounted(true);
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: t("testimonials.items.1.name"),
      role: t("testimonials.items.1.role"),
      text: t("testimonials.items.1.text"),
      avatar: avatar1,
    },
    {
      id: 2,
      name: t("testimonials.items.2.name"),
      role: t("testimonials.items.2.role"),
      text: t("testimonials.items.2.text"),
      avatar: avatar2,
    },
    {
      id: 3,
      name: t("testimonials.items.3.name"),
      role: t("testimonials.items.3.role"),
      text: t("testimonials.items.3.text"),
      avatar: avatar3,
    },
    {
      id: 4,
      name: t("testimonials.items.4.name"),
      role: t("testimonials.items.4.role"),
      text: t("testimonials.items.4.text"),
      avatar: avatar4,
    },
  ];

  const renderTestimonialContent = (item: Testimonial) => (
    <TestimonialCard>
      <AvatarWrapper>
        <StyledAvatar src={item.avatar} alt={item.name} />
        <QuoteBadge>
          <QuoteIcon />
        </QuoteBadge>
      </AvatarWrapper>

      <Typography
        variant="h5"
        component="h3"
        sx={{ mt: 3.5, fontWeight: 700, color: "text.primary" }}
      >
        {item.name}
      </Typography>

      <Typography
        variant="body1"
        sx={{ mt: 0.5, fontWeight: 500, color: "text.secondary" }}
      >
        {item.role}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mt: 1.5,
          maxWidth: "42rem",
          lineHeight: 1.75,
          color: "text.secondary",
          fontSize: "1.125rem",
        }}
      >
        {item.text}
      </Typography>
    </TestimonialCard>
  );

  return (
    <StyledSection>
      <StyledContainer>
        {mounted ? (
          <Swiper
            key={i18n.language}
            dir={isRTL ? "rtl" : "ltr"}
            modules={[Pagination]}
            pagination={{ clickable: true }}
            loop={true}
            className="testimonial-swiper"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                {renderTestimonialContent(item)}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          renderTestimonialContent(testimonials[0])
        )}
      </StyledContainer>
    </StyledSection>
  );
};

export default Testimonials;