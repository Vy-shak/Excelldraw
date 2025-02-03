import React from 'react'
import Image from 'next/image'
import { Avatar1 } from '../../../public/Dp'
import { Avatarbox } from '../../../components'

const page = () => {
    return (
        <section className='w-screen flex justify-start items-start h-screen bg-white'>
            <div className='w-52 h-screen'>
                <Image alt='avatar1' src={Avatar1} />
            </div>
            <div className='w-full flex flex-col justify-start items-start h-full bg-white'>
                <Avatarbox />
            </div>
        </section>
    )
}

export default page
