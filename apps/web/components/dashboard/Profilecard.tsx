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
        <div className='w-full max-w-lg  bg-white rounded-md flex justify-between items-center'>
            <div>
                <div className='overflow-hidden rounded-xl'>
                    {userData && <Image alt='userProfile' width={100} height={100} src={userData.imgUrl} />}
                </div>
                <div className='flex justify-start items-start flex-col'>
                    {userData && <span>{userData.name}</span>}
                </div>
            </div>
            <div className='flexCenter flex-col w-fit h-fit'>
                <Button size='default' text='Edit profile' variant='secondary' />
                <span className='text-xs'>view plan details</span>
            </div>
        </div>
    )
}

export default Profilecard
