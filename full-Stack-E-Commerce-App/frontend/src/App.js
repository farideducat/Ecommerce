//import logo from './logo.svg';
import { data, Outlet } from 'react-router-dom';
import Header  from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import summaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import css from './App.css';

function App() {
   const disPatch = useDispatch()
   const [cartProductCount, setCartProductCount] = useState(0)
    
const fetchUserDetails = async()=>{
   const dataResponse = await fetch(summaryApi.current_user.url,{
    method : summaryApi.current_user.method,
    credentials : "include"
   })

   const dataApi = await dataResponse.json()
   if (dataApi.success) {
        
        disPatch(setUserDetails(dataApi.data)) 
    }
}


const fetchUserAddToCart = async() => {
   const dataResponse = await fetch(summaryApi.addToCartCount.url,{
    method : summaryApi.addToCartCount.method,
    credentials : "include"
   })

   const dataApi = await dataResponse.json()
   console.log("dataAAApi",dataApi)
   setCartProductCount(dataApi?.data?.count || dataApi?.count || 0 )
}

   useEffect(() =>{
    /** user details **/
     fetchUserDetails()
     
     /** user Add To Cart  details **/
     fetchUserAddToCart()
   },[])

  return (
   <>
     <Context.Provider value={{
         fetchUserDetails, //fetch Ueer Details
         cartProductCount,  //user add to cart details
         fetchUserAddToCart
     }}>
   
       <ToastContainer 
       position='top-center'
       />
       <Header/> 
       <main className='min-h-[calc(100vh-120px)] pt-16'>
        <Outlet/>
       </main>
       <Footer/>
      </Context.Provider>
      </>

  );
}

export default App
