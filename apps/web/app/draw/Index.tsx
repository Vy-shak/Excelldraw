interface pencilPoints {
    endX: number, endY: number
}


type storeT = {
    type: 'rect',
    startX: number,
    startY: number,
    width: number,
    height: number
} | {
    type: 'circle',
    startX: number,
    startY: number,
    radius: number,
} | {
    type: 'text',
    startX: number,
    startY: number,
    text: string,
} | {
    type: 'pencil',
    startX: number,
    startY: number,
    endPoints: pencilPoints[],
    roomcode: string
}

let globalshapes: any[] = [];
let globalPencil: any[] = [];


function renderpencil(ctx: CanvasRenderingContext2D) {

}


function Socketmsg(canvas: HTMLCanvasElement, shapes: storeT[]) {

    console.log("we are working", shapes)
    let ctx = canvas.getContext("2d");
    console.log("allshapes", shapes)
    globalshapes = shapes;
    if (shapes.length < 1) {
        ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    shapes.map((item) => {
        const { startX, startY }: storeT = item;
        if (item.type === 'rect') {
            ctx!.strokeStyle = 'black';
            ctx!.setLineDash([5, 3]);
            ctx!.strokeRect(startX, startY,item.width , item.height);
        }
        if (item.type === 'circle') {
            ctx!.strokeStyle = 'black';
            ctx!.beginPath();
            ctx!.arc(startX, startY, item.radius, 0, 6.283);
            ctx!.stroke();
            ctx!.closePath();
        }
        if (item.type === 'text') {
            ctx!.font = "16px Arial";
            ctx!.fillStyle = "black";
            ctx!.fillText(item.text, startX, startY);
        };

        if (item.type === 'pencil') {
            ctx!.strokeStyle = 'black';
            console.log("the itemspencil", item)
            ctx!.beginPath();
            ctx!.moveTo(item.startX, item.startY);
            item.endPoints.map((val) => {
                console.log(val.endX, val.endY)
                ctx!.lineTo(val.endX, val.endY)
            })
            ctx?.stroke()
            ctx!.closePath()
        }
    })
}
function RenderAll(ctx: CanvasRenderingContext2D, shapes: storeT[]) {

    if (shapes.length < 1) {
        ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    shapes.map((item) => {
        const { startX, startY, }: storeT = item
        if (item.type === 'rect') {
            ctx!.strokeStyle = 'black';
            ctx!.setLineDash([5, 3]);
            ctx!.strokeRect(startX, startY, item.width, item.height);
        }

        if (item.type === 'text') {
            ctx!.font = "16px Arial";
            ctx!.fillStyle = "black";
            ctx!.fillText(item.text, startX, startY);
        };

    })
}

function startDraw(canvas: HTMLCanvasElement, selectedTool: string | null, socket: WebSocket, roomcode: string) {
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
            console.log(e)
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            Socketmsg(canvas, globalshapes)
            ctx.font = "16px Arial";
            ctx.fillStyle = "black";
            if (e.key === 'Backspace') {
                text = text.slice(0, -1);
                ctx.fillText(text + '|', startX, startY);
            }
            if (e.code === 'Space') {
                text = text.slice(0, -1) + " "
                ctx.fillText(text + '|', startX, startY);
            }
            if (/^[a-zA-Z0-9]$/.test(e.key)) {
                text = text + e.key
                ctx.fillText(text + '|', startX, startY);
            }
            else {
                ctx.fillText(text + '|', startX, startY);
            }
            if (e.key === 'Enter') {
                const details = { type: 'text', text: text, startX: startX, startY: startY, roomcode: roomcode }
                socket.send(JSON.stringify(details));
            }
        }
    }

    const handleMousedown = (e: MouseEvent) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
        if (selectedTool === 'pencil') {
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(startX, startY);
        }
        if (text) {
            text = '';
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
            RenderAll(ctx, globalshapes)
            renderpencil(ctx)

            if (selectedTool === 'rect') {
                ctx!.strokeRect(startX, startY, width, height);
            }
            else if (selectedTool === 'circle') {
                ctx!.beginPath();
                let radius = Math.abs(Math.max(width, height));
                ctx!.arc(startX, startY, radius, 0, Math.PI * 2);
                ctx!.stroke();
            }
            if (selectedTool === 'pencil') {
                ctx.lineTo(e.clientX, e.clientY);
                globalPencil.push({ endX: e.clientX, endY: e.clientY })
                ctx.stroke();
            }
            else if (selectedTool === 'eraser') {
                ctx!.fillStyle = 'black';
                ctx!.fillRect(startX, startY, 50, 50);
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
            const shapeData = { type: 'rect', startX, startY, width, height, roomcode: roomcode }
            socket.send(JSON.stringify(shapeData));
        }

        if (selectedTool === 'circle') {
            // store.push({ shape: 'circle', startX, startY, radius });
            ctx.closePath()
            const shapeData = { type: 'circle', startX, startY, radius, roomcode: roomcode }
            socket.send(JSON.stringify(shapeData));
        }
        if (selectedTool === 'pencil') {
            ctx.closePath();
            const details = { type: 'pencil', startX: startX, startY: startY, endPoints: globalPencil, roomcode: roomcode }
            socket.send(JSON.stringify(details))
            globalPencil = [];
        }

        if (selectedTool === 'text') {
            ctx.fillText('|', startX, startY);
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