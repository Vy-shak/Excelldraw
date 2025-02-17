"use client"

import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
import startDraw from '../draw/Index';
import { Socketmsg } from '../draw/Index';
import { Toolbox, Topbar, Chatbox } from '../../components';
import { useParams } from 'next/navigation';
import axios from 'axios';
import useChatsStore from '../../lib/stateStore/messageStore';
import useToolstore from '../../lib/stateStore/toolStore';
import useRoomdata from '../../lib/stateStore/userStore';


interface userData {
    id: number,
    name: string,
    email: string,
    password: string,
    bio: 'string',
    imgUrl: string,
    updatedAt: string
}

function page() {
    const updateChats = useChatsStore((state) => state.updateChats);
    const selectedTool = useToolstore((state) => state.tool);
    const updateRoomdata = useRoomdata((state) => state.updateRoomdata)
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const params = useParams<{ slug: string }>();
    const socketRef = useRef<WebSocket | null>(null)
    const [userData, setUserdata] = useState<userData>()
    const [roomData, setroomData] = useState()
    const [socketOn, setOnsocket] = useState(false);
    const token = localStorage.getItem('token');
    const slug = params.slug;

    useEffect(() => {
        if (canvasRef.current) {
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
        };

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

    useEffect(() => {
        let cleanup: (() => void) | undefined = undefined
        if (socketRef.current) {
            if (canvasRef.current && socketRef.current) {
                cleanup = startDraw(canvasRef.current, selectedTool, socketRef.current, slug);

                socketRef.current!.onmessage = function (event) {
                    const parsedData = JSON.parse(event.data);
                    console.log("yppdd:-", parsedData)

                    if (parsedData.type === 'join') {
                        const { roomcode, roomname, members } = parsedData
                        updateRoomdata(parsedData)
                    }
                    else if (parsedData.type === 'shape') {
                        Socketmsg(canvasRef.current!, parsedData.shapes)
                    }
                    else if (parsedData.type === 'chat') {
                        updateChats(parsedData.chats)
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





    return (
        <div style={{
            background: 'radial-gradient(circle, #dbdbdb 1px, transparent 1px)',
            backgroundSize: '20px 20px',
        }} className='w-screen flex flex-col justify-center items-center  h-screen overflow-hidden bg-neutral-50'>
            <Topbar details={roomData} />
            {socketOn && socketRef.current && userData && <Chatbox username={userData.name} url={userData?.imgUrl} socket={socketRef.current} roomcode={slug} />}
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
            {socketOn && socketRef.current && <Toolbox socket={socketRef.current} roomcode={slug} />}
        </div>
    )
}

export default page
