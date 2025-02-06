import React from 'react'
import { Video, FileClock } from "lucide-react"
import { SavedIcon } from '../../public'
import Image from 'next/image'
import Navmenu from './Sidemenu'


const SidebarData = [{
    id: 1,
    text: "Meet",
    icon: <Video />
}, {
    id: 2,
    text: "Saved",
    icon: <Image alt='saved icon' src={SavedIcon} />
}, {
    id: 3,
    text: "History",
    icon: <FileClock />
}]

const Sidebar = () => {
    return (
        <div className='w-36 pt-16 absolute space-y-2 py-2 top-0 left-0 h-full justify-start items-center flex flex-col bg-white'>
            {SidebarData.map((item) => (
                <Navmenu key={item.id} Icon={item.icon} text={item.text} />
            ))}
        </div>
    )
}

export default Sidebar
