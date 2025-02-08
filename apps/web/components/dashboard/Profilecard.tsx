"use-client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Button from '../general/Button'
import axios from 'axios'



function Profilecard() {
    const [userData, setUserdata] = useState<userData>()
    console.log(userData);
    const token = localStorage.getItem("token");
    console.log(token);
    interface userData {
        id: number,
        name: string,
        email: string,
        password: string,
        bio: 'string',
        imgUrl: string,
        updatedAt: string
    }
    useEffect(() => {
        (async function getuserData() {
            try {
                const { data } = await axios.get("http://localhost:3002/user/getData", {
                    headers: {
                        'Content-Type': 'application/json',
                        'authtoken': token
                    }
                });
                setUserdata(data)
            } catch (error) {
                throw error
            }
        })()
    }, []);
    return (
        <div className='w-full max-w-lg  bg-white rounded-lg flex justify-between px-4 py-6 border-neutral-600 items-center'>
            <div className='flex space-x-2 justify-center items-start'>
                <div className='overflow-hidden flexCenter rounded-md'>
                    {userData && <Image alt='userProfile' width={80} height={80} src={userData.imgUrl} />}
                </div>
                <div className='flex justify-start items-start flex-col'>
                    {userData && <span className='text-lg text-neutral-600 font-semibold'>{userData.name}</span>}
                    <span className='text-[12px] font-medium text-neutral-800'>Plan: Workspace basic</span>
                </div>
            </div>
            <div className='flexCenter flex-col w-fit h-fit'>
                <Button size='default' text='Edit profile' variant='secondary' />
                <span className='text-[14px] font-medium text-blue-600 '>View plan Details</span>
            </div>
        </div>
    )
}

export default Profilecard
