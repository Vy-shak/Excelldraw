import React from 'react'
import { TickIcon } from '../../public'
import Image from 'next/image';
import Link from 'next/link'
import { Button } from '../../components';
import { Tag, UserPlus } from "lucide-react"

const Types = [
    { id: 1, text: "Startups" },
    { id: 2, text: "Students" },
    { id: 3, text: "Teams" }
];

function Hero() {
    return (
        <section className='w-full lg:pt-24 md:pt-20 sm:pt-16 pt-14 flexCenter flex-col gap-y-6'>
            <div className='w-full flexCenter flex-col lg:gap-y-6 md:gap-y-4 gap-y-3'>
                <h6 className='font-extrabold  lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-neutral-950'><span className='whitespace-nowrap'>Transform ideas,</span ><br /><span className='whitespace-nowrap'>Defy boundaries.</span></h6>
                <div className='flexCenter w-full gap-x-4 h-full'>
                    {Types.map((item) => (
                        <div key={item.id} className='flexCenter md:flex-row flex-col gap-x-1 w-fit h-fit'>
                            <Image alt='tick' src={TickIcon} />
                            <span className='text-neutral-950 sm:text-xs text-[14px] font-semibold'>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-full sm:flex-row sm:gap-x-4 flex-col flexCenter gap-y-2'>
                <Link href={'/auth/Signup'}><Button startIcon={<UserPlus />} text='Create account' size='md' variant='primary' /></Link>
                <Link href={'/auth/login'}><Button startIcon={<Tag />} text='Be a guest' size='md' variant='secondary' /></Link>
            </div>
        </section>
    )
}

export default Hero
