import { WebSocketServer, WebSocket } from "ws"
import { authCheck } from "./auth";
import { prisma } from "@repo/db/client"

const wss = new WebSocketServer({ port: 8080 });


interface channel {
    socket: WebSocket,
    userId: number
}

type shape = {
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
    type: 'chat',
    message: string,
    userName: string,
    url: string,
}


type parsedData = {
    type: 'chat',
    message: string,
    userName: string,
    url: string,
} | { type: 'shape', shape: shape } | { type: 'join' } | { type: 'leave' } | { type: 'clearAll' }

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
let allDrawings: shape[] = [];

wss.on('connection', async function connection(socket, req) {
    socket.on('error', console.error);
    if (!req.url) return
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const token = urlParams.get('token');
    const roomcode = urlParams.get('roomcode');

    const validationCheck = async (roomcode: string | null, token: string | null, wss: WebSocketServer, socket: WebSocket) => {
        if (!roomcode) {
            const errMsg = { type: 'error', message: "no roomcode! please join again" }
            socket.send(JSON.stringify(errMsg));
            wss.close();
            return null
        }

        if (!token) {
            const errMsg = { type: 'error', message: "no tolen! please login again" }
            socket.send(JSON.stringify(errMsg));
            wss.close();
            return null
        }

        const roomexist = await prisma.rooms.findFirst({
            where: {
                roomCode: roomcode
            }
        });

        if (!roomexist) {
            const errMsg = { type: 'error', message: 'your roomid does not exist' }
            socket.send(JSON.stringify(errMsg));
            wss.close();
            return null
        }

        const userId = authCheck(token as string);

        if (!userId) {
            const errMsg = { type: 'error', message: 'unable to verify your profile please login again' }
            socket.send(JSON.stringify(errMsg));
            wss.close();
            return null
        };
        const { roomname, roomCode } = roomexist;
        return { userId, roomCode, roomname }
    };
    const roomDetails = validationCheck(roomcode, token, wss, socket);

    if (!roomDetails) wss.close();

    const addtoroom = (socket: WebSocket, roomDetails:) => {
        const { userId, roomCode, roomname } = roomDetails
        const roomData: roomDetails = { socket: socket, userId: userId, roomname: roomname };
        if (!store.has(roomCode)) {
            const value: store = {
                sockets: [roomData],
                shapes: [],
                chats: []
            };

            store.set(roomCode, value)
        }
    }

    if (userId && roomcode) {
        const { roomname, roomCode } = roomexist;
        const authData = [{ type: 'join', roomname: roomname, roomCode: roomCode }]
        socket.send(JSON.stringify(authData));

        if (typeof roomcode === "string") {
            if (allSocket.has(roomcode)) {
                let channel = allSocket.get(roomcode);
                channel.push({ socket: socket, userId: userId });
                allSocket.set(roomcode, channel);
            }
            else {
                allSocket.set(roomcode, [{ socket: socket, userId: userId }]);
            }
        }
    }
    socket.on('message', function message(data) {
        const parsedData: parsedData = JSON.parse(data as unknown as string);
        console.log(parsedData)
        let channel = allSocket.get(roomcode);

        if (parsedData) {
            channel.map((item: channel) => {
                if (parsedData.type === 'chat') {
                    allDrawings.push(parsedData)
                    const allChatstring = JSON.stringify(allDrawings)
                    item.socket.send(allChatstring)
                }

                if (parsedData.type === 'shape') {
                    allDrawings.push(parsedData.shape);
                    item.socket.send(JSON.stringify(allDrawings))
                }
                if (parsedData.type === 'clearAll') {
                    console.log("hello")
                    allDrawings = [];
                    item.socket.send(JSON.stringify(allDrawings))
                }

                if (parsedData.type === 'leave') {
                    channel = channel.filter((item: channel) => {
                        item.userId !== userId
                    });
                }
            })
        }
    });
}


})