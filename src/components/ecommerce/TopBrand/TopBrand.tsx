import { useEffect } from "react"
import { TopBrandAction } from "@store/actions/TopBrandActions"
import { useAppDispatch } from "@store/Hooks"
import { useAppSelector } from "@store/Hooks"
import Waiting from "@components/feedback/Animation/Waiting"
import './TopBrand.css'
const TopBrand = () => {
    const dispatch=useAppDispatch();
    const {records}=useAppSelector((state)=>state.top_brand)
    useEffect(()=>{
dispatch(TopBrandAction())
    },[dispatch])
  return (
   <section className="brands" >
    <h1>Top Brand</h1>
    {records.length > 0 ?(
        <div className="top-brand">
    {records.map((brand:any)=>(
    <div className="brand" key={brand.id}>
<img src={`http://localhost:1337${brand.brand.url}`} alt="brand" />
    </div>
))}
</div>
    ):(<Waiting/>)}

   </section>
  )
}

export default TopBrand