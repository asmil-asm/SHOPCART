import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const ButtonUp = () => {
    const handleToUp=()=>{
        window.scrollTo(0,0)
    }
  
  return (
 <IconButton onClick={handleToUp} aria-label="scroll to top" sx={{position:'fixed', right:'10px', bottom:'5px', background:'#d6efe9ee', border:'3px solid var(--main-color)', color:'#333', zIndex:'100', '&:hover':{background:'var(--main-color-hover)'},
    }}>
  <KeyboardArrowUpIcon />
</IconButton > 
 )
}

export default ButtonUp