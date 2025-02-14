import { authCheck } from "./auth";
import { prisma } from "@repo/db/client"
import { WebSocketServer, WebSocket } from "ws";
import { store, roomDetails } from ".";




interface parseValidation {
    userId: number, roomCode: string, roomname: string, name: string, imgUrl: string
}

const validationCheck = async (roomcode: string | null, token: string | null, wss: WebSocketServer, socket: WebSocket) => {
    if (!roomcode) {
        const errMsg = { type: 'error', message: "no roomcode! please join again" }
        socket.send(JSON.stringify(errMsg));
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

    const userdetails = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })

    if (!userdetails) {
        const errMsg = { type: 'error', message: 'unable to get your userDetails please try again' }
        socket.send(JSON.stringify(errMsg));
        return
    }

    const { name, imgUrl } = userdetails

    const { roomname, roomCode } = roomexist;
    if (!roomCode && !roomname) {
        const errMsg = { type: 'error', message: 'unable to verify your profile please login again' }
        socket.send(JSON.stringify(errMsg));

    }

    return { userId, roomCode, roomname, name, imgUrl }
};


const addtoroom = (socket: WebSocket, roomDetails: parseValidation, store: Map<string, store>) => {
    const { userId, roomCode, roomname, name, imgUrl } = roomDetails
    console.log(roomDetails);
    let exist = false
    const roomData: roomDetails = { socket: socket, userId: userId, roomname: roomname, username: name, profileUrl: imgUrl };
    if (!store.has(roomCode)) {
        const value: store = {
            sockets: [roomData],
            shapes: [],
            chats: []
        };
        store.set(roomCode, value);
    }
    else {
        store.get(roomCode)!.sockets.map((item) => {
            if (item.userId === userId) {
                exist = true
                console.log("socket coming")
                item = { userId: userId, roomname: roomname, socket: socket, profileUrl: imgUrl }
            }
        });
        if (!exist) {
            const userDetails = { userId: userId, roomname: roomCode, socket: socket, profileUrl: imgUrl }
            store.get(roomCode)?.sockets.push(userDetails)
        }
    };

    const members = store.get(roomCode)
    const roomSuccess = { type: 'join', roomcode: roomCode, roomname: roomname, members: members?.sockets };
    socket.send(JSON.stringify(roomSuccess))

}

export { validationCheck, addtoroom }