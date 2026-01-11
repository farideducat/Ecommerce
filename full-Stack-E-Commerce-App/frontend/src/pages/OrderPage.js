import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import moment from 'moment'
import DisplayOmrCurrency from '../helper/DisplayCurrency'
const OrderPage = () => {

  const [data,setdata] = useState([])

  const fetchOrderDetails  = async()=>{
    const response = await fetch(summaryApi.getOrder.url,{
      method : summaryApi.getOrder.method,
      credentials : "include"
    })

    const responseData = await response.json()
     setdata(responseData.data)
    console.log("responseData",responseData)
  } 
  useEffect(()=>{
   fetchOrderDetails()
  },[])

  

  return (
    <div>
      {
        !data[0] && (
          <p>No Order Available </p>
        )
      }


      <div className='p-4 w-full'>
        {
          data.map((item,index)=>{
            return(
              <div key={item?.userId+index}>
                  <p className='font-semibold text-lg mb-2'>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  

                    <div className='border-2'>
                          <div className='flex flex-col lg:flex-row justify-between'>
                           <div className='grid gap-1'>
                   {
                    item?.ProductDetails.map((product,index)=>{
                      return(
                        <div key={item?.userId+index} className='flex gap-2 bg-slate-100'>
                          <img
                          src={product?.image[0]}
                          className='w-28 h-28 bg-white object-contain p-2'
                          />
                             
                             <div>
                               <div className='font-medium text-lg  text-ellipsis line-clamp-1 '>{product?.name}</div>
                               <div className='flex items-center gap-5 mt-1'>
                               <div className='text-sm'>{DisplayOmrCurrency(product.price)}</div>
                               <p>quantity: {product.quantity}</p>
                             </div>
                             </div>
                           </div>

                          
                      )
                    })
                   }
                    
                           </div>
                    
                        <div className='flex flex-col gap-4 p-4 min-w-[300px]'>
                          <div>
                          <div className='text-lg font-medium'>Payment Details</div>
                          <p className=' ml-1'>Payment Method : {item.paymentDetails.payment_method_type[0]}</p>
                          <p className=' ml-1'>Payment status : {item.paymentDetails.payment_status}</p>
                          </div>          
                          <div >
                          <div className='text-lg font-medium'>Shipping Details</div> 
                          {
                             item.shipping_options.map((shipping,index)=>{
                              return(
                               <div key={shipping._id} className=' ml-1'>
                                 Shipping Amount : {DisplayOmrCurrency(shipping.shipping_amount)}
                               </div>
                                   )
                                 })
                          }
                         </div>
                        </div>
                        </div>

                          <div className='font-semibold ml-auto w-fit '>
                            <div className='text-xl text-red-600 p-4'> Total Amount + shipping {DisplayOmrCurrency(item.total_amount)}</div>
                         </div>

                    </div>




              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default OrderPage