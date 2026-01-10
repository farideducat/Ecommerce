import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helper/productCategory'
import VerticalCard from '../components/VerticalCard'
import summaryApi from '../common'

const CategoryProduct = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListInArray = urlSearch.getAll("category")

    const urlCategoryListObject =  {}
    urlCategoryListInArray.forEach(el =>{
      urlCategoryListObject[el] = true
    })

    const [selectCategory,setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const [sortBy, setSortBy] = useState("")
    const [openFilter, setOpenFilter] = useState(false)

  

    const fetchData = async()=>{
      setLoading(true)
      const response = await fetch(summaryApi.filterProduct.url,{
        method : summaryApi.filterProduct.method,
        headers :{
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })
    
     
       const dataResponse = await response.json()
       setData(dataResponse?.data || [])
       setLoading(false)
    }


    const handleSelectCategory = (e)=>{
         const {name , value , checked } = e.target

        setSelectCategory((preve)=>{
          return{ 
            ...preve,
            [value] : checked
          }
       })
    
    }
 

     useEffect(()=>{
      const araryOfCategory = Object.keys(selectCategory).map(categoryKeyName =>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }
        return null
      }).filter(el => el)
                      
      setFilterCategoryList(araryOfCategory)
         
      //format url checking with checkbox
      const urlFormate = araryOfCategory.map((el,index) =>{
        if((araryOfCategory.length - 1 ) === index ){
          return `category=${el}`
        }
        return `category=${el}&&`
      })
      navigate("/product-category?"+urlFormate.join(""))
     },[selectCategory])


         useEffect(()=>{
         fetchData()
        },[filterCategoryList])

      const handleOnChngeSortBy = (e)=>{
           const { value } = e.target 

           setSortBy(value)

           if(value === 'asc'){
            setData(preve => preve.sort((a,b)=> a.sellingPrice - b.sellingPrice))
           }

           if(value === 'dsc'){
            setData(preve => preve.sort((a,b)=> b.sellingPrice - a.sellingPrice))
           }
      }

          useEffect(()=>{

          },[sortBy])
  
  return (
    <div className='mx-auto p-4'>
      {/*desktop vesrion*/}
      <div className='  lg:grid grid-cols-[200px,1fr] border'>
        {/*leftSide*/}
        <div className=' bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>

              {/*sort by*/}
             <div className=''>
                <h3 className='text-base uppercase font-medium text-slate-500 border-b  pb-1 border-slate-500' >Sort By</h3>
                <form className=' text-sm flex flex-col gap-2 py-2'>

                    <div className='flex items-center gap-2'>
                        <input type='radio' checked={sortBy === 'asc'} name='sort' value={"asc"} onChange={handleOnChngeSortBy}/>
                         <label> Price - Low To High</label>
                    </div>

                    <div className='flex items-center gap-2'>
                        <input type='radio' checked={sortBy === 'dsc'} name='sort' value={"dsc"} onChange={handleOnChngeSortBy}/>
                         <label> Price - High To Low</label>
                    </div>
                </form>
            </div>


               {/*Filter by Category*/}
             <div className=''>
                <h3 className='text-medium uppercase font-medium text-slate-500 border-b  pb-1 border-slate-500' >Select Category</h3>
                <form className=' text-sm flex flex-col gap-2 py-2'>
                    {
                       productCategory.map((categoryName,index)=>{
                        return(
                          <div className='flex items-center gap-3'>
                            <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory}/> 
                            <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                          </div>
                        )
                       })
                    }
                </form>
            </div>

        </div>


         {/*rightSide (display product)*/}
        <div className=''>
             <p className='font-medium text-slate-800 text-lg my-2'>Search Result : {data.length}</p>
        <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {
              data.length !== 0 && (
                <VerticalCard data={data} loading={loading}/>
              )
            }
        </div>

        </div>

      </div>

    </div>
  )
}

export default CategoryProduct