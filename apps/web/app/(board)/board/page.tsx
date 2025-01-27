"use client"

import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
import startDraw from '../../draw';
import Toolbox from '../../../components/Toolbox';
import { useAppSelector } from '../../../lib/store/hook';


function page() {
    const selectedTool = useAppSelector((state) => state.tool)
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (canvasRef.current) {
            startDraw(canvasRef.current, selectedTool);
        }
    }, [canvasRef]);

    useEffect(() => {
        if (canvasRef.current) {
            startDraw(canvasRef.current, selectedTool);
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
