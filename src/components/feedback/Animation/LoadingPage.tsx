import { Lottie } from 'lottie-react'
import { Suspense } from 'react'
import loading from '@assets/Lottie/loading.json'
const LoadingPage = ({children}:{children:React.ReactNode}) => {
  return (
    <div style={{ 

            minHeight: "100vh",        
            width: "100%",
            margin: "auto",}}>
          <Suspense  fallback={<Lottie src={loading} autoplay loop style={{width:'200px',height:'200px', margin:' 300px auto'}}/>}>
    {children}
</Suspense>
    </div>
  )
}

export default LoadingPage