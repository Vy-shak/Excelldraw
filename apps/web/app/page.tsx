import React from 'react'
import { Pricing, Footer, Navbar, Hero, Video, Product, } from './landingSections'
function page() {
  return (
    <section className='w-full'>
      <Navbar />
      <section className='w-full gap-y-6 px-4'>
        <section>
          <Hero />
        </section>
        <section>
          <Video />
        </section>
        <section>
          <Product />
        </section>
        <section>
          <Pricing />
        </section>
        <section>
          <Footer />
        </section>
      </section>
    </section >
  )
}

export default page
