import React, { useState } from 'react'
import loginicons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa"; 
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import imageTobase64 from '../helper/imageTobase64';






const SignUp = () => {
     const [showPassword,setShowPassword] = useState(false);
     const [showConfirmPassword,setShowConfirmPassword] = useState(false);
        const [data,setData] = useState({
          email: "",
          password: "",
          name: "",
          confirmPassword: "",
          ProfilePic: "",

        })

        const navigate = useNavigate()
    
        const HandleOnChange = (e) => {
         const {name, value} = e.target
         setData((prev) => {
          return{
            ...prev,
            [name] : value
 
           }
          })
        }
             const handleUploadPic = async(e) =>{
              const file = e.target.files[0]
               
              const imagePic = await imageTobase64(file)
             
              setData((prev) => {
                return{
                  ...prev,
                  setData,
                 ProfilePic : imagePic
                }
              })
             }
    
        const handleSubmit = async(e) => {
              e.preventDefault()

              if(data.password === data.confirmPassword){
                const dataResponse =  await fetch(summaryApi.signUP.url,{
                method: summaryApi.signUP.method,
                headers: {
                  "content-type" : "application/json"
                },
                body : JSON.stringify(data)
               })

               const dataApi = await dataResponse.json()

               if(dataApi.success){
                toast.success(dataApi.message)
                navigate("/login")
               }

               if(dataApi.error){
                 toast.error(dataApi.message)
               }
   

              }else{
                toast.error("please check password and confirm password ")
              }
             
           

        }
        
             return (
           <section id='sign-up'>
               <div className='mx-auto container px-4'>

                 <div className='bg-white p-2 w-full py-4 max-w-sm mx-auto '>

             <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                <div>
                  <img src={data.ProfilePic || loginicons} alt='login icons'/>
                </div>

               <form>
                <label>
                 <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                  Upload Photo
                </div>
                  <input type='file' className='hidden' onChange={handleUploadPic}/>
                </label>
               </form>
             </div>

            <form className='pt-6 flex flex-col gap-2 ' onSubmit={handleSubmit}>
               <div className='grid'>
                <label>Name:  </label>
               <div className='bg-slate-100 p-2'>
                   <input type='text'
                    placeholder='Enter Name....' 
                    name='name'
                    value={data.name}
                    onChange={HandleOnChange}
                    required
                    className='w-full h-full outline-none  bg-transparent'/>
               </div>
            </div>

            <div className='grid'>
                <label>Email:  </label>
               <div className='bg-slate-100 p-2'>
                   <input type='email'
                    placeholder='Enter Email....' 
                    name='email'
                    value={data.email}
                    onChange={HandleOnChange}
                    required
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
                   required
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
                 
           
             </div>


             <div>
                <label> Confirm Password:  </label>
              <div className='bg-slate-100 p-2 flex'>
                  <input type={showConfirmPassword ? "text" : "password"} 
                  placeholder='Enter Confirm Password....'
                  value={data.confirmPassword}
                  name='confirmPassword'
                   onChange={HandleOnChange}
                   required
                  className='w-full h-full outline-none bg-transparent'/>
               <div className='cursor-pointer text-2xl' onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                <span>
                 {
                    showConfirmPassword ? (
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
                 
           
             </div>
              
             <button className='bg-red-600 text-white px-4  py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4 hover:bg-black'> 
               SignUp
             </button>
          </form>

            <p className='my-4'>Already Have Account? <Link to={'/login'} className='text-red-400 hover:text-red-700 underline'>
            Login</Link> </p>
          </div>

      </div>
    </section>
  )
}

export default SignUp