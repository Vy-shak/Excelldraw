import { Eye, EyeClosed } from "lucide-react"
import { useState } from "react";
interface inputType {
    title?: string,
    type: "default" | "password"
    Size: "medium" | "normal",
    reference: React.RefObject<HTMLInputElement>;
}

const Constants = {
    size: {
        medium: "h-16 text-start items-start flex justify-start",
        normal: "h-10"
    },
    type: {
        default: "text",
        password: "password"

    }
}

function Input({ title, type, Size, reference }: inputType) {
    const [hidden, ishidden] = useState(false);
    const [change, setChange] = useState(true);


    return (
        <div className='flex flex-col justify-start items-start w-full m-0 p-0'>
            {title && <label className="block mb-2 text-xs font-normal text-gray-600 ">{title}</label>}
            <div className="w-full h-fit flex items-center justify-center">
                <input ref={reference} type={change ? 'text' : "password"} id="first_name" className={`${Constants.size[Size]} bg-neutral-100 placeholder:text-xs text-neutral-500 border border-gray-200 pl-2  text-sm rounded-md focus:outline-none   focus:outline-neutral-300 block w-full h-8`} placeholder={"write here"} required />
                {type === 'password' ? <>
                    {hidden ? <Eye onClick={() => {
                        ishidden(false);
                        setChange(false)
                    }} color="black" className="relative right-6" /> : <EyeClosed onClick={() => {
                        ishidden(true)
                        setChange(true)
                    }} color="black" className="relative right-6" />}
                </> : <Eye color="#F0EFEF" className="relative  right-6" />}
            </div>
        </div>
    )
}

export default Input