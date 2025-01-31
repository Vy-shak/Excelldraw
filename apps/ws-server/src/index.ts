import { WebSocketServer, WebSocket } from "ws"
import { authCheck } from "./auth";
import { prisma } from "@repo/db/client"

const wss = new WebSocketServer({ port: 8080 });

let allSocket = new Map();

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
    shape: 'pencil',
    startX: number,
    startY: number,
    clientX: number,
    clientY: number,
}

type parsedData = {
    type: 'chat',
    message: string,
} | { type: 'shape', shape: shape } | { type: 'join' } | { type: 'leave' }

wss.on('connection', async function connection(socket, req) {
    socket.on('error', console.error);
    if (!req.url) return
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const token = urlParams.get('token');
    const roomcode = urlParams.get('roomcode');

    if (roomcode) {
        const roomexist = prisma.rooms.findFirst({
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

        if (userId) {
            socket.send("your profile is not verified please login");
            wss.close();
        }

        if (userId && roomcode) {
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
                        item.socket.send(parsedData.message)
                    }

                    if (parsedData.type === 'shape') {
                        const shapeString = JSON.stringify(parsedData.shape)
                        console.log(shapeString)
                        item.socket.send(shapeString)
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