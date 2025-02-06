import React from 'react';


interface navmenu {
    Icon: any,
    text: string
}


const Sidemenu = ({ Icon, text }: navmenu) => {
    return (
        <div className='w-full pl-3 space-x-3 flex justify-normal items-center h-8 bg-green-400'>
            {Icon}
            <span className='text-sm font-medium'>{text}</span>
        </div>
    )
}

export default Sidemenu
