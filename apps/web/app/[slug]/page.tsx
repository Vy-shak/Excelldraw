"use client"

import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
import startDraw from '../draw/Index';
import { Socketmsg } from '../draw/Index';
import { Toolbox, Topbar, Chatbox } from '../../components';
import { useAppSelector, useAppDispatch } from '../../lib/store/hook';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { addUserdata } from '../../lib/store/user/userdataSlice';
import { addMessages } from '../../lib/store/chat/messageSlice';

function page() {
    const selectedTool = useAppSelector((state) => state.tool);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const params = useParams<{ slug: string }>();
    const socketRef = useRef<WebSocket | null>(null)
    const dispatch = useAppDispatch();
    const [socketOn, setOnsocket] = useState(false)

    useEffect(() => {
        if (canvasRef.current) {
            const token = localStorage.getItem('token');
            const slug = params.slug
            if (token && slug) {
                const ws = new WebSocket(`ws://localhost:8080?token=${token}&roomcode=${slug}`);
                if (ws) {
                    socketRef.current = ws
                    setOnsocket(true)
                }
            }
            else {
                console.log("token is not valid")
            }
        }
    }, []);

    useEffect(() => {
        let cleanup: (() => void) | undefined = undefined
        console.log("renderig again")
        if (socketRef.current) {
            console.log("hellos")
            if (canvasRef.current && socketRef.current) {
                console.log("heyy")
                cleanup = startDraw(canvasRef.current, selectedTool, socketRef.current);

                socketRef.current!.onmessage = function (event) {
                    console.log("messgae comming here", event.data)
                    const details = event.data
                    const parsedData = JSON.parse(details);
                    if (parsedData.shape) {
                        Socketmsg(canvasRef.current!, parsedData)
                    }
                    if (parsedData.type === 'chat') {
                        dispatch(addMessages(parsedData.message))
                    }
                    const { roomname, roomCode } = JSON.parse(details)
                    if (roomname && roomCode) {
                        dispatch(addUserdata({ roomname: roomname, roomcode: roomCode }))
                    }
                }
            }
            else {
                console.log("canvasRef is not true")
            }

            return () => {
                if (cleanup) {
                    cleanup()
                }
            }
        };
    }, [selectedTool, socketRef.current])

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
            {socketOn && socketRef.current && <Chatbox socket={socketRef.current} />}
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
            {<Toolbox />}
        </div>
    )
}

export default page
