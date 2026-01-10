import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import summaryApi from '../common'
import Context from '../context'
import DisplayOmrCurrency from '../helper/DisplayCurrency'
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';

const Cartt = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
      const context = useContext(Context)
      const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async()=>{
        const response = await fetch(summaryApi.addToCartProductView.url,{
            method : summaryApi.addToCartProductView.method,
            credentials: "include",
            headers : {
                "content-type" : "application/json"
            },
        })
        const responseData = await response.json()
        if(responseData.success){
          setData(responseData.data)
        }
    }

    const handleLoading = async()=>{
         await fetchData()
    }

    useEffect(() => {
          setLoading(true)
          handleLoading()
          setLoading(false)
    },[])

    const increaseQty = async(id,qty) => {
           const response = await fetch(summaryApi.updateCartProduct.url,{
            method : summaryApi.updateCartProduct.method,
            credentials : "include",
            headers : {
              "content-type" : "application/json"
            },
            body : JSON.stringify(
             {
              _id: id,
              quantity : qty + 1
             }
          ) 
       })
     const responseData = await response.json()
     if(responseData.success){
         if (responseData.success) {
                fetchData()
                context.fetchUserAddToCart()
            }

     }
    }



      const decreaseQty = async(id,qty) => {
           if(qty >= 2){
            const response = await fetch(summaryApi.updateCartProduct.url,{
            method : summaryApi.updateCartProduct.method,
            credentials : "include",
            headers : {
              "content-type" : "application/json"
            },
            body : JSON.stringify(
             {
              _id: id,
              quantity : qty - 1
             }
          ) 
       })
     const responseData = await response.json()
     if(responseData.success){
         if (responseData.success) {
                fetchData()
                context.fetchUserAddToCart()
            }
         }
      }        
    }

    const deleteCartProduct = async(id)=>{
         const response = await fetch(summaryApi.deleteCartProduct.url,{
            method : summaryApi.deleteCartProduct.method,
            credentials : "include",
            headers : {
              "content-type" : "application/json"
            },
            body : JSON.stringify(
             {
              _id: id,
             }
          ) 
       })
     const responseData = await response.json()

     if(responseData.success){
         if (responseData.success) {
                fetchData()
                context.fetchUserAddToCart()
            }
         }
    }

     const handlePayment = async()=>{
        const response = await fetch(summaryApi.payment.url,{
            method : summaryApi.payment.method,
            credentials: 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
              cartItems : data
            })
        })
        const responseData = await response.json()
        console.log("response data",responseData)

        if (responseData.url) {
         window.location.href = responseData.url
            }

     }


    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
    const totaPrice = data.reduce((prev,curr)=> prev + (curr?.quantity * curr?.productId?.sellingPrice),0)
  return (
    <div className='mx-auto'>
        <div className="text-center text-lg my-3">
            {
                data.length === 0 && !loading && (
                <p className='bg-white py-5 '>Cart Empty.</p>
                )
             }
        </div>

          <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'> 
                {/*view product*/}
                <div className='w-full max-w-3xl'>
                     {
                        loading ? (
                            loadingCart.map((el,index)=> {
                                 return(
                                         <div key={el+"Cart Product Loading"+index} className='w-full bg-slate-300 h-36 my-2 ml-4 border-slate-200 animate-pulse rounded'>

                                        </div>
                                      )
                                   })

                                ) :(
                                      data.map((product,index)=>{
                                          return(
                                            <div key={product?._id+"Add To Cart Product Lading"} className='w-full bg-white h-36 my-1 m-1 border-slate-200  rounded grid grid-cols-[128px,1fr]'>
                                                <div className='w-32 h-36 bg-slate-200'>
                                                    <img src={product?.productId.productImage[0]} className='h-full w-full object-contain mix-blend-multiply'/>
                                                    </div>
                                              <div className='px-4 py-2 relative'>
                                                {/*delete product*/}
                                                <div className='absolute right-0 top-0 bg-slate-100 text-black rounded-full p-2 hover:bg-black hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                                    <MdDelete/>
                                                  </div>

                                                 <h2 className='text-lg text-ellipsis line-clamp-1 capitalize'>{product?.productId?.productName}</h2>
                                                 <p className='capitalize text-slate-500'>{product?.productId?.category}</p> 
                        <div className='flex items-center justify-between'>
                           <p className='text-black font-medium text-lg '>{DisplayOmrCurrency(product?.productId?.sellingPrice)}</p>
                           <p className='text-slate-600 font-semibold text-lg '>{DisplayOmrCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                        </div>
                                                  <div className='flex items-center gap-3 my-2'>
                                                     <button className=' border border-black text-black hover:bg-slate-800 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                                                     <span>{product?.quantity}</span>
                                                     <button className=' border border-black text-black hover:bg-slate-800 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                                 </div>   
                                              </div>   
                                            </div>
                                          )
                                      })
                        )
                     }

                </div>
        
                                       
                   {/*summary product*/}
                   {
                    data[0] && (
                        <div className='mt-5 lg:mt-0 w-full my-2 mr-4 max-w-sm'>
                           {
                            loading ? 
                            (
                            <div className='h-36 bg-slate-200 border-slate-300 animate-pulse'>
                                      
                            </div>            
                             ) : 
                             (
                                  <div className='h-40 bg-slate-200'>
                                       <h2 className='text-white bg-slate-700 px-4 py-2'>Summary</h2>
                                       <div className='flex  items-center justify-between p-4 gap-2 font-medium text-slate-900'>
                                         <p className='bg-white pl-2 w-full'>Quantity : </p>
                                         <p className='bg-white px-4'>{totalQty}</p>
                                       </div>

                                       <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-900'>
                                        <p className='bg-white pl-2 w-full'>Total Price</p>
                                        <p className='bg-white px-4'>{DisplayOmrCurrency(totaPrice)}</p>
                                       </div>

                                       <div>
                                         <button className='bg-orange-600 p-2 text-white w-full mt-3' onClick={handlePayment}>Proceed To Checkout</button>
                                       </div>
                                  </div>
                             )
                               }
                     </div>
                    )
                   }
                    
                   </div>
                 </div>
                )
             }

export default Cartt