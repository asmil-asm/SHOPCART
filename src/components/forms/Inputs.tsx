import { useFormContext} from "react-hook-form"
import {  type stateForm } from "@vaildation/validationRegister" 
type inputProp={
name:keyof stateForm 
title:string,
type?:string
}
const Inputs = ({name,title,type='text'}:inputProp) => {
    const {register,formState:{errors},}=useFormContext<stateForm>()
    const error=errors[name]
return(
    <>
<label htmlFor={name}>{title}</label>
{error && <p className="error">{error.message}</p>}
<input type={type} {...register(name)} />
    </>
)
 
  
}

export default Inputs