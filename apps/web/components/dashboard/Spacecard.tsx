import React from 'react'
import Input from '../general/Input'
import Button from '../general/Button'


interface card {
    type: string,
    refer: React.RefObject<HTMLInputElement>
}

function SpaceCard({ type, refer }: card) {
    return (
        <div className='w-full flex justify-center items-center flex-col bg-white rounded-md'>
            <Input type='text' Size='normal' reference={refer} />
            <Button text='type' variant='primary' size='default' />
        </div>
    )
}

export default SpaceCard
