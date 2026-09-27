import {z} from 'zod'
const vaildationAddress=z.object({
    place:z.string().min(1,{message:'place is required'}),
    city:z.string().min(1,{message:'city is required'}),
    address:z.string().min(4,{message:'address is required'})
})
type stateAddress=z.infer <typeof vaildationAddress>
export {vaildationAddress, type stateAddress}