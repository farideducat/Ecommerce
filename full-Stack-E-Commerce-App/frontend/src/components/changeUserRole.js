import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import summaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole, setUserRole] = useState(role)

    const handleOnChangeSelect =(e) =>{
       setUserRole(e.target.value)
        console.log(e.target.value)
    }

    const updateUserRole = async() => {
              const fetchResponse = await fetch(summaryApi.updateUser.url,{
                method: summaryApi.updateUser.method,
                credentials:'include',
                headers: {
                    "content-type" : "application/json"
                },
                body :JSON.stringify({ 
                    role: userRole,
                    userId : userId
                })
              }) 

              const responseData = await fetchResponse.json()

              if(responseData.success){
                toast.success(responseData.message)
                onClose()
                callFunc()
              } 
              
              console.log("check udated",responseData)
    }

  return (
    <div className='fixed top-0  left-0 right-0 bottom-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
        <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

           <button className='block ml-auto' onClick={onClose}>
             <IoMdClose/>
           </button>

           <h2 className='pb-4 text-lg font-medium'> Change User Role </h2>

           <p>Name:{name}</p>
           <p>Email:{email}</p>

           <div className='flex items-center justify-between my-4'> 
                <p>role:</p>
                  <select className='border px-4 py-2 ' value={userRole} onChange={handleOnChangeSelect}>
                  {
                    Object.values(ROLE).map(el =>{
                      return(
                          <option value={el} key={el}>{el}</option>
                      )
                    })
                  }
               
             </select>
           </div>
            
            <button className='w-fit mx-auto block border py-1 px-3 rounded-full bg-black text-white hover:bg-gray-600' onClick={updateUserRole}>Change</button>
        </div>
    </div>
  )
}

export default ChangeUserRole