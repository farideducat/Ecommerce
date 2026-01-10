import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import summaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import DisplayOmrCurrency from '../helper/DisplayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import RecommendedProduct from '../components/RecommendedProduct';
import AddToCart from '../helper/AddToCart';
import Context from '../context';


const ProductDetails = () => {

  const [data, setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        sellingPrice : "",
  })

   const params = useParams()
   const [loading, setLoading] = useState(true)
   const productImageListLoading = new Array(4).fill(null)
   const [activeImage, setActiveImage] = useState("")
   const [zoomeImageCoordinate, setZoomeImageCoordinate] = useState({
    x : 0,
    y : 0

   })

   const [zoomImage, setZoomImage] = useState(false)

   const {fetchUserAddToCart} =  useContext(Context)
   const navigate = useNavigate()

    const fetchProductDetails  = async() => {
          setLoading(true)
          const response = await fetch(summaryApi.productDetails.url,{
            method : summaryApi.productDetails.method,
            headers : {
             "content-type" : "application/json"
            },
            body : JSON.stringify({
              productId : params?.id
            })
          })
          setLoading(false)
          const dataResponse = await response.json()

          setData(dataResponse.data)
          setActiveImage(dataResponse?.data?.productImage[0])
         }

      useEffect(()=>{
       fetchProductDetails()
      },[params])


     const HandleMouseEnterProduct = (imageUrl)=>{
       setActiveImage(imageUrl)
     }


     const handleZoomeImage = useCallback((e) => {
      setZoomImage(true)
      const {  left, top, width, height } = e.target.getBoundingClientRect()

      const x  = (e.clientX - left) / width
      const y  = (e.clientY - top) / height

       setZoomeImageCoordinate({
        x,
        y
       })
     },[zoomeImageCoordinate])

     const handleLeaveImageZoome = () =>{
         setZoomImage(false)
     }

       const handleAddToCart = async(e,id)=>{
        await AddToCart(e,id)
        fetchUserAddToCart()
       }

       const handleBuyProduct = async(e,id)=>{
        await AddToCart(e,id)
        fetchUserAddToCart()
        navigate("/cart")
       }


  return (
    <div className='mx-auto p-4'>
        <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4'>

          {/*product image*/} 
            <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

               <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                   <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply cursor-crosshair' onMouseMove={handleZoomeImage} onMouseLeave={handleLeaveImageZoome}/>
                    

                    {/*main product zoomed */}
                    {
                      zoomImage && (
                       <div className='hidden lg:block absolute min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0' >
                       <div
                       className='w-full h-full min-h-[400px] min-w-[500px] bg-no-repeat '
                        style={{
                          backgroundImage : `url(${activeImage})`,
                          backgroundSize : '150%',
                          backgroundPosition : `${zoomeImageCoordinate.x * 100}% ${zoomeImageCoordinate.y * 100}%`
                        }} 
                       >

                       </div>
                   </div>
                      )
                    }
                 

               </div>

                <div className='h-full'>
                     {  loading ? (
                        <div className='flex gap-3 lg:flex-col overflow-scroll scrollbar-none h-full'>
                          {
                             productImageListLoading.map((el,index) => {
                               return ( 
                               <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
                               </div>
                               )
                               })
                              }
                        </div>
                         
                           
                       ) : (
                       <div className='flex gap-3 lg:flex-col overflow-scroll scrollbar-none h-full'>
                             {
                               data?.productImage?.map((imageUrl,index) => {
                               return ( 
                               <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imageUrl}>
                                <img src={imageUrl} className='h-full w-full object-scale-down mix-blend-multiply cursor-pointer' onClick={()=>HandleMouseEnterProduct(imageUrl)}  onMouseEnter={()=>HandleMouseEnterProduct(imageUrl)}/>
                               </div>
                               )
                               })
                              }
                        </div>

                       )
                     }
                </div>


          </div>

           {/*product details*/} 
            {
              loading ? (

             <div className='grid gap-1 w-full lg:h-10'>
             <p className='bg-slate-200 animate-pulse font-bold h-6 lg:h-10 rounded-full inline-block w-full'></p>
             <h2 className='text-3xl lg:text-4xl bg-slate-200 animate-pulse h-6 lg:h-10 font-medium rounded-full '></h2>
             <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] h-6 lg:h-10 rounded-full'></p>

             <div className='text-red-600 flex items-center bg-slate-200 animate-pulse h-6 lg:h-10 rounded-full gap-1'>
            
             </div>
                  

               <div className='flex items-center gap-2 text-1xl lg:text-3xl font-medium my-1 animate-pulse h-6 lg:h-10'>
                <p className='text-black font-bold bg-slate-200  w-full'></p>
                <p className='text-slate-500 line-through bg-slate-200 min-w-full w-full'></p>
               </div>  

                <div className='w-full'>
                 <button className='bg-slate-200 h-6 lg:h-10 animate-pulse rounded-full w-full ' ></button>
                 <button className='bg-slate-200 h-6 lg:h-10 animate-pulse rounded-full w-full' ></button>
               
               </div> 

                <div>
                  <p className='text-slate-600 font-medium my-1 bg-slate-200 h-6 lg:h-10 animate-pulse rounded-full' ></p>
                   <p className='bg-slate-200 h-10 lg:h-12 animate-pulse rounded-full'></p>
                </div>
             </div>

              ) : (

             <div className=' flex flex-col gap-1'>
             <p className='bg-slate-200 text-black font-bold px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
             <h2 className='text-3xl lg:text-4xl font-medium'>{data?.productName}</h2>
             <p className='capitalize text-slate-400'>{data?.category}</p>

             <div className='text-red-600 flex items-center gap-1'>
              <FaStar/> 
              <FaStar/> 
              <FaStar/> 
              <FaStar/>
              <FaStarHalf/> 
             </div>
                  

               <div className='flex items-center gap-3 text-1xl lg:text-3xl font-medium my-1'>
                <p className='text-black font-bold'>{DisplayOmrCurrency(data.sellingPrice)}</p>
                <p className='text-slate-500 line-through'>{DisplayOmrCurrency(data.price)}</p>
               </div>  

                <div className='flex items-center gap-3 my-1'>
                 <button className='border-2 border-black rounded px-3 p-1 hover:bg-slate-300 hover:text-red-600 cursor-pointer min-w-[120px] font-bold bg-black text-white' onClick={(e)=>handleBuyProduct(e,data?._id)} >buy</button>
                 <button className='border-2 border-black rounded px-3 p-1 cursor-pointer min-w-[120px] bg-red-600 text-white hover:bg-white hover:text-red-600 font-bold'  onClick={(e)=>handleAddToCart(e,data?._id)} >Add To Cart</button>
               </div> 

                <div>
                  <p className='text-slate-600 font-medium my-1' >Description</p>
                   <p>{data?.description}</p>
                </div>
             </div>
              )
            }

       </div>
          

          
          {
            data.category && (
              <RecommendedProduct category={data?.category} heading={"Recommended product"}/>
            )
          }
       

    </div>
  )
}

export default ProductDetails