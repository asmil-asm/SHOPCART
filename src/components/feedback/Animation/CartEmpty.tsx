import { Lottie} from 'lottie-react'
import emptyCartAnimation from '../../../assets/Lottie/EmptyCart.json'

const CartEmpty = () => {
  return (
   <div style={{margin:'auto'}} >
     <Lottie
      src={emptyCartAnimation}
      loop
      
      autoplay
      style={{ width: 400, height: 400, margin:'auto' }}
    />
   </div>
  )
}

export default CartEmpty