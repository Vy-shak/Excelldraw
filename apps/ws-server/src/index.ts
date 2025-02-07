import { WebSocketServer, WebSocket } from "ws"
import { validationCheck, addtoroom } from "./actions";

const wss = new WebSocketServer({ port: 8080 });




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

    const roomDetails = await validationCheck(roomcode, token, wss, socket);


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
