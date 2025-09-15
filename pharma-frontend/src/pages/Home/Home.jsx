import React from 'react'
import HeroSlider from './components/HeroSlider'
import CategoryCards from './components/CategoryCards/CategoryCards'
import DiscountProducts from './components/DiscountProducts/DiscountProducts'
import HealthBlogs from './components/HealthBlog/HealthBlogs'
import HealthcarePartners from './components/HealthCarePartners/HealthCarePartners'
import { useTitle, PAGE_TITLES } from '../../hooks/useTitle'

const Home = () => {
  useTitle(PAGE_TITLES.HOME);

  return (
    <>
      <HeroSlider />
      <CategoryCards />
      <DiscountProducts />
      <HealthBlogs />
      <HealthcarePartners />
    </>
  )
}

export default Home
