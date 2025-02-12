import React from 'react'
import { Button } from '../../../components'

function Pricingcard() {
    return (
        <div className="w-full flex justify-start items-start flex-col py-6 gap-y-6 px-4 bg-white rounded shadow-md">
            <div className='w-full gap-y-3 flex justify-start items-start flex-col'>
                <div className='w-fit flex justify-start items-start flex-col gap-y-2'>
                    <div className="inline-block px-3 py-1 bg-neutral-950 text-white text-xs rounded-full ">
                        15% off
                    </div>

                    <h2 className="text-xl whitespace-nowrap text-neutral-900 font-bold">$250/mo</h2>
                </div>
                <div className='w-full flex justify-start items-start flex-col gap-y-3'>
                    <p className="text-neutral-500 text-xs mb-2">
                        Launch your dream site in days, not months.
                    </p>
                    <p className="font-medium text-xs text-neutral-500">
                        Perfect for small teams/startups
                    </p>
                </div>
                <Button variant='primary' text='Upgrade plan' size='md' />
            </div>
            <div className='gap-y-2 flex justify-start items-start flex-col  w-full'>
                <span className="text-neutral-900 text-xs font-semibold">Features</span>
                <ul className="space-y-2 flex justify-start items-start flex-col">
                    <li className="flex items-center text-xs text-neutral-900">
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Upto 20 room creation per day
                    </li>
                    <li className="flex items-center text-xs text-neutral-900">
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Unlimited saving capacity
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Pricingcard
