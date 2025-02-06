import React from 'react'
import Image from 'next/image'


interface message {
    author: string,
    message: string,
    url: string
}


function Messagebox({ author, message, url }: message) {
    return (
        <div className='w-full space-x-2 flex justify-start items-start'>
            <Image alt='userimage' src={url} width={80} height={80} />
            <div className='w-fit px-2 bg-emerald-300 pb-1 rounded h-fit flex flex-col justify-start items-start  '>
                <span className='text-xs text-neutral-900 font-medium'>{author}</span>
                <p className='text-xs text-neutral-700'>{message}</p>
            </div>
        </div >
    )
}

export default Messagebox
