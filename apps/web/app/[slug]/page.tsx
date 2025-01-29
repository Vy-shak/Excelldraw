"use client"

import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
import startDraw from '../draw/Index';
import { Toolbox } from '../../components';
import { useAppSelector } from '../../lib/store/hook';
import { useParams } from 'next/navigation';

function page() {
    const selectedTool = useAppSelector((state) => state.tool)
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const params = useParams<{ canvas: string }>()
    useEffect(() => {
        if (canvasRef.current) {
            const cleanup = startDraw(canvasRef.current, selectedTool);
            console.log(params.slug)
            return () => {
                if (cleanup) cleanup();
            };
        }

    }, [selectedTool]);



    return (
        <div style={{
            background: 'radial-gradient(circle, #dbdbdb 1px, transparent 1px)',
            backgroundSize: '20px 20px',
        }} className='w-screen flex flex-col justify-center items-center  h-screen overflow-hidden bg-neutral-50'>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
            {<Toolbox />}
        </div>
    )
}

export default page
