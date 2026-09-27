import {z} from 'zod'
const vaildationChechInfo=z.object({
     firstName:z.string().min(4,{message:'First Name is required'}),
     lastName:z.string().min(1,{message:'Last Name is required'}),
     email:z.string().min(1,{message:'email is required'}).email(),
     phone:z.string().min(4,{message:'phone is required'}),
     city:z.string().min(1,{message:'city is required'}),
    address:z.string().min(4,{message:'address is required'}),
notes:z.string()

})
type stateCheckInfo=z.infer<typeof vaildationChechInfo>
export{ vaildationChechInfo , type stateCheckInfo}