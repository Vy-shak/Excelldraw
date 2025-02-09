import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";

interface chats {
    type: "chat",
    message: string,
    userName: string,
    url: string,
    roomcode: string
};

interface store {
    chats: chats[] | [],
    updateChats: (chats: chats[]) => void

}

const useChatsStore = create<store>((set) => ({
    chats: [],
    updateChats: (chats) => set(() => ({ chats: chats })),
}));

export default useChatsStore;


