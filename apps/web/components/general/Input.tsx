"use client"

import { Eye, EyeOff, Info } from "lucide-react"
import { useState } from "react";
interface inputType {
    varient: 'bio' | 'normal'
    title?: string,
    type: "text" | "password"
    Size: "medium" | "normal" | "bio",
    reference: React.RefObject<HTMLInputElement>;
    errMsg?: string,
    place?: string
}

const Constants = {
    size: {
        medium: "h-16 text-start items-start flex justify-start",
        normal: "h-10",
        bio: "min-h-16 max-h-fit"
    },
    type: {
        text: "text",
        password: "password"

    },
    varient: {
        bio: 'w-full align-top text-start items-start flex justify-start min-h-16 max-h-fit',
        normal: 'w-full h-8'
    }
}

function Input({ title, errMsg, varient, place, type, Size, reference }: inputType) {
    const [hidden, ishidden] = useState(false);
    const [change, setChange] = useState(type);


    const handleoff = () => {
        ishidden(false);
        setChange('password')
    }
    const handleon = () => {
        ishidden(true);
        setChange('text')
    }


    return (
        <div className='flex flex-col justify-start items-start w-full m-0 p-0'>
            {title && <label className="block mb-2 text-xs font-normal text-gray-600 ">{title}</label>}
            <div className="w-full h-fit  flex items-center justify-center">
                <input ref={reference} type={change === 'text' ? 'text' : "password"} id="first_name" className={`${Constants.size[Size]} ${Constants.varient[varient]} bg-neutral-100 placeholder:text-xs text-neutral-600  border border-gray-200 pl-2  text-sm rounded-md focus:outline-none   focus:outline-neutral-300 block `} placeholder={errMsg ? `${errMsg}` : `${place}`} required />
                {type === 'password' ? <>
                    {hidden ? <Eye onClick={handleoff} color="#808080" className="relative cursor-pointer right-6" /> : <EyeOff onClick={handleon} color="#808080" className="relative cursor-pointer right-6" />}
                </> : <Eye color="#808080" className="relative opacity-0 right-6" />}
                {errMsg && <Info className="relative right-2" color="red" />}
            </div>
        </div>
    )
}

export default Input