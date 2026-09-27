import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase } from '@mui/material';
import useFilter from '@hooks/useFilter';
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const Search = () => {
  const { handleSearch,term } = useFilter();
  const {t}=useTranslation()
const navigate=useNavigate()
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'white',
        border: '1px solid var(--main-color)',
        borderRadius: '20px',
        padding: '4px 12px',
        marginRight: 2,
        marginLeft: 3,
        width: 'auto',
      }}
    >
      <SearchIcon sx={{ color: '#0965d0', marginRight: 1 }} />
      <InputBase
      value={term}
        placeholder={t('nav.Search')}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => 
            handleSearch(e.target.value)
        }
        sx={{
          color: '#0965d0',
          width: '20ch',
        }}


      />
      {term && (
        <CloseIcon
          onClick={() =>{
            handleSearch("")
            navigate('/')
          }}
          sx={{ color: "#0965d0", cursor: "pointer", fontSize: 18, ml: 1 }}
        />
      )}
    </Box>
  );
};

export default Search;