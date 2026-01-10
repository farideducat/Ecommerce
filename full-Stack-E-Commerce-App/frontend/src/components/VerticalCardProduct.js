import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct'
import DisplayOmrCurrency from '../helper/DisplayCurrency'
import { FaAnglesLeft,FaAnglesRight  } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import AddToCart from '../helper/AddToCart';
import Context from '../context';


const VerticalCardProduct = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

      const {fetchUserAddToCart} =  useContext(Context)
    
      const handleAddToCart = async(e,id) =>{
          await AddToCart(e,id)
           fetchUserAddToCart()
      }

     const fetchData = async() => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
          setLoading(false)
            console.log(categoryProduct)
        setData(categoryProduct?.data)

     }
        useEffect(()=>{
           fetchData()
        },[])


        const scrollRight = ()=>{
          scrollElement.current.scrollLeft += 300
        }
        const scrollLeft = ()=>{
          scrollElement.current.scrollLeft -= 300
        }


  return (
    <div className='mx-auto px-4 my-6 relative'>

         <h2 className='text-2xl font-semibold py-4 '>{heading}</h2>
   
       <div className="flex items-center  gap-4 md:gap-6 overflow-x-scroll  scroll-smooth scrollbar-none transition-all" ref={scrollElement }>

          <button  className=' mx-3 cursor-pointer hover:bg-slate-950 hover:text-white bg-white shadow-md rounded-full p-1 absolute left-0 hidden text-lg md:block' onClick={scrollLeft}><FaAnglesLeft/></button>
           <button  className='mx-3 cursor-pointer hover:bg-slate-950 hover:text-white bg-white shadow-md rounded-full p-1 absolute right-0 hidden text-lg md:block' onClick={scrollRight}><FaAnglesRight/> </button>
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
                 <Link to={"product/"+product?._id} className='w-full min-w-[160px]  md:min-w-[180px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                     <div className="bg-slate-200 h-[160px]  p-2 min-w-[160px] md:min-w-[180px] flex  items-center justify-center">
                      <img src={product.productImage[0]} className='object-contain w-full h-full hover:scale-110 transition-all mix-blend-multiply'/>
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
         

       
    </div>
  )
}

export default VerticalCardProduct