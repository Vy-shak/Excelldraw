"use client"

import React, { useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'
import { SpaceCard } from '../../components'
import { Plus, UserPlus, Loader } from "lucide-react"
import { useRouter } from 'next/navigation'

function Home() {
    const [loader, setLoader] = useState(false)
    const router = useRouter()
    const createNameref = useRef<HTMLInputElement>(null)
    const joinNameref = useRef<HTMLInputElement>(null)
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
                if (data.code) {
                    setLoader(false);
                    router.push(`/canvas/vz?roomcode=${data.code}`)
                }

                console.log(data.code)
            }

        } catch (error) {
            console.log(error);
        }
    };

    const joinRoom = async () => {
        const token = await localStorage.getItem("token");
        const roomcode = joinNameref.current?.value
        try {
            const ws = await new WebSocket(`ws://localhost:8080?token=${token}&roomcode=${roomcode}`);
            ws.onopen = () => {
            }
        } catch (error) {
            console.log(error)
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
