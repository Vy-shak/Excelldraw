import React from 'react'
import Image from 'next/image'
import { Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8, Avatar9, Avatar10, Avatar11, Avatar12, Avatar13, Avatar14 } from '../../../public/Dp/index';


const avatarData = [
    { id: 1, avatarImg: Avatar2 },
    { id: 2, avatarImg: Avatar3 },
    { id: 3, avatarImg: Avatar4 },
    { id: 4, avatarImg: Avatar5 },
    { id: 5, avatarImg: Avatar6 },
    { id: 6, avatarImg: Avatar7 },
    { id: 7, avatarImg: Avatar8 },
    { id: 8, avatarImg: Avatar9 },
    { id: 9, avatarImg: Avatar10 },
    { id: 10, avatarImg: Avatar11 },
    { id: 11, avatarImg: Avatar12 },
    { id: 12, avatarImg: Avatar13 },
    { id: 13, avatarImg: Avatar14 }
];

const page = () => {
    return (
        <section className='w-screen flex justify-start pt-16 items-start h-screen bg-white'>
            <div className='w-52 h-screen border-r flex justify-center items-start border-neutral-300'>
                <Image className='w-36' alt='avatar1' src={Avatar1} />
            </div>
            <div className='w-full flex flex-col pl-6 justify-start items-start h-full bg-white'>
                <div className='flex flex-col space-y-3 justify-start items-start'>
                    <span className='text-xs font-semibold text-neutral-700'>Avatars</span>
                    <div className='flex flex-wrap max-w-lg justify-start gap-2 items-center w-full'>
                        {avatarData.map((item) => (
                            <Image key={item.id} src={item.avatarImg} alt='avtarimg' />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page
