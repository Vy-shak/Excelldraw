"use client"

import React from 'react'
import axios from 'axios'
import { useRef } from 'react'
import spaceCard from "@repo/ui/SpaceCard"
import SpaceCard from '@repo/ui/SpaceCard'

function Home() {
    const createNameref = useRef<HTMLInputElement>(null)
    const joinNameref = useRef<HTMLInputElement>(null)
    const createRoom = async () => {
        try {
            if (createNameref.current?.value) {
                const { data } = await axios.post('http://localhost:3002/room/create', {
                    roomname: createNameref.current.value
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzM3MTEzMjI1fQ.qEyTcUlWgKnDWJITKttrfdZvliE4qGPz1t2FkuXFTmM"

                    }
                });
                console.log(data.code)
            }

        } catch (error) {
            console.log(error);
        }
    };

    const joinRoom = async () => {
        try {
            const socket = await new WebSocket(`ws://your-websocket-server-url?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzM3NDUzMDI4fQ.W9e97kcVQf7fGiupTLioZlsDEYEbZtxKAYxbAUlhIzU&roomcode=a3242bc9-0a2b-4962-a03e-5bd64ae7a5ab`);
            console.log(socket);
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div>
            <SpaceCard type='create Space' refer={createNameref} />
            <div className='flex'>
                <span onClick={joinRoom} >join</span>
                <input type='text' />
            </div>
        </div>
    )
}

export default Home
