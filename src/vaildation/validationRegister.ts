import {z} from 'zod'

 const vaildationForm=z.object({
    firstName:z.string().min(4,{message:'First Name is required'}),
     lastName:z.string().min(1,{message:'Last Name is required'}),
     email:z.string().min(1,{message:'email is required'}).email(),
       password:z.string().min(8,{message:'Password must be at least 8 characters longs'}).regex(
     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
     { message: "Password must contain uppercase, lowercase, number and special character" }
   ),
   confirm:z.string().min(1,{message:'confirm password is required'})
 
 })
 .refine((data)=>data.password === data.confirm,{
     message:'Password and Confirm Password is not match',
     path:["confirm"]
   })
 type stateForm=z.infer<typeof vaildationForm>


export {vaildationForm, type  stateForm}