"use client";
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '../../../components';
import Image from 'next/image';
import { Sideimg1, Sideimg2, Sideimg3, Sideimg4, Star, Planet } from '../../../public';
import axios from 'axios';

function Signin() {
    const [isSignup, setSignup] = useState(false);

    const router = useRouter()
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function handlelogin() {
        const password = passwordRef.current?.value;
        const email = emailRef.current?.value;

        try {
            const signinData = await axios.post("http://localhost:3002/user/signin", {
                password,
                email
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            console.log(signinData);

            if (signinData.data?.token) {
                await localStorage.setItem('token', signinData.data?.token);
                router.push('/dashboard')
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='w-screen flex justify-between items-center pt-5 px-20'>
            <div className="flex w-1/2 px-8 flex-col space-y-4  h-fit rounded-lg bg-white py-4">
                <div className="w-full">
                    <h5 className="text-lg text-neutral-800 font-bold">
                        <span>Get Started with ChalkSync</span><br />
                        <span> Sign Up Now!</span>
                    </h5>
                </div>
                <div className="flex justify-center space-y-3 flex-col items-center">
                    <Input varient='normal' Size='normal' place='eg: yshak' reference={emailRef} type='text' title='Email' />
                    <Input varient='normal' Size='normal' place='eg: yshak@1234*' reference={passwordRef} type='password' title='password' />
                </div>
                <div className="w-full px-24 mt-4">
                    <div onClick={handlelogin} className='w-fit h-fit'>
                        <Button variant="primary" text="Signup" size="default" />
                    </div>
                </div>
            </div>
            <div className='w-1/2 px-5 flexCenter flex-col'>
                <div className='w-full space-x-2  flex justify-between'>
                    <Image className='w-full ' alt='sideimage' src={Sideimg4} />
                </div>
                <div className='w-full'>
                    <Image className='' alt='sideimage' src={Sideimg3} />
                </div>
            </div>
        </div>
    )
}

export default Signin;
