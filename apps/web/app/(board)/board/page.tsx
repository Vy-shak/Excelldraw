"use client"

import React from 'react'
import { useRef, useEffect } from 'react'
import { startDraw } from '../../draw';

function page() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            startDraw(canvasRef.current)
        }
    }, [canvasRef])

    return (
        <>
            <div>
                <span style={{ color: "white" }}>rect</span>
            </div>
            <div style={{ width: '100vw', height: '100vh', overflow: "hidden" }}>
                <canvas ref={canvasRef} width={800} height={800}></canvas>
            </div>
        </>
    )
}

export default page
