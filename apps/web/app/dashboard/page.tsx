"use client"

import React, { useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'
import { SpaceCard } from '../../components'
import { Plus, UserPlus, Loader } from "lucide-react"
import { useRouter } from 'next/navigation'
import { AppDispatch } from '../../lib/store/store'
import { useAppDispatch } from '../../lib/store/hook'
import { addUserdata } from '../../lib/store/user/userdataSlice'



function Home() {
    const [loader, setLoader] = useState(false)
    const router = useRouter()
    const createNameref = useRef<HTMLInputElement>(null)
    const joinNameref = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    console.log('hello', createNameref.current?.value)


    const createRoom = async () => {
        try {
            if (createNameref.current?.value) {
                setLoader(true)
                const { data } = await axios.post('http://localhost:3002/room/create', {
                    roomname: createNameref.current.value
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzM3MTEzMjI1fQ.qEyTcUlWgKnDWJITKttrfdZvliE4qGPz1t2FkuXFTmM"
                    }
                });
                if (data.admindata) {
                    const roomName = createNameref.current?.value;
                    const { name, email } = data.admindata
                    dispatch(addUserdata({ roomName: roomName, admin: name, email: email }));
                    if (data.code) {
                        setLoader(false);
                        router.push(`/${data.code}`)
                    }
                }
                console.log(data.code)
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
        <div className='flexCenter w-full h-screen'>
            <div className='flexCenter w-fit h-fit space-x-3'>
                <SpaceCard icon={loader ? <Loader /> : <Plus />} handleClick={createRoom} type='Create space' refer={createNameref} />
                <SpaceCard icon={loader ? <Loader /> : <UserPlus />} handleClick={joinRoom} type='Join space' refer={joinNameref} />
            </div>
        </div>
    )
}

export default Home
