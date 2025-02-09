import React from 'react'
import Button from '../general/Button'
import axios from 'axios'
import { MessageCircle } from "lucide-react"

interface roomData {
    roomname: string,
    roomcode: string
}

function Topbar({ details }) {

    return (
        <div className='w-full py-2 px-4 absolute top-0 flex justify-between h-fit bg-white  border-gray-100 border-b-2'>
            {details && <span className='text-neutral-700 font-semibold text-lg text-medium'>{details.roomname}</span>}
            <div className='flexCenter w-fit space-x-3'>
                <Button variant='primary' text='Share space' size='default' />
                <Button variant='secondary' text='Save' size='default' />
            </div>
        </div>
    )
}

export default Topbar
