import { Navigate } from "react-router-dom"
import { useAppSelector } from "@store/Hooks"
const ProtectedRoute = ({children}:{children:React.ReactNode}) => {
 const {user}=useAppSelector(state=>state.login)
 if(!user){
  return  <Navigate to='/login'/>
 }
    return (
    <>
      {children}  
    </>
  )
}

export default ProtectedRoute