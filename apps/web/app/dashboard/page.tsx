"use client"

import React, { useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'
import { SpaceCard, Sidebar, Sidemenu } from '../../components'
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
                    setLoader(false);
                    router.push(`/${data.code}`)
                }
            }

        } catch (error) {
            console.log(error);
        }
    };

    const joinRoom = async () => {
        const roomcode = joinNameref.current?.value;
        if (roomcode) {
            router.push(`/${roomcode}`)
        }
    }


    return (
        <div className='flex justify-start items-center pt-6 space-y-6 flex-col w-full h-screen'>
            <Sidebar />
            <div className='w-full flexCenter'>
                <Profilecard />
            </div>
            <div className='flexCenter w-fit h-fit space-x-3'>
                <SpaceCard icon={loader ? <Loader /> : <Plus />} handleClick={createRoom} type='Create space' refer={createNameref} />
                <SpaceCard icon={loader ? <Loader /> : <UserPlus />} handleClick={joinRoom} type='Join space' refer={joinNameref} />
            </div>
        </div >
    )
}

export default Home
