import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './home/home'
import Productall from './showproduct/showproduct'
import Login from './login/loginnew'
import Profile from './pages/Profile'
import Editpage from './pages/EditPage'
import Purchasepage from './pages/PurchasePage'
import Topup from './pages/TopupPage'
import Product from './showproduct/product'
import Cart from './pages/CartPage'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/allproduct",
    element: <Productall />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/edit",
    element: <Editpage />,
  },
  {
    path: "/historybuy",
    element: <Purchasepage />,
  },
  {
    path: "/topup",
    element: <Topup />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
