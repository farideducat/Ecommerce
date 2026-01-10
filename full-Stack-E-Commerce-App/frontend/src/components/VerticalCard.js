import React, { useContext } from 'react'
import scrollTop from '../helper/scrollTop'
import DisplayOmrCurrency from '../helper/DisplayCurrency'
import Context from '../context'
import AddToCart from '../helper/AddToCart'
import { Link } from 'react-router-dom'

const VerticalCard = ({loading, data = []}) => {
       const loadingList = new Array(13).fill(null)

        const {fetchUserAddToCart} =  useContext(Context)

         const handleAddToCart = async(e,id) =>{
         await AddToCart(e,id)
         fetchUserAddToCart()
  }
  return (
   <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-center  md:justify-between md:gap-6 overflow-x-scroll  scroll-smooth scrollbar-none transition-all">
            {           
               loading ? (
                loadingList.map((product,index) =>{
            return(
                 <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                     <div className="bg-slate-200 h-44 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse">
                      
                      
                 </div>
                   
                 <div  className='p-4 grid gap-3'>
                        <h2 className='font-bold text-base md:text-lg text-ellipsis line-clamp-2 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                        <p className='capitalize text-slate-500  p-1 py-2 animate-pulse rounded-full bg-slate-200'></p>

                         <div className=' flex gap-3'>
                          <p className='text-lg text-red-600 font-bold  p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full'></p>
                          <p className='line-through text-sm text-slate-500  p- py-2 animate-pulse rounded-full bg-slate-200 w-full'></p>
                         </div>
                        <button className='text-sm  text-white hover:bg-slate-600 px-3 py-2 p-1 animate-pulse rounded-full bg-slate-200'></button>
                 </div>
               </div>
           )
          })
               ) : (
                 data.map((product,index) =>{
                   return(
                 <Link to={"/product/"+product?._id} className='w-full min-w-[160px]  md:min-w-[180px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' onClick={scrollTop}>
                     <div className="bg-slate-200 h-[160px]  p-2 min-w-[160px] md:min-w-[180px] flex  items-center justify-center">
                      <img src={product?.productImage[0]} className='object-contain w-full h-full hover:scale-110 transition-all mix-blend-multiply'/>
                    </div>       
                 <div  className='p-4 grid gap-3'>
                        <h2 className='font-bold text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                        <p className='capitalize text-slate-500'>{product?.category}</p>

                         <div className='gap-3'>
                          <p className='text-lg text-red-600 font-bold'>{ DisplayOmrCurrency(product?.sellingPrice)}</p>
                          <p className='line-through text-sm text-slate-500 '>{DisplayOmrCurrency(product?.price)}</p>
                         </div>
                        <button className='text-sm bg-black text-white hover:bg-slate-600 px-3 py-0.5 rounded-lg' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                 </div>
               </Link>
           )
          })  
               )

             
          
         }
       </div>
  )
}

export default VerticalCard