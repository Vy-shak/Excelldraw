"use client"

import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
import startDraw from '../draw/Index';
import { Toolbox, Topbar } from '../../components';
import { useAppSelector } from '../../lib/store/hook';
import { useParams } from 'next/navigation';
import axios from 'axios';

function page() {
    const selectedTool = useAppSelector((state) => state.tool)
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const params = useParams<{ slug: string }>();
    useEffect(() => {
        if (canvasRef.current) {
            const token = localStorage.getItem('token');
            const slug = params.slug
            let cleanup: any = undefined;
            if (token && slug) {
                const socket = new WebSocket(`ws://localhost:8080?token=${token}&roomcode=${slug}`);

                socket.onopen = (data) => {
                    console.log(data);
                    if (canvasRef.current) {
                        cleanup = startDraw(canvasRef.current, selectedTool, socket);
                    }
                    else {
                        console.log("canvasRef is not true")
                    }
                };

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
        const token = localStorage.getItem('token')
        async function getUserdata() {
            if (token) {
                axios.get("http://localhost:3002/user/getData", {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    },
                })
            }
        }
    }, [])



    return (
        <div style={{
            background: 'radial-gradient(circle, #dbdbdb 1px, transparent 1px)',
            backgroundSize: '20px 20px',
        }} className='w-screen flex flex-col justify-center items-center  h-screen overflow-hidden bg-neutral-50'>
            <Topbar />
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
            {<Toolbox />}
        </div>
    )
}

export default page
