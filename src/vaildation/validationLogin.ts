import {z} from 'zod'
 const vaildationLogin=z.object({
    email:z.string().min(1,{message:'email is required'}).email(),
       password:z.string().min(8,{message:'Password must be at least 8 characters longs'}).regex(
     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
     { message: "Password must contain uppercase, lowercase, number and special character" }
   ),
})
 type stateLogin=z.infer<typeof vaildationLogin>
 export {vaildationLogin , type stateLogin}
