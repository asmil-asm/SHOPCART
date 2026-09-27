// Stats.tsx
import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

// Styled components
const StyledSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(12, 0),
  },
}));

const StyledStatValue = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 600,
  letterSpacing: "-0.025em",
  color: theme.palette.primary.contrastText,
  fontVariantNumeric: "tabular-nums",
  [theme.breakpoints.up("sm")]: {
    fontSize: "3.75rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "4.5rem",
  },
}));

const StyledStatLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  fontWeight: 500,
  letterSpacing: "0.35em",
  color: theme.palette.primary.contrastText,
  opacity: 0.9,
  textTransform: "uppercase",
}));

const StatItemContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  textAlign: "center",
});

const StatsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  width: "100%",
  maxWidth: theme.breakpoints.values.lg,
  margin: "0 auto",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: theme.spacing(3, 4),
  padding: theme.spacing(0, 3),
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: theme.spacing(4),
  },
}));

/** Eases a number from 0 to `target` over `duration` ms once `active` is true. */
function useCountUp(target: number, active: boolean, duration = 2000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

const StatItem = ({ stat, active }: { stat: Stat; active: boolean }) => {
  const value = useCountUp(stat.value, active);
  const { i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");

  const formattedValue = value.toLocaleString(isArabic ? "ar-EG" : "en-US");

  return (
    <StatItemContainer>
      <StyledStatValue variant="h2">
        {formattedValue}
        {stat.suffix}
      </StyledStatValue>
      <StyledStatLabel variant="caption">
        {stat.label}
      </StyledStatLabel>
    </StatItemContainer>
  );
};

const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats: Stat[] = [
    { value: 3070, suffix: "", label: t("stats.totalVendor") },
    { value: 56, suffix: "", label: t("stats.categories") },
    { value: 78, suffix: " m", label: t("stats.monthlyVisitors") },
    { value: 86, suffix: " m", label: t("stats.productSale") },
  ];

  return (
    <StyledSection ref={sectionRef}>
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatItem key={index} stat={stat} active={active} />
        ))}
      </StatsGrid>
    </StyledSection>
  );
};

export default Stats;