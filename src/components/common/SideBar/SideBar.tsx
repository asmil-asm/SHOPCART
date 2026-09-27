import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { Button, Divider, IconButton, Stack } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@store/Hooks';
import useAuth from '@hooks/useAuth';

import './SideBar.css'

export default function SideBar() {
  const [open, setOpen] = useState(false);
const {t ,i18n}=useTranslation()
  const navigate = useNavigate();
    const { handleLogout } = useAuth();
  
const isRtl = i18n.dir() === 'rtl';

  const { items } = useAppSelector((state) => state.cart);
  const { favorite } = useAppSelector((state) => state.favorite);
  const { user } = useAppSelector((state) => state.login);

  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);
  const closeDrawer = () => setOpen(false);
  const handleLangauge=(event:any)=>{
    i18n.changeLanguage(event.target.value)
  }
  const pages = [
    { title: t('nav.home'), link: '/' },
    { title: t('nav.about'), link: '/about' },
    { title: t('nav.products'), link: '/products' },
    { title: t('nav.blog'), link: '/blog' },
    { title: t('nav.contact'), link: '/contact' },
  ];

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="presentation"
    >
      <Box
        className="title-sideBar"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1,
        }}
      >
 <select value={i18n.language} onChange={handleLangauge}>
          <option value="en">{t('language.en')}</option>
        <option value="ar">{t('language.ar')}</option>

         </select>      
           <IconButton aria-label="close" onClick={closeDrawer}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <Stack
        direction="row"
        spacing={1}
        sx={{
          p: 1.5,
          justifyContent: 'center',
          alignItems: 'center',
          color: 'var(--main-color)'
        }}
      >
        <IconButton
          component={Link}
          to="/cart"
          onClick={closeDrawer}
          color="inherit"
          aria-label="cart"
        >
          <Badge badgeContent={items.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        <IconButton
          component={Link}
          to="/favorite"
          onClick={closeDrawer}
          color="inherit"
          aria-label="favorites"
        >
          <Badge badgeContent={favorite.length} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>

        {user &&   (
          <IconButton
            color="inherit"
            aria-label="account"
            onClick={() => {
              closeDrawer();
              navigate('/profile');
            }}
          >
            <AccountCircle />
          </IconButton>
        )}
      </Stack>

      <Divider />

      <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {pages.map((item) => (
          <ListItem sx={{ color: '#127fff' }} key={item.link} disablePadding>
            <ListItemButton
              component={Link}
              to={item.link}
              onClick={closeDrawer}
              sx={{ borderBlockEnd: '1px solid #127fff' }}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
{user ? <Button sx={{margin:'20px 5px'}} className='button-actions' onClick={handleLogout}>{t('nav.logout')}</Button> :
<Stack  direction='row' sx={{justifyContent:'space-between', alignItems:'center', margin:'20px 5px'}}>
  <Button className='button-actions' onClick={()=>navigate('/login')}>{t('nav.login')}</Button>
    <Button className='button-actions' onClick={()=>navigate('register')}>{t('nav.register')}</Button>

  </Stack>}
      </List>
    </Box>
  );

  return (
    <Box >
    <Stack direction='row'>  
      <IconButton
        onClick={toggleDrawer(true)}
        aria-label="open menu"
        sx={{
      display: { xs: 'block', md: 'none' },
  color: '#022144',
  position: 'absolute',
  right: isRtl ? 'auto' : 30,
  left: isRtl ? 30 : 'auto',
  top: 20,
        }}
      >
        <MenuOpenIcon sx={{ fontSize: 25 }} />
      </IconButton>
 
          </Stack>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  );
}