"use-client"
import React from 'react'
import Image from 'next/image'
import Button from '../general/Button'

function Profilecard() {
    const profleUrl = localStorage.getItem('profilePic')
    const userName = localStorage.getItem('userName')
    return (
        <div className='w-full max-w-lg bg-white rounded-md flex justify-between items-center'>
            <div>
                <div>
                    {profleUrl && <Image alt='userProfile' width={100} height={100} src={profleUrl} />}
                </div>
                <div className='flex justify-start items-start flex-col'>
                    <span>{userName}</span>
                </div>
            </div>
            <div>
                <Button size='default' text='Edit profile' variant='secondary' />
                <span>view plan details</span>
            </div>
        </div>
    )
}

export default Profilecard
