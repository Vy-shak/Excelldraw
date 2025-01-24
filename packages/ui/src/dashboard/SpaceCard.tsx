import React from 'react'
import Input from '../Input'
import Button from '../Button'


interface card {
    type: string,
    refer: React.RefObject<HTMLInputElement>
}

function SpaceCard({ type, refer }: card) {
    return (
        <div className='w-full flex justify-center items-center flex-col bg-white rounded-md'>
            <Input type='text' Size='normal' reference={refer} />
            <Button text='type' variant='primary' size='md' />
        </div>
    )
}

export default SpaceCard
