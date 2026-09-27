import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import './Navbar.css';
import { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {  useAppSelector } from '@store/Hooks';
import { useNavigate } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import Search from '../Search/Search';
import { useTranslation } from 'react-i18next'; 
function Navbar() {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const { token } = useAppSelector(state => state.login);

  const { t } = useTranslation(); 
  const pages = [
    { page: t('nav.home'), link: '/' },
    { page: t('nav.products'), link: 'products' },
    { page: t('nav.about'), link: 'about' },
    { page: t('nav.blog'), link: 'blog' },
    { page: t('nav.contact'), link: 'contact' },
  ];
  
  const [show,setShow]=useState(false)
  useEffect(()=>{
      const handleShow=()=>setShow(window.scrollY >100);
      
      window.addEventListener('scroll',handleShow)
      handleShow()
      return(()=>window.removeEventListener('scroll',handleShow)
)
  },[])
  

  return (
    <nav className={`nav ${show? 'nav-active':''}`} >
      <Toolbar sx={{ display: { xs: 'none', md: 'flex' } }} disableGutters className='navbar'>
        <Search />

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {pages.map((page, index) => (
            <Button
              className='link'
              component={NavLink}
              to={page.link}
              key={index}
            >
              {page.page}
            </Button>
          ))}
        </Box>

        {token === null ? (
          <Box sx={{ display: 'flex' }}>
            <Button onClick={() => navigate('./login')} sx={{ fontWeight: '700' }}>
              {t('nav.login')}
            </Button>
            <Button onClick={() => navigate('./register')} sx={{ fontWeight: '700' }}>
              {t('nav.register')}
            </Button>
          </Box>
        ) : (
          <Button
            onClick={() => {
              navigate('/login');
              handleLogout();
            }}
            sx={{ fontWeight: '700' }}
          >
            {t('nav.logout')}
          </Button>
        )}
      </Toolbar>
    </nav>
  );
}

export default Navbar;