import React from 'react'
import { ProductImg } from '../../public'
import Image from 'next/image'
function Product() {
    return (
        <div className='w-full pt-3 gap-y-3 flex-col  flexCenter'>
            <span className='whitespace-nowrap sm:text-lg lg:text-xl font-bold text-md text-neutral-900'>The product</span>
            <div className='w-full gap-2 flexCenter bg-white pt-2 px-2 rounded border-neutral-300 flex-col'>
                <span className='text-xs font-semibold text-neutral-900'>what we offer</span>
                <div className='w-full'>
                    <p className='text-xs text-neutral-900 text-justify whitespace-pre-wrap'>Our collaborative whiteboard is a simple and powerful tool for real-time visual collaboration.  Teams of all sizes can use our platform to brainstorm, plan, and create together.  Create a room or join one to start collaborating instantly.</p>
                </div>
                <Image alt='productImg' src={ProductImg} />
            </div>
        </div>
    )
}

export default Product
