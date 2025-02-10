"use client"

import React from 'react';
import { Type, Pencil, MoveUpLeft, Square, Circle, Slash, Eraser, Trash2 } from 'lucide-react';
import useToolstore from '../lib/stateStore/toolStore';



type tools = "rect" | "circle" | "text" | "pencil" | "clearAll";

interface toolbox {
    socket: WebSocket,
    roomcode: string
}

function Toolbox({ socket, roomcode }: toolbox) {
    const selectedTool = useToolstore((state) => state.tool);
    const updateTool = useToolstore((state) => state.updateTool);

    const handleSelection = (tool: tools) => {
        updateTool(tool);
        if (tool === 'clearAll') {
            const details = { type: "clearAll", roomcode: roomcode }
            socket.send(JSON.stringify(details))
        }
    }
    return (
        <div className={`w-fit absolute cursor-pointer bottom-2 flex py-2 px-4 space-x-4 bg-white h-fit rounded-full border-2`}>
            <Square onClick={() => handleSelection('rect')} size={34} color={selectedTool === 'rect' ? '#34eb4c' : '#7E8183'} />
            <Circle onClick={() => handleSelection('circle')} size={34} color={selectedTool === 'circle' ? '#34eb4c' : '#7E8183'} />
            <Type size={34} onClick={() => handleSelection('text')} color={selectedTool === 'text' ? '#34eb4c' : '#7E8183'} />
            <Pencil size={34} onClick={() => handleSelection('pencil')} color={selectedTool === 'pencil' ? '#34eb4c' : '#7E8183'} />
            <Trash2 size={34} onClick={() => handleSelection('clearAll')} color={selectedTool === 'clearAll' ? '#34eb4c' : '#7E8183'} />
            <MoveUpLeft size={34} />
        </div>
    )
}

export default Toolbox