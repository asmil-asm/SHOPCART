import { useForm,type SubmitHandler , FormProvider } from "react-hook-form"
import { zodResolver} from '@hookform/resolvers/zod'
import "./Register.css"
import { vaildationForm, type stateForm } from "@vaildation/validationRegister"  
import Inputs from "@components/forms/Inputs"
import { useAppDispatch ,useAppSelector } from "@store/Hooks"
import { AuthAction } from "@store/actions/AuthAction"
import { useNavigate } from "react-router-dom"
import PageTransition from "@components/feedback/Animation/PageTransition"
const Register = () => {
  const {error,loading}=useAppSelector(state=>state.auth)
 const method=useForm<stateForm>({
  resolver:zodResolver(vaildationForm),
  mode:'onBlur'
 })
 const dispatch=useAppDispatch()
 const navigate=useNavigate()
 const submitForm:SubmitHandler<stateForm>=async(data)=>{
  const result= await dispatch(AuthAction(data))
  if(AuthAction.fulfilled.match(result))
  {
    navigate('/login')
console.log(data)
  }
  
 }
  return (
    <PageTransition>
    <div className="register">
      <h1>Register</h1>
      <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(submitForm)}> 
      <Inputs type='text' title='First Name' name='firstName' />
     <Inputs type='text' title='Lirst Name' name='lastName' />
            <Inputs type='email' title='Email' name='email' />
       <Inputs type='password' title='Password' name='password' />
        <Inputs type='password' title='Confirm Password' name='confirm' />
      <button>{loading === 'pending'?"Loading...": 'Register'}</button>
   </form>
   <div className="content">
    
   <button className="btns" onClick={()=>navigate('/login')}>Sing in</button>
             <button className="btns" onClick={()=>navigate(-1)} >← Back</button>
   </div>

   {error&& <p className="error">{error}</p>}
   </FormProvider>
    </div>
    </PageTransition>
   
  )
}

export default Register