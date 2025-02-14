import React from 'react'
import Pricingcard from './components/Pricingcard'

function Pricing() {
    return (
        <section className='w-full flexCenter pt-4 gap-y-4   flex-col'>
            <span className='text-md font-bold sm:text-lg lg:text-xl text-neutral-900 whitespace-nowrap'>Pricing</span>
            <div className='w-full max-w-3xl lg:flex-row lg:gap-x-3 flexCenter gap-y-3 flex-col'>
                <Pricingcard />
                <Pricingcard />
                <Pricingcard />
            </div>
        </section>
    )
}

export default Pricing
