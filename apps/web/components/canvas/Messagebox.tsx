import React from 'react'



interface message {
    author: string,
    message: string
}

function Messagebox({ author, message }: message) {
    return (
        <div className='w-full space-x-2 flex justify-start items-start'>
            <div className='w-8 h-8 rounded-full bg-emerald-300'></div>
            <div className='w-fit px-2 pb-1 rounded h-fit flex flex-col justify-start items-start  bg-neutral-300'>
                <span className='text-xs font-medium'>{author}</span>
                <p className='text-xs'>{message}</p>
            </div>
        </div>
    )
}

export default Messagebox
