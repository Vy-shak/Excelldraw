import React from 'react'
import { TickIcon } from '../../public'
import Image from 'next/image';
import { Button } from '../../components';
import { Tag, UserPlus } from "lucide-react"

const Types = [
    { id: 1, text: "Startups" },
    { id: 2, text: "Students" },
    { id: 3, text: "Teams" }
];

function Hero() {
    return (
        <section className='w-full pt-14 flexCenter flex-col gap-y-6'>
            <div className='w-full flexCenter flex-col gap-y-3'>
                <h6 className='font-extrabold text-xl text-neutral-950'><span>Transform ideas,</span><br />Defy boundaries.</h6>
                <div className='flexCenter w-full gap-x-4 h-full'>
                    {Types.map((item) => (
                        <div className='flexCenter flex-col gap-x-1 w-fit h-fit'>
                            <Image alt='tick' src={TickIcon} />
                            <span className='text-neutral-950 text-[14px] font-semibold'>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-full flex-col flexCenter gap-y-2'>
                <Button startIcon={<UserPlus />} text='Create account' size='md' variant='primary' />
                <Button startIcon={<Tag />} text='Be a guest' size='md' variant='secondary' />
            </div>
        </section>
    )
}

export default Hero
