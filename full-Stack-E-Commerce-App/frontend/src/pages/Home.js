import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCartdProduct from '../components/HorizontalCartdProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'



const Home = () => {
  return (
  <div>
    <CategoryList/>
    <BannerProduct/>
    <HorizontalCartdProduct category={"airpodes"} heading={"top Airpodes "}/>
      <HorizontalCartdProduct category={"watches"} heading={"top watches"}/>

    <VerticalCardProduct category={"automotive"} heading={"top vehicle Parts "}/>
    <VerticalCardProduct category={"mobile"} heading={"top  Mobiles"}/>
    <VerticalCardProduct category={"printers"} heading={"top  printer Parts "}/>
    <VerticalCardProduct category={"camera"} heading={"top camera"}/>
    <VerticalCardProduct category={"earphones"} heading={"top Earphones"}/>
    <VerticalCardProduct category={"mouse"} heading={"top mouse"}/>
    <VerticalCardProduct category={"processor"} heading={"top processor"}/>
    <VerticalCardProduct category={"refrigerator"} heading={"top refrigerator"}/>
    <VerticalCardProduct category={"speakers"} heading={"top speakers"}/>
    <VerticalCardProduct category={"televisions"} heading={"top televisions"}/>
    <VerticalCardProduct category={"trimmers"} heading={"top trimmers"}/>
    


  

  </div>
  )
}

export default Home