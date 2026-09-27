import pleaseWaiting from '@assets/Lottie/pleaseWait.json'
import { Lottie } from 'lottie-react'
const Waiting = () => {
  return (
  <div>
        <Lottie 
        src={pleaseWaiting}
        loop
        autoplay
        style={{width:'200px', height:"200px"}}
        />
    </div>  )
}

export default Waiting