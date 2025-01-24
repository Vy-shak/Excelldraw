import { HtmlContext } from "next/dist/server/route-modules/pages/vendored/contexts/entrypoints";
interface store {
    shape: 'rect' | 'circle'
    startX: number,
    startY: number,
    radius?: number
    width: number,
    height: number
    end: number
}

function startDraw(canvas: HTMLCanvasElement, selection: string | null) {
    console.log("from canvas", selection)
    let ctx = canvas.getContext("2d");

    if (ctx) {
        let start = false;
        let startX = 5;
        let startY = 5;
        let tool = window.selectedTool
        let store: store[] = [];
        if (!ctx) return

        canvas.addEventListener("mousedown", (e) => {
            start = true;
            startX = e.clientX;
            startY = e.clientY;
            ctx.strokeStyle = 'black'
        });
        canvas.addEventListener('mousemove', (e) => {
            if (start) {
                let width = e.clientX - startX;
                let height = e.clientY - startY;
                ctx.strokeStyle = 'black'
                ctx.setLineDash([5, 3]);
                ctx.lineJoin = 'round';
                ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
                if (store) {
                    store.map((item) => {
                        if (item.shape === 'rect') {
                            ctx?.strokeRect(item.startX, item.startY, item.width, item.height);
                        }
                    })
                }
                console.log(window.selectedTool)
                if (window.selectedTool === 'rect') {
                    ctx?.strokeRect(startX, startY, width, height);
                }
                else if (window.selectedTool === 'circle') {
                    ctx.beginPath();
                    let radius = Math.abs(Math.max(width, height))
                    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }
        })
        canvas.addEventListener("mouseup", (e) => {
            start = false;
            let width = e.clientX - startX;
            let height = e.clientY - startY;
            let radius = Math.abs(Math.max(width, height))
            ctx.strokeStyle = 'black';
            if (tool === 'rect') {
                store.push({ shape: 'rect', startX, startY, width, height });
            }
            else if (tool === 'circle') {
                store.push({ shape: 'circle', startX, startY, radius });
            }
            console.log(store)
            if (store) {
                store.map((item) => {
                    if (item.shape === 'rect') {
                        ctx?.strokeRect(item.startX, item.startY, item.width, item.height);
                    }
                    else if (item.shape === 'circle') {
                        ctx.arc(item.startX, item.startY, item.radius, 0, Math.PI * 2);
                    }
                })
            }
        })
    }
}

export default startDraw