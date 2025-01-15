import { WebSocketServer } from "ws"

const wss = new WebSocketServer({ port: 8080 });

let allSockets = [];

wss.on('connection', function connection(socket) {
    socket.on('error', console.error);
    allSockets.push(socket);

    socket.on('message', function message(data) {
        console.log('received', data);
        allSockets.map((item) => {
            item.send(data.toString())
        })
    });

})