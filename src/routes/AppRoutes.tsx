import { lazy} from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoadingPage from "@components/feedback/Animation/LoadingPage";
import ProtectedRoute from "./ProtectedRoute";
const MainLayout = lazy(() => import("@layouts/MainLayouts/MainLayouts"));
const Home       = lazy(() => import("@pages/Home/Home"));
const About      = lazy(() => import("@pages/About/About"));
const Products   = lazy(() => import("@pages/Products/Products"));
const Contact    = lazy(() => import("@pages/Contact/Contact"));
const Blog       = lazy(() => import("@pages/Blog/Blog"));
const Login      = lazy(() => import("@pages/Login/Login"));
const Register   = lazy(() => import("@pages/Register/Register"));
const Error      = lazy(() => import("@pages/Error/Error"));
const Cart       = lazy(() => import("@pages/Cart/Cart"));
const Favorite   = lazy(() => import("@pages/Favorite/Favorite"));
const ProductsDetalis=lazy(()=>import("@pages/ProductsDetalis/ProductsDetalis"))
const Checkout=lazy(()=>import("@pages/Checkout/Checkout"))
const HelpCenter=lazy(()=>import ("@pages/HelpCenter/HelpCenter"))
const Profile=lazy(()=>import("@pages/Profile/Profile"))
const PrivacyPolicy=lazy(()=>import('@pages/privacyPolicy/privacyPolicy'))
const SearchPage=lazy(()=>import('@pages/SearchPage/SearchPage'))

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoadingPage>
        <MainLayout />
      </LoadingPage>
    ),
    errorElement: (
      <LoadingPage>
        <Error />
      </LoadingPage>
    ),
    children: [
      { index: true,          element: <Home /> },
      { path: "about",        element: <About /> },
      { path: "blog",         element: <Blog /> },
      { path: "contact",      element: <Contact /> },
      { path: "products",     element: <Products /> },
      { path: "products/:id",     element: <ProductsDetalis /> },
      { path: "cart",         element: <Cart /> },
      { path: "favorite",     element: <Favorite /> },
      { path: "*",            element: <Error /> },
      { path: "checkout",            element: <ProtectedRoute><Checkout/></ProtectedRoute> },
{path:'help-center',element:<HelpCenter/>},
{path:'profile', element:<ProtectedRoute><Profile/></ProtectedRoute>},
{path:'privacy-policy', element:<PrivacyPolicy/>},
{path:'search',element:<SearchPage/>}
    ],

  },
    { path: "/login",    element: <Login /> },
{ path: "/register", element: <Register /> },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;