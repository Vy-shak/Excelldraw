"use client"

import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
import startDraw from '../draw/Index';
import { Toolbox, Topbar, Chatbox } from '../../components';
import { useAppSelector, useAppDispatch } from '../../lib/store/hook';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { addUserdata } from '../../lib/store/user/userdataSlice';
import { Socket } from 'dgram';

function page() {
    const selectedTool = useAppSelector((state) => state.tool)
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const params = useParams<{ slug: string }>();
    const dispatch = useAppDispatch();
    const [mySocket, setSocket] = useState<WebSocket | null>(null)
    console.log(mySocket, 'mysocket')
    useEffect(() => {
        if (canvasRef.current) {
            const token = localStorage.getItem('token');
            const slug = params.slug
            let cleanup: any = undefined;
            if (token && slug) {
                const ws = new WebSocket(`ws://localhost:8080?token=${token}&roomcode=${slug}`);
                if (ws) {
                    setSocket(ws)
                }
                if (mySocket) {
                    mySocket.onopen = (val) => {
                        console.log("hellos")
                        if (canvasRef.current) {
                            cleanup = startDraw(canvasRef.current, selectedTool, mySocket);
                            mySocket.onmessage = function (event) {
                                const details = event.data
                                const { roomname, roomCode } = JSON.parse(details)

                                if (roomname && roomCode) {
                                    dispatch(addUserdata({ roomname: roomname, roomcode: roomCode }))
                                }
                            }
                        }
                        else {
                            console.log("canvasRef is not true")
                        }
                    };
                }
                else {
                    console.log("socket is not set finished")
                }
            }
            else {
                console.log("token is not valid")
            }

            return () => {
                if (cleanup) cleanup();
            };

        }
    }, [selectedTool]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        (async function getUserdata() {
            if (token) {
                const userData = await axios.get("http://localhost:3002/user/getData", {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    },
                });
                console.log(userData)
            }
        })()
    }, [])



    return (
        <div style={{
            background: 'radial-gradient(circle, #dbdbdb 1px, transparent 1px)',
            backgroundSize: '20px 20px',
        }} className='w-screen flex flex-col justify-center items-center  h-screen overflow-hidden bg-neutral-50'>
            <Topbar />
            {mySocket && <Chatbox socket={mySocket} />}
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
            {<Toolbox />}
        </div>
    )
}

export default page
