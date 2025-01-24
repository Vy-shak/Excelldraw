"use client"

import React from 'react'
import { useRef, useEffect } from 'react'
import { startDraw } from '../../draw';
import ToolBox from "@repo/ui/Toolbox"

function page() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            startDraw(canvasRef.current)
        }
    }, [canvasRef])

    return (
        <div style={{
            background: 'radial-gradient(circle, #dbdbdb 1px, transparent 1px)',
            backgroundSize: '20px 20px',
        }} className='w-screen flex justify-center items-center  h-screen overflow-hidden bg-neutral-50'>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
            <ToolBox />
        </div>
    )
}

export default page
