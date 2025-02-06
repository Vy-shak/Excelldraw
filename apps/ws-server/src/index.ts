import { WebSocketServer, WebSocket } from "ws"
import { authCheck } from "./auth";
import { prisma } from "@repo/db/client"

const wss = new WebSocketServer({ port: 8080 });


interface channel {
    socket: WebSocket,
    userId: number
}

type shape = {
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

let allSocket = new Map();
let allDrawings: shape[] = [];

wss.on('connection', async function connection(socket, req) {
    socket.on('error', console.error);
    if (!req.url) return
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const token = urlParams.get('token');
    const roomcode = urlParams.get('roomcode');

    if (roomcode) {
        const roomexist = await prisma.rooms.findFirst({
            where: {
                roomCode: roomcode
            }
        });

        if (!roomexist) {
            socket.send("your roomid does not exist");
            wss.close();
            return
        };

        const userId = authCheck(token as string);

        if (!userId) {
            socket.send("your profile is not verified please login");
            wss.close();
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