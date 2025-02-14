import React from 'react'
import Button from '../general/Button'
import useRoomdata from '../../lib/stateStore/userStore'
import Members from './Members'


function Topbar() {
    const roomData = useRoomdata((state) => state.roomData)
    return (
        <div className='w-full py-2 px-4 absolute top-0 flex justify-between h-fit bg-white  border-gray-100 border-b-2'>
            {roomData && <span className='text-neutral-700 font-semibold text-lg text-medium'>{roomData.roomname}</span>}
            {<Members />}
            <div className='flexCenter w-fit space-x-3'>
                <Button variant='primary' text='Share space' size='default' />
                <Button variant='secondary' text='Save' size='default' />
            </div>
        </div>
    )
}

export default Topbar
