import React from 'react'
import { Pricing, Footer, Navbar, Hero, Video, Product, } from './landingSections'
function page() {
  return (
    <section className='w-full'>
      <Navbar />
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
    </section >
  )
}

export default page
