import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import logo from '@assets/logo.jpg'
import { useAppSelector } from '@store/Hooks';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './Header.css'
import { useTranslation } from 'react-i18next';

export default function BottomHeader() {
  const navigate=useNavigate()
    useState<null | HTMLElement>(null);
const {user}=useAppSelector(state=>state.login)
const {i18n}=useTranslation()

  const menuId = 'primary-search-account-menu';
 

 
const{items}=useAppSelector(state=>state.cart)
const {favorite}=useAppSelector(state=>state.favorite)

  return (
     <>
        <Toolbar className='bottom-header'>
         
          <Link  to="/"><img style={{margin:'0 5px'}} src={logo} alt="logo" className='logo'/></Link>
         
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
           <Link to="/cart" style={{textDecoration:'none', color:'inherit'}}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={items.length} color="error">
                <ShoppingCartIcon/>
              </Badge>
            </IconButton>
           </Link>
                      <Link to="/favorite" style={{textDecoration:'none', color:'inherit'}}>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={favorite.length} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
                 </Link>

          {user &&   <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={()=>navigate('/profile')}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>}
          </Box>
         
        </Toolbar>
     </>
     
  );
}
