import React from 'react'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'  
import ProductCard from '@/components/ProductCard'
const Home = () => {
  return (
    <div>
        {/* <Navbar/> */}
      <HeroSection />
      <ProductCard/>
    </div>
  )
}

export default Home
