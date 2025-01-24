"use client"

import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
import startDraw from '../../draw';
import Toolbox from '../../../components/Toolbox';

function page() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [select, setSelction] = useState('rect')
    console.log(select)

    useEffect(() => {
        window.selectedTool = select
    }, [select])

    useEffect(() => {
        if (canvasRef.current) {
            startDraw(canvasRef.current, null);
        }
    }, [canvasRef]);



    return (
        <div style={{
            background: 'radial-gradient(circle, #dbdbdb 1px, transparent 1px)',
            backgroundSize: '20px 20px',
        }} className='w-screen flex flex-col justify-center items-center  h-screen overflow-hidden bg-neutral-50'>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
            {<Toolbox select={select} setSelection={setSelction} />}
        </div>
    )
}

export default page
