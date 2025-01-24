import React from 'react'
import { Type, Pencil, MoveUpLeft, Square, Circle, Slash } from 'lucide-react';


function Toolbox() {
    return (
        <div className={`w-fit absolute cursor-pointer bottom-3 flex py-2 px-4 space-x-4 bg-white h-fit rounded-full border-2`}>
            <Square size={34} color='#7E8183' />
            <Circle size={34} color='#7E8183' />
            <Type size={34} color='#7E8183' />
            <Pencil size={34} color='#7E8183' />
            <Slash size={34} color='#7E8183' />
            <MoveUpLeft size={34} color='#7E8183' />
        </div>
    )
}

export default Toolbox
