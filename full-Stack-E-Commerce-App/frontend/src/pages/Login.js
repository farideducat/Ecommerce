import React, { useContext, useState } from 'react'
import loginicons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa"; 
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [data,setData] = useState({
      email: "",
      password: ""
    })
      
    const navigate = useNavigate()
    const {fetchUserDetails,fetchUserAddToCart} =  useContext(Context)


    const HandleOnChange = (e) => {
     const {name, value} = e.target
     setData((prev) => {
      return{
        ...prev,
        [name] : value
       }
      })
    }
         

    const handleSubmit = async(e) => {
          e.preventDefault()
          

       const dataResponse = await fetch(summaryApi.signin.url,{
          method: summaryApi.signin.method,
          credentials : "include",
           headers: {
                  "content-type" : "application/json"
                },
               body: JSON.stringify(data)
       })

       const dataApi = await dataResponse.json()

            if(dataApi.success){
             toast.success(dataApi.message)
             navigate('/')
             fetchUserDetails()
             fetchUserAddToCart()
            } 
             
         if(dataApi.error){
        toast.error(dataApi.message)
         }
          

    }
  

  return (
    <section id='login'>
      <div className='mx-auto container px-4'>

          <div className='bg-white p-2 w-full py-4 max-w-sm mx-auto'>

             <div className='w-20 h-20 mx-auto'>
                <img src={loginicons} alt='login icons'/>
             </div>

            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
                <label>Email:  </label>
               <div className='bg-slate-100 p-2'>
                   <input type='email'
                    placeholder='Enter Email....' 
                    name='email'
                    value={data.email}
                    onChange={HandleOnChange}
                    className='w-full h-full outline-none  bg-transparent'/>
               </div>
            </div>

             <div>
                <label> Password:  </label>
              <div className='bg-slate-100 p-2 flex'>
                  <input type={showPassword ? "text" : "password"} 
                  placeholder='Enter Password....'
                  value={data.password}
                  name='password'
                   onChange={HandleOnChange}
                  className='w-full h-full outline-none bg-transparent'/>
               <div className='cursor-pointer text-2xl' onClick={()=>setShowPassword((prev)=>!prev)}>
                <span>
                 {
                    showPassword ? (
                        <FaEyeSlash/>
                     )
                     :
                     (
                       <FaEye/> 
                     )
                  
                  
                 }
                </span>
               </div>
              </div>
                  <Link to={'/forgot-password'} className=' block w-fit ml-auto hover:underline hover:text-red-600'>
                  ForgotPassword?
                  </Link>
           
             </div>
              
             <button className='bg-red-600 text-white px-4  py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4 hover:bg-black'> 
               Login
             </button>
          </form>

            <p className='my-4'>Don't Have Account? <Link to={'/sign-up'} className='text-red-400 hover:text-red-700 underline'>
            Sign Up New</Link> </p>
          </div>

      </div>
    </section>
  )
}

export default Login