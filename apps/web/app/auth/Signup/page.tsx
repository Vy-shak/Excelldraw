"use client";
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '../../../components';
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
                router.push('/auth/dp')
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='w-full pt-5 px-20'>
            <div className="flex w-full flex-col space-y-4 px-6 h-fit rounded-lg bg-white py-4">
                <div className="w-full">
                    <h5 className="text-lg text-neutral-800 font-bold">
                        <span>Get Started with ChalkSync</span><br />
                        <span> Sign Up Now!</span>
                    </h5>
                </div>
                <div className="flex justify-center space-y-3 flex-col items-center">
                    <Input varient='normal' place='eg: yshak' Size='normal' reference={nameRef} type='text' title='Name' />
                    <Input varient='normal' place='eg: Vyshakn29@gmail.com' Size='normal' reference={emailRef} type='text' title='Email' />
                    <Input varient='normal' place='eg: 12345@gmail.com' Size='normal' reference={passwordRef} type='password' title='Password' />
                    <Input varient='normal' place='eg: 12345@gmail.com' Size='normal' reference={confirmpassRef} type='password' title='Confirm password' />
                </div>
                <div className="w-full px-24 mt-4">
                    <div onClick={handleSignup} className='w-fit h-fit'>
                        <Button variant="primary" text="Signup" size="default" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;
