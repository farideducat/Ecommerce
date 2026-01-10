import React from 'react'
import successImage from '../assest/success.gif'
import{ Link }from 'react-router-dom'

const SuccessPayment = () => {
  return (
    <div className='bg-slate-200  w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 my-2 rounded'>
      <img className='mix-blend-multiply' src={successImage} width={150} height={150}/>
      <p className='text-green-600 font-bold  text-xl'>Payment Successfully</p>
      <Link to={'/order'} className='p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-bold hover:bg-black hover:text-white hover:border-slate-500'>See Order Page</Link>
    </div>
  )
}

export default SuccessPayment