import React, { ReactNode } from 'react'


function layout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='w-full flex h-screen justify-between items-center bg-neutral-100'>
            <div className='w-1/2'>
                {children}
            </div>
            <div className='w-1/2'>

            </div>
        </div>
    )
}

export default layout
