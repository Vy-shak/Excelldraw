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
    if (!roomcode) {
        socket.send("your roomid does not exist");
        wss.close();
        return
    };

    if (typeof roomcode === "string") {
        allSockets.push({ roomId: roomcode, socket: socket });
    }

    socket.on('message', function message(data) {
        allSockets.map((item) => {
            if (item.roomId === roomcode) {
                item.socket.send(data.toString())
            }
        })
    });

})