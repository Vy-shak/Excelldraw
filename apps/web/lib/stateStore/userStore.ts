import { create } from "zustand";

interface members {
    profileUrl: string,
    username: string
}
interface roomData {
    roomcode: string,
    roomname: string,
    members: members[]
}

interface store {
    roomData: roomData
    updateRoomdata: (roomData: roomData) => void
}

const useRoomdata = create<store>((set) => ({
    roomData: [],
    updateRoomdata: (roomData) => set(() => ({ roomData: roomData })),
}));

export default useRoomdata