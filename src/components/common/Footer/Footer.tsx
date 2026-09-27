import './Footer.css';
import { Link } from 'react-router-dom';
import logo from '@assets/logo.jpg';
import { useTranslation } from 'react-i18next'; // <-- أضف

const Footer = () => {
  const { t } = useTranslation(); // <-- أضف

  const links_pages = [
    { title: t('nav.home'), link: '/' },
    { title: t('nav.products'), link: 'products' },
    { title: t('nav.about'), link: 'about' },
    { title: t('nav.blog'), link: 'blog' },
  ];

  const links_help = [
    { title: t('nav.helpCenter'), link: 'help-center' },
    { title: t('nav.privacyPolicy'), link: 'privacy-policy' },
    { title: t('nav.shopping'), link: 'products' },
    { title: t('nav.contact'), link: 'contact' },
  ];

  return (
    <footer>
      <div className="info">
        <div className='title'>
          <img src={logo} alt="logo" />
          <p>{t('footer.description')}</p>
        </div>

        {/* Links */}
        <div className='links'>
          <h3>{t('footer.quickLinks')}</h3>
          <ul>
            {links_pages.map((item, index) => (
              <li key={index}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='links'>
          <h3>{t('footer.customerService')}</h3>
          <ul>
            {links_help.map((item, index) => (
              <li key={index}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='message'>
          <h3>{t('footer.stayUpdated')}</h3>
          <p>{t('footer.subscribeText')}</p>
          <form>
            <input
              type="email"
              placeholder={t('footer.emailPlaceholder')}
            />
            <button>{t('footer.subscribeButton')}</button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <div className="data">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          <div className="links">
            <a href="#">{t('footer.privacyPolicy')}</a>
            <a href="#">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;