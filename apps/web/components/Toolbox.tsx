import React, { Dispatch, SetStateAction } from 'react'
//@ts-ignore
import { Type, Pencil, MoveUpLeft, Square, Circle, Slash } from 'lucide-react';
import startDraw from '../app/draw';


interface ToolBox {
    setSelection: Dispatch<SetStateAction<string>>,
    select: string

}



function Toolbox({ setSelection, select }: ToolBox) {
    return (
        <div className={`w-fit absolute cursor-pointer bottom-2 flex py-2 px-4 space-x-4 bg-white h-fit rounded-full border-2`}>
            <Square onClick={() => setSelection('rect')} size={34} color={select === 'rect' ? '#34eb4c' : '#7E8183'} />
            <Circle onClick={() => setSelection('circle')} size={34} color={select === 'circle' ? '#34eb4c' : '#7E8183'} />
            <Type size={34} onClick={() => setSelection('text')} color={select === 'text' ? '#34eb4c' : '#7E8183'} />
            <Pencil size={34} onClick={() => setSelection('pencil')} color={select === 'pencil' ? '#34eb4c' : '#7E8183'} />
            <Slash size={34} onClick={() => setSelection('line')} color={select === 'line' ? '#34eb4c' : '#7E8183'} />
            <MoveUpLeft onClick={() => setSelection('arrow')} size={34} color={select === 'arrow' ? '#34eb4c' : '#7E8183'} />
        </div>
    )
}

export default Toolbox