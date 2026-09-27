
import Header from "@components/common/Header/Header"
import Navbar from "@components/common/Navbar/Navbar";
import SideBar from "@components/common/SideBar/SideBar"
import Footer from "@components/common/Footer/Footer";
import { useEffect } from "react";
import { ProductAction } from "@store/actions/ProductAction";
import { CategoryAction } from "@store/actions/CategoryAction";
import { useAppDispatch} from "@store/Hooks";
import { Outlet,ScrollRestoration } from "react-router-dom";
import './MainLayouts.css'
import { Toaster } from "react-hot-toast";
import LoadingPage from "@components/feedback/Animation/LoadingPage";
import { CartAction } from "@store/actions/CartAction";
import { FavoriteAction } from "@store/actions/FavoriteAction";
import ButtonUp from "@components/common/ButtonUp/ButtonUp";
const MainLayouts = () => {
  const dispatch=useAppDispatch()
  useEffect(() => {
    dispatch(ProductAction());
  }, [dispatch]);
   useEffect(()=>{
  dispatch(CategoryAction())
},[dispatch])
useEffect(()=>{
  dispatch(CartAction())
  dispatch(FavoriteAction())
},[dispatch])

  return (
    <div className="main">
      <Header/>
      <Navbar/>
      <SideBar/>
      <div className="sections">
        <LoadingPage>
        <Outlet/>
            <ButtonUp/>

        </LoadingPage>
      </div>
      
      <Footer/>
      <ScrollRestoration/>
      <Toaster
  position="bottom-right"
  reverseOrder={false}
/>
    </div>
  );
};

export default MainLayouts;