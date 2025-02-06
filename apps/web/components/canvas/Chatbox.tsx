"use client"

import React, { useState } from 'react'
import Input from '../general/Input'
import { useRef } from 'react'
import { Send, ChevronRight, MessageSquare } from "lucide-react"
import Messagebox from './Messagebox'
import { useAppSelector } from '../../lib/store/hook'

interface chatbox {
    socket: WebSocket,
    username: string,
    url: string
}

function Chatbox({ socket, url, username }: chatbox) {
    const chats = useAppSelector((state) => state.message)
    const MessageRef = useRef<HTMLInputElement>(null);
    console.log('got the socket in chat', socket)
    const msg = ['kdfkj']
    const [isChat, setIschat] = useState(false);

    console.log("alldata", chats)

    const openChatbox = () => {
        setIschat(true)
    }
    const closeChatbox = () => {
        setIschat(false)
    }


    const sendMessage = () => {
        console.log('clicked chat')
        socket.send(JSON.stringify({ type: 'chat', message: MessageRef.current?.value, userName: username, url: url }));
        if (MessageRef.current?.value) {
            MessageRef.current.value = '';
        }
    }

    return (
        <>
            {!isChat && <div onClick={openChatbox} className='absolute bg-white px-2 py-1 rounded border-2 w-fit h-fit right-2 top-1/2 '>
                <MessageSquare color='black' />
            </div>}
            {isChat && <div className='flexCenter z-20 h-full absolute right-0'>
                <div onClick={closeChatbox} className='w-6 h-10  rounded border-2 flexCenter bg-white'>
                    <ChevronRight color='black' />
                </div>
                <div className='h-full pt-12'>
                    <div className='h-full border--2 pl-3 pt-7 pb-4 bg-white flex flex-col justify-between items-start '>
                        <div>
                            <div className='w-full space-y-2 flex flex-col justify-start items-start'>
                                {chats.map((item, index) => {
                                    if (item.type === 'chat') {
                                        return (
                                            <Messagebox author={item.userName} message={item.message} url={item.url} key={index} />
                                        )
                                    }
                                })}
                            </div>
                        </div>
                        <div className='flexCenter pr-4 w-fit h-fit'>
                            <Input varient='normal' place='Type a message' type='text' Size='normal' reference={MessageRef} />
                            <div onClick={sendMessage} className='w-fit h-fit p-2 bg-green-400 rounded'>
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
