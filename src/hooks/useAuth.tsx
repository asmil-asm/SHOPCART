import {logout} from '@store/Auth/LoginSlice'
import { useAppDispatch} from '@store/Hooks'
const useAuth = () => {
 
    const dispatch=useAppDispatch()
    const handleLogout=()=>{
        dispatch(logout())
    }
    
return{handleLogout}
}

export default useAuth