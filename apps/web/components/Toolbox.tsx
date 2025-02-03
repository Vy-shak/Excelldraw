"use client"

import React, { Dispatch, SetStateAction } from 'react'
import { Type, Pencil, MoveUpLeft, Square, Circle, Slash, Eraser, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../lib/store/hook';
import { toolSwitch } from '../lib/store/draw/toolSlice';



function Toolbox() {
    const selectedTool = useAppSelector((state) => state.tool)
    const dispatch = useAppDispatch();

    const handleSelection = (tool: string) => {
        dispatch(toolSwitch(tool))
    }
    return (
        <div className={`w-fit absolute cursor-pointer bottom-2 flex py-2 px-4 space-x-4 bg-white h-fit rounded-full border-2`}>
            <Square onClick={() => handleSelection('rect')} size={34} color={selectedTool === 'rect' ? '#34eb4c' : '#7E8183'} />
            <Circle onClick={() => handleSelection('circle')} size={34} color={selectedTool === 'circle' ? '#34eb4c' : '#7E8183'} />
            <Type size={34} onClick={() => handleSelection('text')} color={selectedTool === 'text' ? '#34eb4c' : '#7E8183'} />
            <Pencil size={34} onClick={() => handleSelection('pencil')} color={selectedTool === 'pencil' ? '#34eb4c' : '#7E8183'} />
            <Trash2 size={34} onClick={() => handleSelection('clearAll')} color={selectedTool === 'clearAll' ? '#34eb4c' : '#7E8183'} />
            <MoveUpLeft onClick={() => handleSelection('arrow')} size={34} color={selectedTool === 'arrow' ? '#34eb4c' : '#7E8183'} />
        </div>
    )
}

export default Toolbox