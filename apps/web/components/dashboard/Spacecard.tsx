"use client"

import React from 'react'
import Input from '../general/Input'
import Button from '../general/Button'


interface card {
    type: string,
    refer: React.RefObject<HTMLInputElement>,
    handleClick: () => void
    icon: any

}

const headings = {
    create: "create your space and sketch your ideas",
    join: "join a space to be the part of an idea",
}

function SpaceCard({ type, refer, handleClick, icon }: card) {
    console.log(refer.current?.value)
    return (
        <div className='w-full space-y-4  flex justify-center items-center px-3 py-2 flex-col bg-white rounded-md'>
            <div className='flexColcenter space-y-2'>
                <h5 className='text-neutral-800 font-medium'>{type === 'Create space' ? headings['create'] : headings['join']}</h5>
                <Input place={type === 'Create space' ? 'Name your space' : 'Paste your link/code'} type='text' Size='normal' reference={refer} />
            </div>
            <Button handleClick={handleClick} startIcon={icon} text={type} variant='primary' size='default' />
        </div>
    )
}

export default SpaceCard
