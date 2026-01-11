import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { BiSearch } from 'react-icons/bi';
import { PiUserCircleCheckFill } from 'react-icons/pi';
import { FaCartPlus } from "react-icons/fa";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import summaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';




const Header = () => {


  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const naigate = useNavigate()
  const searchInput = useLocation()
  const params = new URLSearchParams(searchInput.search)
  
  
  const [search, setSearch] = useState(params.getAll("q") || "")




  const HandleLogout = async() => {
    const fetchData = await fetch(summaryApi.logout_user.url,{
      method : summaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

       if(data.success){
          toast.success(data.message)
          dispatch(setUserDetails(null))
          naigate("/")
       }

       if(data.error){
         toast.error(data.message)
       }
  
    }

   const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)
    if(value){
      naigate(`/search?q=${value}`)
    }else{
      naigate("/search")
    }
   }





  // return (
  //   <header className='h-16 shadow-md bg-white px-4 fixed w-full z-40'>
  //       <div className='h-full container  mx-auto flex items-center px-4 justify-center object-scale-down'>
  //        <div className='flex-shrink-0'>
  //           <Link to={"/"}>
  //           <Logo w={180} h={50}  />
  //           </Link>
  //        </div>

  //        <div className='hidden lg:flex items-center w-full max-w-2xl border-2 border-black rounded-full overflow-hidden'>
  //           <input type='text' placeholder=' Search Product Here .....' className='w-full outline-none ' onChange={handleSearch} value={search}/>
  //           <div className='text-lg min-w-[50px] h-8 bg-black flex items-center justify-center rounded-r-full text-white hover:bg-gray-400'>
  //              <BiSearch/>
  //           </div>
  //        </div>

  //        <div className='flex justify-between '>

  //          <div className='relative flex justify-center'> 
  //               {
  //                 user?._id && (
  //                   <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(prev => !prev)}>
  //                        {
  //             user?.ProfilePic ? (
  //               <img src={ user?.ProfilePic} className='w-10 h-10 rounded-lg' alt={user?.name}/>
  //             ) : (
  //                   <PiUserCircleCheckFill/>
  //                         )

  //                     }
  //                </div>
  //                 )
  //               }

  //             {
  //               menuDisplay && (
  //            <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded '> 
  //            <nav>
  //             {
  //               user?.role === ROLE.ADMIN && (
  //                 <Link to={"/admin-panel/all-product"} className='whitespace-nowrap hidden md:block hover:bg-slate-200 p-2'  onClick={()=>setMenuDisplay(prev => !prev)}>Admin Panel</Link>
  //               )
  //             }
             
  //            </nav>
  //             </div> 
  //               )
  //             }
          
  //          </div>
         
  //           {        
  //           user?._id && (
  //                <Link to={"/cart"} className='text-2xl relative '>
  //                    <span>  <FaCartPlus /> </span>         
  //                    <div className='bg-red-600 text-white w-5 p-1 h-5 rounded-full  flex items-center justify-center absolute -top-2 -right-4'>
  //                    <p className='text-sm'>{context?.cartProductCount}</p>
  //                    </div>
                   
  //               </Link>
  //                )
  //             }

  //              <div className='md:ml-6'>
  //           {
  //             user?._id ?
  //             (
  //               <button onClick={HandleLogout} className=' px-2 py-1 rounded-full bg-red-600 text-white hover:bg-black'>Logout</button>
  //              ) 
  //             : 
  //             (
  //               <Link to={"/login"} className=' px-2 py-1 rounded-full bg-red-600 text-white hover:bg-black'>Login</Link>
  //             )
  //           }
           
  //          </div>

  //        </div>
             
  //       </div>
  //   </header>  
  // )


return (
  <header className='h-16 shadow-md bg-white fixed w-full z-40 px-4'>
    <div className='h-full container mx-auto flex items-center justify-between gap-4'>
      
      {/* 1. Logo Section - Stays on the left */}
      <div className='flex-shrink-0'>
        <Link to={"/"}>
          <Logo w={100} h={40} />
        </Link>
      </div>

      {/* 2. Search Section - Takes up middle space */}
      <div className='hidden lg:flex items-center w-full max-w-md border-2 border-black rounded-full overflow-hidden'>
        <input 
          type='text' 
          placeholder='Search Product Here...' 
          className='w-full outline-none px-4 py-1' 
          onChange={handleSearch} 
          value={search}
        />
        <div className='text-lg min-w-[50px] h-8 bg-black flex items-center justify-center text-white hover:bg-gray-400 cursor-pointer'>
          <BiSearch/>
        </div>
      </div>

      {/* 3. User Actions Section - Neatly aligned on the right */}
      <div className='flex items-center gap-4 md:gap-6'>
        
        {/* Profile / Menu Toggle */}
        <div className='relative'> 
          {user?._id && (
            <div className='text-3xl cursor-pointer flex items-center' onClick={() => setMenuDisplay(prev => !prev)}>
              {user?.ProfilePic ? (
                <img src={user?.ProfilePic} className='w-10 h-10 rounded-full border object-cover' alt={user?.name}/>
              ) : (
                <PiUserCircleCheckFill/>
              )}
            </div>
          )}

          {menuDisplay && (
            <div className='absolute bg-white top-12 right-0 h-fit p-2 shadow-lg rounded border min-w-[150px]'> 
              <nav className='flex flex-col'>
                {user?.role === ROLE.ADMIN && (
                  <Link to={"/admin-panel/all-product"} className='whitespace-nowrap hover:bg-slate-200 p-2 text-sm' onClick={() => setMenuDisplay(false)}>
                    Admin Panel
                  </Link>

                )
                }

                <Link to={"/"} className='whitespace-nowrap hover:bg-slate-200 p-2 text-sm'onClick={() => setMenuDisplay(false)}>
                  Home
                  </Link>

                     <Link to={"/product-category"} className='whitespace-nowrap hover:bg-slate-200 p-2 text-sm'onClick={() => setMenuDisplay(false)}>
                    Category
                  </Link>
                  

                <Link to={"/order"} className='whitespace-nowrap hover:bg-slate-200 p-2 text-sm'onClick={() => setMenuDisplay(false)}>
                   See Order
                  </Link>
              </nav>
            </div> 
          )
          }
        </div>

        {/* Cart Icon */}
        {user?._id && (
          <Link to={"/cart"} className='text-2xl relative'>
            <FaCartPlus />
            <div className='bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-xs font-bold'>{context?.cartProductCount}</p>
            </div>
          </Link>
        )}

        {/* Login/Logout Button */}
        <div>
          {user?._id ? (
            <button onClick={HandleLogout} className='px-4 py-1 rounded-full bg-red-600 text-white hover:bg-black transition-all'>
              Logout
            </button>
          ) : (
            <Link to={"/login"} className='px-4 py-1 rounded-full bg-red-600 text-white hover:bg-black transition-all'>
              Login
            </Link>
          )}
        </div>

      </div>
    </div>
  </header>
)




}

export default Header