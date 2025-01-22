"use client"

import React from 'react'
import Button from "@repo/ui/Button"
import Input from '@repo/ui/Inputbox'
import Google from "@repo/ui/GoogleSign"
import { useRef } from 'react'
import { useState } from "react";


function Signup() {
    const [isSignup, setSignup] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmpassRef = useRef<HTMLInputElement>(null);



    async function handleSignup() {
        const name = nameRef.current?.value
        const password = passwordRef.current?.value
        const confirmpass = confirmpassRef.current?.value
        const email = emailRef.current?.value
    }
    return (
        <section className='w-full px-8 py-4 flex justify-end items-center'>
            <div className="flex w-1/2 flex-col space-y-4 px-6  h-fit rounded-lg  bg-neutral-900 py-4">
                <div className="w-full">
                    <h5 className="text-lg font-Kanit font-bold text-white">Welcome to x application</h5>
                    <p className=" text-neutral-300 text-sm">Login if you have already an account</p>
                </div>
                <div className="flex justify-between items-center w-full space-x-8">
                    <Input Size='normal' reference={nameRef} title='name' />
                </div>
                <div className="flex justify-center flex-col items-center">
                    <Input Size='normal' reference={emailRef} title='email' />
                    <Input Size='normal' reference={passwordRef} title='password' />
                    <Input Size='normal' reference={confirmpassRef} title='confirm pass' />
                </div>
                <div className="w-full px-24 mt-4">
                    <Button variant="primary" text="Signup" size="md" />
                </div>
                <Google />
            </div>
        </section>
    )
}

export default Signup
