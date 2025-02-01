import React from 'react'



interface message {
    author: string,
    message: string
}

function Messagebox({ author, message }: message) {
    return (
        <div className='w-full space-x-2 flex justify-start items-start'>
            <div className='w-8 h-8 rounded-full bg-green-800 '></div>
            <div className='w-fit px-2 bg-emerald-300 pb-1 rounded h-fit flex flex-col justify-start items-start  '>
                <span className='text-xs text-neutral-900 font-medium'>{author}</span>
                <p className='text-xs text-neutral-700'>{message}</p>
            </div>
        </div>
    )
}

export default Messagebox
