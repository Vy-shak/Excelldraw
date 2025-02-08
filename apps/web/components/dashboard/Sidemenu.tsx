import React from 'react';


interface navmenu {
    Icon: any,
    text: string
}


const Sidemenu = ({ Icon, text }: navmenu) => {
    return (
        <div className='w-full pl-3 rounded-md gap-x-3 flex justify-normal items-center h-8 bg-primaryGreen-500'>
            {Icon}
            <span className=' text-neutral-900 text-xs font-medium'>{text}</span>
        </div>
    )
}

export default Sidemenu
