import Heart from '@assets/Lottie/Heartlike.json'
import { Lottie } from 'lottie-react'
const HeartEmpty = () => {
  return (
    <div>
        <Lottie 
        src={Heart}
        loop
        autoplay
        style={{width:'500px', height:"500px"}}
        />
    </div>
  )
}

export default HeartEmpty