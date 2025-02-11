import React from 'react'
import Image from 'next/image'
import useRoomdata from '../../lib/stateStore/userStore'

const Members = () => {
    const roomData = useRoomdata((state) => state.roomData)
    return (
        <div className='w-fit h-fit flexCenter' >
            {roomData?.members?.map((item, index) => (
                <div key={index} className='w-10 h-10 overflow-hidden flexCenter flex-col'>
                    <Image width={50} height={50} alt='avatar' src={item.profileUrl} />
                    <span>{item.username}</span>
                </div>
            ))}
        </div>
    )
}

export default Members
