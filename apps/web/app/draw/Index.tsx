type store = {
    shape: 'rect',
    startX: number,
    startY: number,
    width: number,
    height: number
} | {
    shape: 'circle',
    startX: number,
    startY: number,
    radius: number,
}
    | {
        shape: 'pencil',
        startX: number,
        startY: number,
        clientX: number,
        clientY: number,
    }

let store: store[] = [];

function startDraw(canvas: HTMLCanvasElement, selectedTool: string | null, socket: WebSocket) {
    let ctx = canvas.getContext("2d");
    if (!ctx) return;

    socket.onmessage = function (event) {
        const { shape, startX, startY, width, height } = JSON.parse(event.data)

        if (shape === 'rect') {
            ctx!.setLineDash([5, 3]);
            ctx!.strokeRect(startX, startY, width, height);
        }
    }

    let clicked = false;
    let startX = 5;
    let startY = 5;

    const handleMousedown = (e: MouseEvent) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
        if (selectedTool === 'pencil') {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
        }
        ctx!.strokeStyle = 'black';
    };

    const handleMousemove = (e: MouseEvent) => {
        if (clicked) {
            let width = e.clientX - startX;
            let height = e.clientY - startY;
            ctx!.strokeStyle = 'black';
            ctx!.setLineDash([5, 3]);
            ctx!.lineJoin = 'round';
            ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

            if (store) {
                store.map((item) => {
                    if (item.shape === 'rect') {
                        ctx!.strokeRect(item.startX, item.startY, item.width, item.height);
                    }
                    if (item.shape === 'circle') {
                        ctx!.beginPath();
                        ctx!.arc(item.startX, item.startY, item.radius, 0, 6.283);
                        ctx!.stroke();
                    }

                });
            }

            if (selectedTool === 'rect') {
                ctx!.strokeRect(startX, startY, width, height);
            }
            else if (selectedTool === 'circle') {
                ctx!.beginPath();
                let radius = Math.abs(Math.max(width, height));
                ctx!.arc(startX, startY, radius, 0, Math.PI * 2);
                ctx!.stroke();
            }
            else if (selectedTool === 'pencil') {
                ctx.lineTo(e.clientX, e.clientY);
                ctx.stroke();
                console.log(startX, startY, e.clientX, e.clientY)
                store.push({ shape: 'pencil', startX: startX, startY: startY, clientX: e.clientX, clientY: e.clientY })
                console.log('store', store)
            }
        }
    };

    const handleMouseup = (e: MouseEvent) => {
        clicked = false;
        let width = e.clientX - startX;
        let height = e.clientY - startY;
        let radius = Math.abs(Math.max(width, height));
        ctx!.strokeStyle = 'black';

        if (selectedTool === 'rect') {
            store.push({ shape: 'rect', startX, startY, width, height });
            const shapeData = { type: 'shape', shape: { shape: 'rect', startX, startY, width, height } }
            socket.send(JSON.stringify(shapeData));
        }

        if (selectedTool === 'circle') {
            store.push({ shape: 'circle', startX, startY, radius });
        }

        if (selectedTool === 'pencil') {
            ctx.closePath()
            store.push({ shape: 'pencil', startX, startY, clientX: e.clientX, clientY: e.clientY });
        }

        if (store) {
            store.map((item) => {
                if (item.shape === 'rect') {
                    ctx!.strokeRect(item.startX, item.startY, item.width, item.height);

                }
                if (item.shape === 'circle') {
                    ctx!.beginPath();
                    ctx!.arc(item.startX, item.startY, item.radius, 0, 6.283);
                    ctx!.stroke();
                }
                if (item.shape === 'pencil') {
                    console.log('hello')
                    ctx!.beginPath();
                    ctx.lineTo(item.clientX, item.clientY)
                    ctx.stroke();
                }
            });
        }
    };

    canvas.addEventListener("mousedown", handleMousedown);
    canvas.addEventListener("mousemove", handleMousemove);
    canvas.addEventListener("mouseup", handleMouseup);

    return () => {
        canvas.removeEventListener("mousedown", handleMousedown);
        canvas.removeEventListener("mousemove", handleMousemove);
        canvas.removeEventListener("mouseup", handleMouseup);
    };
}

export default startDraw;