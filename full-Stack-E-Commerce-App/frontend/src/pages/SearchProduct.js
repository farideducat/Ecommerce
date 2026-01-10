import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import summaryApi from '../common'
import VerticalCard from '../components/VerticalCard'


const SearchProduct = () => {
  const query = useLocation()
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(true)
  

  const fetchProduct = async()=>{
    setLoading(true)
    const response = await fetch(summaryApi.searchProduct.url+query.search)
    const dataResponse = await response.json()
    setLoading(false)

   setData(dataResponse.data)
  }

  useEffect(()=>{
      fetchProduct()
  },[query])

  return (
    <div className='mx-auto p-4'>
      {
         loading && (
          <p className='text-lg text-center'>Loading....</p>
         )
      }
     <p className='font-semibold text-lg my-3'>search result : {data.length}</p>
     {
      data.length === 0 && !loading &&(
        <p className='bg-slate-600 text-center text-lg p-4'>No Found Any Product  Frome Your Search : Try Different Product </p>
      )
     }

     {
      data.length !==0 && !loading &&(
            <VerticalCard loading={loading} data={data}/>
         )
     }

    </div>
  )
}

export default SearchProduct