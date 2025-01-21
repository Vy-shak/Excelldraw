import { WebSocketServer, WebSocket } from "ws"
import { authCheck } from "./auth";
import { prisma } from "@repo/db/client"

const wss = new WebSocketServer({ port: 8080 });

let allSocket = new Map();

interface channel {
    socket: WebSocket,
    userId: number
}

interface parsedData {
    type: 'chat' | 'join' | 'leave',
    message?: string
}

wss.on('connection', async function connection(socket, req) {
    socket.on('error', console.error);
    if (!req.url) return
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const token = urlParams.get('token');
    const roomcode = urlParams.get('roomcode');
    socket.send("you are connected to this room")


    if (!roomcode) {
        socket.send("your roomid does not exist");
        wss.close();
        return
    };
    const userId = authCheck(token as string);

    if (userId && roomcode) {
        if (typeof roomcode === "string") {
            const userDetail = prisma.user.findFirst({
                where: {
                    id: userId
                }
            });


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
        let channel = allSocket.get(roomcode);


        if (parsedData.type === 'join') {
            channel.map((item: channel) => {
                item.socket.send(`you are joined on the roomcode ${roomcode}`)
            })
        };

        if (parsedData.type === 'chat') {
            channel.map((item: channel) => {
                if (parsedData.message) {
                    item.socket.send(parsedData.message)
                }
            })
        };

        if (parsedData.type === 'leave') {
            channel = channel.filter((item: channel) => {
                item.userId !== userId
            });
        }
    });

})