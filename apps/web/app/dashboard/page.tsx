"use client"

import React, { useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'

function Home() {
    const [connect, setConnect] = useState(false);

    const createNameref = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const joinNameref = useRef<HTMLInputElement>(null)
    const createRoom = async () => {
        try {
            if (createNameref.current?.value) {
                setConnect(true);
                const { data } = await axios.post('http://localhost:3002/room/create', {
                    roomname: createNameref.current.value
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzM3MTEzMjI1fQ.qEyTcUlWgKnDWJITKttrfdZvliE4qGPz1t2FkuXFTmM"
                    }
                });
                if (data.code) {
                    setConnect(true);
                    router.push('/canvas');
                }
            }

        } catch (error) {
            console.log(error);
        }
    };

    const joinRoom = async () => {
        try {
            setConnect(true);
            const socket = new WebSocket(`ws://localhost:8080?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzM3NDUzMDI4fQ.W9e97kcVQf7fGiupTLioZlsDEYEbZtxKAYxbAUlhIzU&roomcode=a3242bc9-0a2b-4962-a03e-5bd64ae7a5ab`);
            socket.onopen = () => {
                router.push('/canvas')
            }
            console.log(socket);
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div>
            <div className='flex'>
                <span onClick={createRoom}>Createoom</span>
                <input ref={createNameref} type='text' />
            </div>
            <div className='flex'>
                <span onClick={joinRoom} >join</span>
                <input type='text' />
            </div>
            <span>{`${connect ? "loading" : null}`}</span>
        </div>
    )
}

export default Home
