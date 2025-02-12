import React from 'react'
import { AlignRight } from "lucide-react"

function Navbar() {
    return (
        <div className='w-full px-3 top-0 pt-2 fixed'>
            <div className='w-full flex py-2 border-2 border-neutral-100 px-2 bg-white rounded  justify-between items-center '>
                <div className='w-7 h-5 text-white bg-black'>
                    logo
                </div>
                <AlignRight color='black' />
            </div>
        </div>
    )
}

export default Navbar
