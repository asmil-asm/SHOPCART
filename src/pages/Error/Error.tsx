import error from '@assets/404.png'
import './Error.css'
import { useNavigate } from 'react-router-dom'
import { useRouteError,isRouteErrorResponse } from 'react-router-dom'
const Error = () => {
    const navigate=useNavigate();
    const errorPage=useRouteError();
    let errorNum:number;
    let erorrText:string
    if(isRouteErrorResponse(errorPage)){
        errorNum=errorPage.status;
        erorrText=errorPage.statusText
    }
    else{
        errorNum=404;
        erorrText="Oops! Page Not Found."
    }
  return (
    <div className='error'>
{
errorNum === 404 ?<><img src={error} alt="Error" />
<h1>Oops! Page Not Found.</h1></>:<><h1>{errorNum}</h1> <p>{erorrText}</p></>

}
<p>The Page You Are Looking For Is Not Available Or Doesn’t Belong This Website!</p>
<button onClick={()=>navigate('/',{replace:true})} >Back To Home</button>

    </div>
  )
}

export default Error