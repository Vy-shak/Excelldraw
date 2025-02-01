import React, { useState } from 'react'
import Input from '../general/Input'
import { useRef } from 'react'
import { Send, ChevronRight, MessageSquare } from "lucide-react"
function Chatbox() {
    const MessageRef = useRef<HTMLInputElement>(null)
    const msg = ['kdfkj']
    const [isChat, setIschat] = useState(false);


    const openChatbox = () => {
        setIschat(true)
    }
    const closeChatbox = () => {
        setIschat(false)
    }

    return (
        <>
            {!isChat && <div onClick={openChatbox} className='absolute w-fit h-fit right-2 top-1/2 '>
                <MessageSquare color='black' />
            </div>}
            {isChat && <div className='flexCenter h-full absolute right-0'>
                <div onClick={closeChatbox} className='w-6 h-10  rounded border-2 flexCenter bg-white'>
                    <ChevronRight color='black' />
                </div>
                <div className='h-full pt-12'>
                    <div className='h-full border--2 pl-3 pt-7 pb-4 bg-white flex flex-col justify-between items-start '>
                        <div>

                        </div>
                        <div>
                            {msg.map((item) => (
                                <div key={1} className='text-black'>{item}</div>
                            ))}
                        </div>
                        <div className='flexCenter pr-4 w-fit h-fit'>
                            <Input place='Type a message' type='text' Size='normal' reference={MessageRef} />
                            <div className='w-fit h-fit p-2 bg-green-400 rounded'>
                                <Send color='white' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>

    )
}

export default Chatbox
