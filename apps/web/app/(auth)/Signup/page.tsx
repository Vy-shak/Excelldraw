"use client";
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from "@repo/ui/Button";
import Input from '@repo/ui/Inputbox';
import axios from 'axios';

function Signup() {
    const [isSignup, setSignup] = useState(false);

    const router = useRouter()

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmpassRef = useRef<HTMLInputElement>(null);

    async function handleSignup() {
        const name = nameRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmpass = confirmpassRef.current?.value;
        const email = emailRef.current?.value;
        console.log('pass', password, 'confirmpass', confirmpass)
        if (confirmpass !== password) return;

        try {
            const signupData = await axios.post("http://localhost:3002/user/signup", {
                name,
                password,
                email
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (signupData.data.msg === 'signup done') {
                router.push('/login')
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='w-full pt-5 px-8'>
            <div className="flex w-full flex-col space-y-4 px-6 h-fit rounded-lg bg-white py-4">
                <div className="w-full">
                    <h5 className="text-lg text-neutral-800 font-bold">
                        <span>Get Started with ChalkSync</span><br />
                        <span> Sign Up Now!</span>
                    </h5>
                </div>
                <div className="flex justify-center space-y-3 flex-col items-center">
                    <Input Size='normal' reference={nameRef} type='default' title='name' />
                    <Input Size='normal' reference={emailRef} type='default' title='email' />
                    <Input Size='normal' reference={passwordRef} type='password' title='password' />
                    <Input Size='normal' reference={confirmpassRef} type='password' title='confirm password' />
                </div>
                <div className="w-full px-24 mt-4">
                    <div onClick={handleSignup} className='w-fit h-fit'>
                        <Button variant="primary" text="Signup" size="md" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;
