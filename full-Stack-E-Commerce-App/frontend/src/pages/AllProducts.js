import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/uploadProduct'
import summaryApi from '../common'
import AdminProduct from '../components/AdminProduct'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])


  const fetchAllProduct = async() =>{
     const response = await fetch(summaryApi.allProduct.url)
    
     const dataResponse = await response.json() 
      console.log("response data",dataResponse)

      
     setAllProduct(dataResponse?.data || [])

     }

     

     useEffect(()=>{
          fetchAllProduct()
     },[])
  
  return (
    <div>
      <div className='bg-white py-2 px-5 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
       <button className='border-2 py-1 px-3 border-black text-black hover:bg-gray-700 hover:text-white transition-all rounded-full' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div>

        
         {/** all products*/}
         <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
          {
            allProduct.map((product,index)=>{
              return(
                <AdminProduct data={product} key={index+ "all-product"} fetchdata={fetchAllProduct}/>
               
                  )
            })
          }
         </div>




       {/** upload product component */}
       {
        openUploadProduct && (
            <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchdata={fetchAllProduct}/>
        )   
       }

    </div>
  )
}

export default AllProducts