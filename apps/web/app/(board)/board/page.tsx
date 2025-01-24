"use client"

import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
import ToolBox from "@repo/ui/Toolbox"
import { Drawrect } from '../../draw/draw'
import { Canvas, Rect } from 'fabric';

function page() {
    const canvasRef = useRef(null);
    const [select, setSelect] = useState()
    const [canvas, setCanvas] = useState(null)

    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current);
            initCanvas.renderAll();

            setCanvas(initCanvas)

            return () => {
                initCanvas.dispose()
            }
        }
    }, [])

    function Drawrect() {
        if (canvas) {
            const rect = new Rect({
                top: 100,
                left: 50,
                width: 100,
                height: 60,
                fill: 'transparent', // No fill
                stroke: '#E03131',   // Border color (red)
                strokeWidth: 4,     // Border width
                strokeDashArray: [5, 5],
                strokeUniform: true, // Dashed border with 5px gaps
            });
            canvas.add(rect)
        }
    }

    return (
        <div style={{
            background: 'radial-gradient(circle, # 1px, transparent 1px)',
            backgroundSize: '20px 20px',
        }} className='w-screen flex justify-center items-center  h-screen overflow-hidden bg-neutral-50'>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
            <ToolBox />
            <span onClick={() => Drawrect(canvasRef.current)} className='text-black left-1/2 absolute'>rect</span>
        </div>
    )
}

export default page
