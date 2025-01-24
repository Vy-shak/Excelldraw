import { HtmlContext } from "next/dist/server/route-modules/pages/vendored/contexts/entrypoints";
interface store {
    startX: number,
    startY: number,
    width: number,
    height: number
}

export function startDraw(canvas: HTMLCanvasElement) {

    let ctx = canvas.getContext("2d");

    if (ctx) {
        let start = true;
        let startX = 5;
        let startY = 5;
        let store: store[] = [];
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
                ctx.strokeStyle = 'black'
                ctx.setLineDash([5, 3]);
                ctx.lineJoin = 'round';
                ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
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
}