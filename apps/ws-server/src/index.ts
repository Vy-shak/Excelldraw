import { WebSocketServer, WebSocket } from "ws"
import { validationCheck, addtoroom } from "./actions";

const wss = new WebSocketServer({ port: 8080 });


type parsedData = {
    type: 'chat',
    message: string,
    userName: string,
    url: string,
    roomcode: string
} | {
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
}


interface roomDetails {
    socket: WebSocket,
    userId: number,
    roomname: string,
    username?: string,
    profileUrl?: string
}


interface store {
    sockets: roomDetails[],
    shapes: [],
    chats: []
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

            sockets?.map((item: roomDetails) => {
                item.socket.send(JSON.stringify(parsedData))
            })
        }
        if (parsedData.type === 'rect' || 'circle') {
            const storeData = store.get(parsedData.roomcode);
            const sockets = storeData?.sockets;
            const allShapes = storeData?.shapes

            sockets?.map((item: roomDetails) => {
                item.socket.send(JSON.stringify(allShapes))
            })
        }
    });
})
