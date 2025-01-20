"use client"

import React from 'react'
import { useRef, useEffect } from 'react'

function page() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let start = false;
        let rectVal = [5, 5]
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            let startX = 5;
            let startY = 5;

            let ctx = canvas.getContext("2d");
            console.log(ctx, "hello")
            if (!ctx) return


            canvas.addEventListener("mousedown", (e) => {
                console.log(e.clientX);
                console.log(e.clientY);
                start = true;
                ctx.strokeStyle = 'white'
                ctx?.strokeRect(e.clientX, e.clientY, 100, 100);
                startX = e.clientX;
                startY = e.clientY;
            });
            canvas.addEventListener('mousemove', (e) => {
                if (start) {
                    console.log("mouse moving", e.clientX);
                    console.log("mouse moving", e.clientY);
                    let width = e.clientX - startX;
                    let height = e.clientY - startY;
                    ctx.clearRect(0, 0, 800, 800)
                    ctx.strokeStyle = 'white'
                    ctx?.strokeRect(startX, startY, width, height);
                }
            })
            canvas.addEventListener("mouseup", (e) => {
                console.log(e.clientX);
                console.log(e.clientY);
                start = false;
            })
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
