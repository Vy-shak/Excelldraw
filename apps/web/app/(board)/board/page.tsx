"use client"

import React from 'react'
import { useRef, useEffect } from 'react'

function page() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let start = false;
        let rectVal = [5, 5];
        let store = []
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            let startX = 5;
            let startY = 5;
            let ctx = canvas.getContext("2d");
            if (!ctx) return


            canvas.addEventListener("mousedown", (e) => {
                start = true;
                startX = e.clientX;
                startY = e.clientY;
            });
            canvas.addEventListener('mousemove', (e) => {
                if (start) {
                    let width = e.clientX - startX;
                    let height = e.clientY - startY;
                    ctx.strokeStyle = 'white'
                    ctx.setLineDash([5, 3]);
                    ctx.lineJoin = 'round';
                    ctx.clearRect(0, 0, 800, 800)
                    if (store) {
                        store.map((item) => {
                            ctx?.strokeRect(item.startX, item.startY, item.width, item.height);
                        })
                    }
                    ctx?.strokeRect(startX, startY, width, height);
                }
            })
            canvas.addEventListener("mouseup", (e) => {
                start = false;
                let width = e.clientX - startX;
                let height = e.clientY - startY;
                ctx.strokeStyle = 'white';
                store.push({ startX, startY, width, height });
                console.log(store)
                if (store) {
                    store.map((item) => {
                        ctx?.strokeRect(item.startX, item.startY, item.width, item.height);
                    })
                }
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
