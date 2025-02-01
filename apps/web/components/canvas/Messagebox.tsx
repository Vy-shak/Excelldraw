import React from 'react'

function Messagebox() {
    return (
        <div className='w-full space-x-2 flex justify-start items-start'>
            <div className='w-8 h-8 rounded-full bg-emerald-300'></div>
            <div className='w-fit px-2 pb-1 rounded h-fit flex flex-col justify-start items-start  bg-neutral-300'>
                <span className='text-xs font-medium'>name</span>
                <p className='text-xs'>xvxcvcxv</p>
            </div>
        </div>
    )
}

export default Messagebox
