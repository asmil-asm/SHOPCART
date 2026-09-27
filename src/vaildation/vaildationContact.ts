import {z} from 'zod'
const validationContact=z.object({
    name:z.string().min(2,{message:'name is required'}),
    email:z.string().min(1,{message:'email is required'}).email(),
    message:z.string().min(5,{message:'message is required'})
})
type stateContact=z.infer <typeof validationContact>

export {validationContact,type stateContact}