"use client"

import React from 'react'
import Button from "./button"
import { BadgePlus } from "lucide"

function Getrooms() {
    return (
        <div className='w-full h-fit rounded bg-white'>
            <span>Create room</span>
            <h4><span>Create room and </span><br /><span>start coloborating </span></h4>
            <Button startIcon={<BadgePlus />} text='Create room' />
        </div>
    )
}

export default Getrooms
