import { WebSocketServer, WebSocket } from "ws"
import { authCheck } from "./auth";
import { prisma } from "@repo/db/client"

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

interface parseValidation {
    userId: number, roomCode: string, roomname: string
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

    const addtoroom = (socket: WebSocket, roomDetails: parseValidation) => {
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
        else {
            store.get(roomCode)!.sockets.push(roomData)
        }
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
