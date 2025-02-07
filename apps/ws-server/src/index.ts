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
    if (!req.url) return
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const token = urlParams.get('token');
    const roomcode = urlParams.get('roomcode');

    const roomDetails = await validationCheck(roomcode, token, wss, socket);


    socket.on('message', function message(data) {

        if (roomDetails) {
            addtoroom(socket, roomDetails, store)
        }
    });
})
