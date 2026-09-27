import { useState } from 'react';
import './privacyPolicy.css';

import {
  Container,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Paper,
  Divider,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecurityIcon from '@mui/icons-material/Security';
import DevicesIcon from '@mui/icons-material/Devices';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CookieIcon from '@mui/icons-material/Cookie';
import EmailIcon from '@mui/icons-material/Email';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import { useTranslation } from 'react-i18next';
import PageTransition from '@components/feedback/Animation/PageTransition';

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState<string | false>('info-collection');
  const [hasAccepted, setHasAccepted] = useState(false);
  const [acceptedDate, setAcceptedDate] = useState<string | null>(null);

  const policySections = [
    {
      id: 'info-collection',
      icon: <ShoppingCartIcon sx={{ color: 'var(--main-color)' }} />,
      title: t('privacy.sections.s1.title'),
      content: t('privacy.sections.s1.content'),
    },
    {
      id: 'device-data',
      icon: <DevicesIcon sx={{ color: 'var(--main-color)' }} />,
      title: t('privacy.sections.s2.title'),
      content: t('privacy.sections.s2.content'),
    },
    {
      id: 'cookies-tracking',
      icon: <CookieIcon sx={{ color: 'var(--main-color)' }} />,
      title: t('privacy.sections.s3.title'),
      content: t('privacy.sections.s3.content'),
    },
    {
      id: 'data-security',
      icon: <SecurityIcon sx={{ color: 'var(--main-color)' }} />,
      title: t('privacy.sections.s4.title'),
      content: t('privacy.sections.s4.content'),
    },
    {
      id: 'contact',
      icon: <EmailIcon sx={{ color: 'var(--main-color)' }} />,
      title: t('privacy.sections.s5.title'),
      content: t('privacy.sections.s5.content'),
    },
  ];

  const handleAccordionChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleAcknowledge = () => {
    setHasAccepted(true);
    setAcceptedDate(
      new Date().toLocaleDateString(i18n.language.startsWith('ar') ? 'ar-EG' : 'en-US')
    );
  };

  return (
    <PageTransition>
    <Container maxWidth="md" className="privacy-container">
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <span className="privacy-badge">{t('privacy.badge')}</span>
        <Typography variant="h4" component="h1" className="privacy-header" gutterBottom>
          {t('privacy.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('privacy.lastUpdated')}
        </Typography>
      </Box>

      {/* Acknowledgment Alert */}
      {hasAccepted && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          {t('privacy.acknowledged', { date: acceptedDate })}
        </Alert>
      )}

      {/* Main Content Card */}
      <Paper elevation={0} className="privacy-card" sx={{ p: { xs: 2.5, sm: 4 } }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, mb: 1, color: 'var(--second-color)' }}
          >
            {t('privacy.overviewTitle')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            {t('privacy.overviewText')}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Accordion Sections */}
        <Box sx={{ mb: 3 }}>
          {policySections.map((section) => (
            <Accordion
              key={section.id}
              expanded={expanded === section.id}
              onChange={handleAccordionChange(section.id)}
              className="privacy-accordion"
              elevation={0}
              disableGutters
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'var(--main-color)' }} />}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  {section.icon}
                  <Typography sx={{ fontWeight: 600 }}>{section.title}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {section.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Footer Actions */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {t('privacy.needHelp')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              className="privacy-button-secondary"
              onClick={() => window.print()}
            >
              {t('privacy.printPolicy')}
            </Button>
            <Button
              variant="contained"
              className="privacy-button-primary"
              onClick={handleAcknowledge}
              disabled={hasAccepted}
              startIcon={hasAccepted ? <CheckBoxOutlineBlank /> : null}
            >
              {hasAccepted ? t('privacy.acknowledgedBtn') : t('privacy.acknowledge')}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
    </PageTransition>
  );
}