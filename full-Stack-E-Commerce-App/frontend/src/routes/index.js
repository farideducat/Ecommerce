import { createBrowserRouter } from 'react-router-dom'
import App from "../App"
import Home from "../pages/Home"
import Login from "../pages/Login"
import ForgotPassword from '../pages/ForgotPassword'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cartt from '../pages/Cartt'
import SearchProduct from '../pages/SearchProduct'
import SuccessPayment from '../pages/SuccessPayment'
import CancelPayment from '../pages/CancelPayment'
import OrderPage from '../pages/OrderPage'

const router = createBrowserRouter([
      {  path: "/",
         element: <App/>,
        children:[
            {
              path: "",
              element: <Home/>
            },
            {
              path: "login",
              element: <Login/>
            },

            {
              path: "forgot-password",
              element: <ForgotPassword/>
            },
            {
              path: "sign-up",
              element: <SignUp/>
            },
            {
              path: "product-category",
              element : <CategoryProduct/>
            },
            {
              path: "product/:id",
              element : <ProductDetails/>
            },
            {
              path: "cart",
              element : <Cartt/>
            },
            {
              path: "success",
              element : <SuccessPayment/>
            },
            {
              path: "cancel",
              element : <CancelPayment/>
            },
            {
              path : "order",
              element : <OrderPage/>
            },
            {
              path : "search",
              element : <SearchProduct/>,
            },

            {
              path: "admin-panel",
              element: <AdminPanel/>,
              children: [
                    {
                      path: "all-users",
                      element: <AllUsers/>
                    },
                    {
                      path : "all-Product",
                      element: <AllProducts/>
                    },
                 ]
            },
          
        ]
    }
])

export default router