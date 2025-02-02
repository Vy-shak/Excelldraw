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
} | {
    shape: 'text',
    startX: number,
    startY: number,
    text: string,
} | {
    shape: 'pencil',
    startX: number,
    startY: number,
    clientX: number,
    clientY: number,
}

let store: store[] = [];

function renderAll(ctx: CanvasRenderingContext2D) {
    store.map((item) => {
        if (item.shape === 'rect') {
            ctx!.strokeStyle = 'black';
            ctx!.setLineDash([5, 3]);
            ctx!.strokeRect(item.startX, item.startY, item.width, item.height);
        }
        if (item.shape === 'circle') {
            ctx!.strokeStyle = 'black';
            ctx!.beginPath();
            ctx!.arc(item.startX, item.startY, item.radius, 0, 6.283);
            ctx!.stroke();
        }
        if (item.shape === 'text') {
            ctx!.font = "16px Arial";
            ctx!.fillStyle = "black";
            ctx!.fillText(item.text, item.startX, item.startY);
        }
    })
}

function Socketmsg(canvas: HTMLCanvasElement, shapes: any) {

    console.log("we are working", shapes)
    let ctx = canvas.getContext("2d");
    shapes.map((item) => {
        const { shape, startX, startY, width, height, radius, text } = item
        if (shape === 'rect') {
            ctx!.strokeStyle = 'black';
            ctx!.setLineDash([5, 3]);
            ctx!.strokeRect(startX, startY, width, height);
        }
        if (shape === 'circle') {
            ctx!.strokeStyle = 'black';
            ctx!.beginPath();
            ctx!.arc(startX, startY, radius, 0, 6.283);
            ctx!.stroke();
        }
        if (shape === 'text') {
            ctx!.font = "16px Arial";
            ctx!.fillStyle = "black";
            ctx!.fillText(text, startX, startY);
        }
    })
}

function startDraw(canvas: HTMLCanvasElement, selectedTool: string | null, socket: WebSocket,) {
    console.log("we got socket i shape", socket)
    console.log('currenttoolsss', selectedTool)
    let ctx = canvas.getContext("2d");
    if (!ctx) return;

    let clicked = false;
    let startX = 5;
    let startY = 5;
    let text = '';

    const handleText = (e: KeyboardEvent) => {
        if (selectedTool === 'text') {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            renderAll(ctx)
            ctx.font = "16px Arial";
            ctx.fillStyle = "black";
            if (e.key === 'Backspace') {
                text = text.slice(0, -1);
                ctx.fillText(text + '|', startX, startY);
            }
            if (/^[a-zA-Z0-9]$/.test(e.key)) {
                text = text + e.key
                ctx.fillText(text + '|', startX, startY);
            }
            else {
                ctx.fillText(text + '|', startX, startY);
            }
            const details = { type: 'shape', shape: { shape: 'text', text: text, startX, startY } }
            socket.send(JSON.stringify(details))
        }
    }

    const handleMousedown = (e: MouseEvent) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
        if (text) {
            text = '';
        }
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
            // store.push({ shape: 'rect', startX, startY, width, height });
            const shapeData = { type: 'shape', shape: { shape: 'rect', startX, startY, width, height } }
            socket.send(JSON.stringify(shapeData));
        }

        if (selectedTool === 'circle') {
            // store.push({ shape: 'circle', startX, startY, radius });
            const shapeData = { type: 'shape', shape: { shape: 'circle', startX, startY, radius } }
            socket.send(JSON.stringify(shapeData));
        }

        if (selectedTool === 'pencil') {
            ctx.closePath()
            store.push({ shape: 'pencil', startX, startY, clientX: e.clientX, clientY: e.clientY });
        }
        if (selectedTool === 'text') {
            ctx.fillText('|', startX, startY);
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
    canvas.addEventListener("keydown", handleText);
    canvas.tabIndex = 0;
    canvas.focus();

    return () => {
        canvas.removeEventListener("mousedown", handleMousedown);
        canvas.removeEventListener("mousemove", handleMousemove);
        canvas.removeEventListener("mouseup", handleMouseup);
        canvas.removeEventListener("keydown", handleText);
    };
}

export default startDraw;
export { Socketmsg }