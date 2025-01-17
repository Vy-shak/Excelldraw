import { WebSocketServer, WebSocket } from "ws"

const wss = new WebSocketServer({ port: 8080 });

interface rooms {
    roomId: string,
    socket: WebSocket
}

interface msg {
    type: 'join' | 'chat',
}

let allSockets: rooms[] = [];

wss.on('connection', function connection(socket, Request) {
    socket.on('error', console.error);
    const roomcode = Request.headers["roomcode"];
    socket.send("you are connected");
    if (typeof roomcode === "string") {
        allSockets.push({ roomId: roomcode, socket: socket });
    }

    socket.on('message', function message(data) {
        const parsedData = JSON.parse(data.toString())
        allSockets.map((item) => {
            item.socket.send(data.toString())
        })
    });

})