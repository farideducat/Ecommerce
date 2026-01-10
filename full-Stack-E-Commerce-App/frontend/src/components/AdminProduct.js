import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import DisplayOmrCurrency from '../helper/DisplayCurrency';

const AdminProduct = ({
    
    data,
    fetchdata
}) => {
    const [ediitProduct,setEditProduct] = useState(false)

  return (
  
     <div className='bg-white p-4 rounded'>
        <div className='w-40'>

           <div className='w-32 h-32 flex justify-center items-center'>
             <img src={data?.productImage[0]} className=' mx-auto object-fill h-full'/>
           </div>
           
            <h1 className=' text-ellipsis line-clamp-2'>{data.productName}</h1>

              <div> 
                   <p className='font-semibold'>
                      {
                        DisplayOmrCurrency(data.sellingPrice)
                      }
                   
                   </p>
                  <div className='w-fit ml-auto p-2  bg-slate-100 text-black rounded-full hover:bg-black hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                         <MdModeEditOutline/>
                 </div>
              </div>
            {
                ediitProduct &&(
                  <AdminEditProduct ProductData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
                )
            }
  
        </div>
      </div>
  )
}

export default AdminProduct