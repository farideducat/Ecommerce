import React from 'react'
import cancelImage from '../assest/cancel.gif'
import{ Link }from 'react-router-dom'

const CancelPayment = () => {
  return (
    <div className='bg-slate-300  w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 my-2 rounded'>
      <img className='mix-blend-multiply' src={cancelImage} width={150} height={150}/>
      <p className='text-red-600 font-bold  text-xl'>Payment Not Successfully</p>
      <Link to={'/cart'} className='p-2 px-3 mt-5 border-2 border-red-600 rounded font-semibold text-bold hover:bg-black hover:text-white hover:border-slate-500'>See Payment Details</Link>
    </div>
  )
}

export default CancelPayment