import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PaymentIcon from '@mui/icons-material/Payment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Icon from '@mui/material/Icon';
import { useTranslation } from 'react-i18next';

function Features() {
  const { t } = useTranslation();

  const cards = [
    {
      id: 1,
      title: t('features.fastDelivery'),
      description: t('features.fastDeliveryDesc'),
      icon: <AllInboxIcon />,
    },
    {
      id: 2,
      title: t('features.return24'),
      description: t('features.return24Desc'),
      icon: <QueryBuilderIcon />,
    },
    {
      id: 3,
      title: t('features.securePayment'),
      description: t('features.securePaymentDesc'),
      icon: <PaymentIcon />,
    },
    {
      id: 4,
      title: t('features.support247'),
      description: t('features.support247Desc'),
      icon: <SupportAgentIcon />,
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(270px, 100%), 1fr))',
        gap: 10,
        margin: '30px auto',
      }}
    >
      {cards.map((card) => (
        <Card key={card.id} sx={{ boxShadow: '0px 1px 2px 0px #b9bfc6 ' ,}}>
          <CardActionArea sx={{ height: '100%',cursor:"auto" }}>
            <CardContent
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <Icon>{card.icon}</Icon>
              <div>
                <Typography variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {card.description}
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default Features;