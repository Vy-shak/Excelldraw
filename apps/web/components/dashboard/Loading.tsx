import React from 'react'

function Loading() {
    return (
        <div className='flexCenter flex-col absolute top-1/2 left-1/2 gap-y-2 bg-white z-50 w-96 h-44'>
            <div className='loader'></div>
            <span className='font-semibold text-neutral-800'>"Setting up... This won’t take long."</span>
        </div>
    )
}

export default Loading
