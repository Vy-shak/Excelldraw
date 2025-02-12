import React from 'react'
import Pricingcard from './components/Pricingcard'

function Pricing() {
    return (
        <section className='w-full flexCenter pt-4 gap-y-4   flex-col'>
            <span className='text-md font-bold text-neutral-900 whitespace-nowrap'>Pricing</span>
            <div className='w-full flexCenter gap-y-3 flex-col'>
                <Pricingcard />
                <Pricingcard />
                <Pricingcard />
            </div>
        </section>
    )
}

export default Pricing
