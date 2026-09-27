import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import './Header.css'

export default function TopHeader() {
  const {t ,i18n}=useTranslation()
  const handleLangauge=(event:any)=>{
    i18n.changeLanguage(event.target.value)
  }

  return (
        <Toolbar className='top-header'    sx={{display:{xs:'none',md:'flex' }}}   >
         
          <Typography  variant="h6" component="p" >
        {t('welcome')}

          </Typography>
         <select value={i18n.language} onChange={handleLangauge}>
          <option value="en">{t('language.en')}</option>
        <option value="ar">{t('language.ar')}</option>

         </select>
        </Toolbar>
  );
}
