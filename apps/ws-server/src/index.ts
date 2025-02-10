import { WebSocketServer, WebSocket } from "ws"
import { validationCheck, addtoroom } from "./actions";

const wss = new WebSocketServer({ port: 8080 });

interface pencilPoints {
    x: number, y: number
}

type shapes = {
    type: 'rect',
    startX: number,
    startY: number,
    width: number,
    height: number,
    roomcode: string
} | {
    type: 'circle',
    startX: number,
    startY: number,
    radius: number,
    roomcode: string
} | {
    type: 'pencil',
    startX: number,
    startY: number,
    endPoints: pencilPoints[],
    roomcode: string
}


type chats = {
    type: 'chat',
    message: string,
    userName: string,
    url: string,
    roomcode: string
}
type clearShape = {
    type: "clearAll",
    roomcode: string
}

type parsedData = shapes | chats | clearShape


export interface roomDetails {
    socket: WebSocket,
    userId: number,
    roomname: string,
    username?: string,
    profileUrl?: string
}


export interface store {
    sockets: roomDetails[],
    shapes: shapes[],
    chats: chats[]
}

let store: Map<string, store> = new Map();

// Roomid:{ sockets:[],shapes:[],chats:[]}

wss.on('connection', async function connection(socket, req) {
    socket.on('error', console.error);
    socket.on('error', console.error);
    if (!req.url) return
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const token = urlParams.get('token');
    const roomcode = urlParams.get('roomcode');
    console.log("token", token)
    console.log("roomcode", roomcode)
    const roomDetails = await validationCheck(roomcode, token, wss, socket);


    if (!roomDetails) {
        wss.close()
    } else {
        addtoroom(socket, roomDetails, store)
    }


    socket.on('message', function message(data) {
        const parsedData: parsedData = JSON.parse(data as unknown as string);

        if (!parsedData) {
            const errorData = { type: 'error', message: 'null message recived' }
            socket.send(JSON.stringify(errorData));
        };

        if (parsedData.type === 'chat') {
            const members = store.get(parsedData.roomcode);
            const sockets = members?.sockets;
            store.get(parsedData.roomcode)?.chats.push(parsedData)
            const allMessages = store.get(parsedData.roomcode)?.chats
            sockets?.map((item: roomDetails) => {
                item.socket.send(JSON.stringify({ type: 'chat', chats: allMessages }))
            })
        }
        if (parsedData.type === 'clearAll') {
            const storeData = store.get(parsedData.roomcode);
            const length = storeData?.shapes.length
            const sockets = storeData?.sockets;
            store.get(parsedData.roomcode)?.shapes.splice(0, length);

            const allShapes = store.get(parsedData.roomcode)?.shapes;
            console.log(allShapes);
            sockets?.map((item: roomDetails) => {
                item.socket.send(JSON.stringify({ type: 'shape', shapes: allShapes }))
            })
        }
        if (parsedData.type === 'rect' || parsedData.type === 'circle' || parsedData.type === 'pencil') {
            const storeData = store.get(parsedData.roomcode);
            const sockets = storeData?.sockets;
            store.get(parsedData.roomcode)?.shapes.push(parsedData);

            const allShapes = store.get(parsedData.roomcode)?.shapes

            sockets?.map((item: roomDetails) => {
                item.socket.send(JSON.stringify({ type: 'shape', shapes: allShapes }))
            })
        }
    });
})
