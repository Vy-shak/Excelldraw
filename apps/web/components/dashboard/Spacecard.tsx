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
    create1: "Create your space and ",
    create2: "sketch your ideas",
    join1: "Join a space to be",
    join2: "part of an idea",
}

function SpaceCard({ type, refer, handleClick, icon }: card) {
    console.log(refer.current?.value)
    return (
        <div className='w-full space-y-4  flex justify-start items-start px-3 py-2 flex-col bg-white rounded-md'>
            <div className='flexColcenter space-y-2 w-full'>
                {type === 'Create space' ? <h5 className='text-neutral-800 font-semibold text-sm'><span>{headings['create1']}</span><br /><span>{headings['create2']}</span></h5> : <h5 className='text-neutral-800 font-semibold text-sm'><span>{headings['join1']}</span><br /><span>{headings['join2']}</span></h5>}
                <Input varient='normal' place={type === 'Create space' ? 'Name your space' : 'Paste your link/code'} type='text' Size='normal' reference={refer} />
            </div>
            <div className='flexCenter w-full'>
                <Button handleClick={handleClick} startIcon={icon} text={type} variant='primary' size='default' />
            </div>
        </div>
    )
}

export default SpaceCard
