"use client"

import React, { useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'
import { SpaceCard, Sidebar, Navbar, Loading } from '../../components'
import { Plus, UserPlus, Loader, } from "lucide-react"
import { useRouter } from 'next/navigation'
import { AppDispatch } from '../../lib/store/store'
import { useAppDispatch } from '../../lib/store/hook'
import Profilecard from '../../components/dashboard/Profilecard'
import { addUserdata } from '../../lib/store/user/userdataSlice'



function Home() {
    const [loader, setLoader] = useState(false)
    const router = useRouter()
    const createNameref = useRef<HTMLInputElement>(null)
    const joinNameref = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    console.log('hello', createNameref.current?.value)

    const token = localStorage.getItem("token")
    const createRoom = async () => {
        try {
            if (createNameref.current?.value) {
                setLoader(true)
                const { data } = await axios.post('http://localhost:3002/room/create', {
                    roomname: createNameref.current.value
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "authToken": token
                    }
                });
                const { code, roomName } = data
                if (code && roomName) {
                    await router.push(`/${data.code}`);
                    setLoader(false);
                }
            }

        } catch (error) {
            console.log(error);
        }
    };

    const joinRoom = async () => {
        const roomcode = joinNameref.current?.value;
        if (roomcode) {
            router.push(`/${roomcode}`);
            setLoader(false);
        }
    }


    return (
        <div className='flex justify-start items-start gap-x-6 w-full h-screen'>
            {loader && <Loading />}
            <Navbar />
            <Sidebar />
            <div className='w-full h-full gap-y-4 pt-12 flex justify-start items-start flex-col'>
                <h1 className='text-2xl font-bold text-neutral-800'><span>Welcome</span><br /><span>back champ!</span></h1>
                <div className='w-full border-b-2 border-neutral-100 pb-4 flex justify-start items-center'>
                    <Profilecard />
                </div>
                <div className='flexCenter w-full h-fit pr-6 gap-x-6'>
                    <SpaceCard icon={loader ? <Loader /> : <Plus />} handleClick={createRoom} type='Create space' refer={createNameref} />
                    <SpaceCard icon={loader ? <Loader /> : <UserPlus />} handleClick={joinRoom} type='Join space' refer={joinNameref} />
                </div>
            </div>
        </div >
    )
}

export default Home
