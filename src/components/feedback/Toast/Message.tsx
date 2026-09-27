import { useAppSelector } from "@store/Hooks"
import { useNavigate } from "react-router-dom"
import './Message.css'
import { useTranslation } from "react-i18next"
const Message = ({id,title,path}:{id:any,title:string,path:any}) => {
    const {records}=useAppSelector(state=>state.products)
    const item=records.find((i)=>i.id === id)
    const navigate=useNavigate()
    const {t}=useTranslation()
  return (
    <div className='message'>
            <div className="text">
              <p className="title">{title}</p>
                <img src={`http://localhost:1337${item?.product.url}`} alt={item?.title_en} />
                <p>{item?.title_en}</p>
                
                <button onClick={()=>navigate(path)}>{t('cart.headers.view')}</button>
            </div>
        </div>
  )
}

export default Message