import React from 'react'
import { Pricing, Footer, Navbar, Hero, Video, Product, } from './landingSections'
function page() {
  return (
    <section className='w-full'>
      <Navbar />
      <section className='w-full  px-4'>
        <section className='w-full'>
          <Hero />
        </section  >
        <section className='w-full'>
          <Video />
        </section>
        <section className='w-full'>
          <Product />
        </section >
        <section className='w-full'>
          <Pricing />
        </section>
        <section className='w-full'>
          <Footer />
        </section >
      </section>
    </section >
  )
}

export default page
