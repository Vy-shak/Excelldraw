import { WebSocketServer, WebSocket } from "ws"

const wss = new WebSocketServer({ port: 8080 });

let allSocket = new Map();

interface parsedData {
    type: 'chat' | 'join',
    message?: string
}

wss.on('connection', function connection(socket, Request) {
    socket.on('error', console.error);
    const roomcode = Request.headers["roomcode"];
    if (!roomcode) {
        socket.send("your roomid does not exist");
        wss.close();
        return
    };

    if (typeof roomcode === "string") {
        if (allSocket.has(roomcode)) {
            let channel = allSocket.get(roomcode);
            channel.push(socket);
            allSocket.set(roomcode, channel);
        }
        else {
            allSocket.set(roomcode, [socket]);
        }
    }

    socket.on('message', function message(data) {
        const parsedData: parsedData = JSON.parse(data as unknown as string);

        const channel = allSocket.get(roomcode);
        if (parsedData.type === 'join') {
            channel.map((item: WebSocket) => {
                item.send(`you are joined on the roomcode ${roomcode}`)
            })
        }
        if (parsedData.type === 'chat') {
            channel.map((item: WebSocket) => {
                if (parsedData.message) {
                    item.send(parsedData.message)
                }
            })
        }
    });

})