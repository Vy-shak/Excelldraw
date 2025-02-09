
import { create } from "zustand";

type tools = "rect" | "circle" | "text" | "pencil"

interface store {
    tool: tools
    updateTool: (updatedTool: tools) => void

}

const useToolstore = create<store>((set) => ({
    tool: "rect",
    updateTool: (updatedTool) => set(() => ({ tool: updatedTool })),
}));

export default useToolstore