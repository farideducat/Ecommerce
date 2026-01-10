import React, { useEffect } from 'react'
import { PiUserCircleCheckFill } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
      const user = useSelector(state => state?.user?.user)
      const navigate = useNavigate()

        useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
          navigate("/")
        }
      },[user])

    

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
        <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
          <div className='h-32 flex justify-center items-center flex-col'>
                <div className='text-5xl cursor-pointer relative flex justify-center' >
                        {
                          user?.ProfilePic ? (
                            
                          <img src={ user?.ProfilePic} className='w-20 h-20 rounded-lg' alt={user?.name}/>
                          ) : (
                                <PiUserCircleCheckFill/>
                          )
            
                        }
                </div>
                <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                <p className='text-xs'>{user?.role}</p>
          </div>

           <div>
              <nav className='grid '>
                <Link to={'all-users'} className='px-2  py-2 hover:bg-slate-200'>All Users</Link>
                <Link to={'all-product'} className='px-2  py-2 hover:bg-slate-200'>All Product</Link>
              </nav>
           </div>
        </aside>

        <main className='w-full h-full p-4'>
             <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel