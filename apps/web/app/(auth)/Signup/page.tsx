"use client";
import React, { useRef, useState } from 'react';
import Button from "@repo/ui/Button";
import Input from '@repo/ui/Inputbox';
import axios from 'axios';

function Signup() {
    const [isSignup, setSignup] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmpassRef = useRef<HTMLInputElement>(null);

    async function handleSignup() {
        const name = nameRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmpass = confirmpassRef.current?.value;
        const email = emailRef.current?.value;
        if (confirmpass !== password) return;

        try {
            const signupData = await axios.post("http://localhost:3000/api/v1/user/signup", {
                name,
                password,
                email
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log(signupData);
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
                    <Input Size='normal' reference={nameRef} title='name' />
                    <Input Size='normal' reference={emailRef} title='email' />
                    <Input Size='normal' reference={passwordRef} title='password' />
                    <Input Size='normal' reference={confirmpassRef} title='confirm password' />
                </div>
                <div className="w-full px-24 mt-4">
                    <Button variant="primary" text="Signup" size="md" onClick={handleSignup} />
                </div>
            </div>
        </div>
    );
}

export default Signup;
