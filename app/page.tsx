import React from 'react'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'  
import ProductCard from '@/components/ProductCard'
import CategoryList from '@/components/CategoryList'
import CardItem from '@/components/CardItem'
import Products from '@/components/Products'
import DiscountCard from '@/components/DiscountCard'
import SaleCard from '@/components/SaleCard'
const Home = () => {
  return (
    <div>
    
      <HeroSection />
      <ProductCard/>
      <CategoryList/>
      <CardItem />
      <Products/>
      <DiscountCard />
      <SaleCard/>
    </div>
  )
}

export default Home
