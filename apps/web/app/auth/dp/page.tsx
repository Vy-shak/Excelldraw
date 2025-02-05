"use client"

import React, { useState, useRef, } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8, Avatar9, Avatar10, Avatar11, Avatar12, Avatar13, Avatar14 } from '../../../public/Dp/index';
import { Button, Input } from '../../../components';
import Link from 'next/link';
import { supabase } from '../../../lib/superBase/superbaseClient';
import { error } from 'console';

console.log(supabase)
const avatarData = [
    { id: 1, avatarImg: Avatar2 },
    { id: 2, avatarImg: Avatar3 },
    { id: 3, avatarImg: Avatar4 },
    { id: 4, avatarImg: Avatar5 },
    { id: 5, avatarImg: Avatar6 },
    // { id: 6, avatarImg: Avatar7 },
    { id: 7, avatarImg: Avatar8 },
    { id: 8, avatarImg: Avatar9 },
    { id: 9, avatarImg: Avatar10 },
    { id: 10, avatarImg: Avatar11 },
    { id: 11, avatarImg: Avatar12 },
    { id: 12, avatarImg: Avatar13 },
    { id: 13, avatarImg: Avatar14 }
];

type Profile = {
    id: number,
    avatarImg: StaticImageData
}


const page = () => {
    const [Profile, setProfile] = useState<Profile>({ id: 1, avatarImg: Avatar2 },)
    const [customUrl, setCustomurl] = useState('')
    const bioRef = useRef<HTMLInputElement>(null)
    const uploadImgref = useRef<HTMLInputElement>(null)



    const selectImage = () => {
        uploadImgref.current?.click();
        console.log('clicked')
    };

    const uploadImg = async () => {
        const files = uploadImgref.current?.files;
        if (!files) {
            console.log("files is not present");
            return
        }
        const file = files[0];
        if (!file) {
            console.log("file is not present");
            return
        }
        const randomId = Math.random()
        const filename = `${randomId}customProfile`
        const upload = await supabase.storage.from('Profilepic').upload(filename, file);
        const { error } = upload;
        if (error) {
            console.log("unable to upload file")
        }
        const geturl = await supabase.storage.from("Profilepic").getPublicUrl(filename);
        const customUrl = geturl.data.publicUrl;
        console.log(customUrl)
        if (!customUrl) {
            console.log('no url found')
            return
        }
        setCustomurl(customUrl)

    }

    return (
        <section className='w-screen flex justify-start pt-16 items-start h-screen bg-white'>
            <div className='w-52 h-screen border-r flex flex-col justify-start space-y-4 items-center border-neutral-300'>
                {Profile && <Image key={Profile.id} className='w-36' alt='avatar1' src={Profile.avatarImg} />}
                {customUrl && <Image key={21} width={200} height={200} quality={100} priority className='w-36' alt='avatar1' src={customUrl} />}
                <div onClick={selectImage} className='w-fit h-fit flexColcenter'>
                    <Button size='default' text='upload image' variant='secondary' />
                    <input onChange={uploadImg} ref={uploadImgref} className='hidden' type='file' />
                </div>

            </div>
            <div className='w-full flex flex-col pl-6 justify-start items-start h-full space-y-2 bg-white'>
                <div className='flex flex-col space-y-3 justify-start items-start'>
                    <span className='text-xs font-semibold text-neutral-700'>Avatars</span>
                    <div className='flex flex-wrap max-w-lg justify-start gap-2 items-center w-full'>
                        {avatarData.map((item) => (
                            <Image onClick={() => setProfile(item)} className={`border-2 ${Profile.id === item.id ? 'border-green-500 scale-110' : null}  rounded-full`} key={item.id} src={item.avatarImg} alt='avtarimg' />
                        ))}
                    </div>
                </div>
                <div className='flex w-full max-w-lg  flex-col space-y-4 justify-start items-start'>
                    <span className='text-xs font-semibold text-neutral-700'>Bio</span>
                    {bioRef && <Input reference={bioRef} varient='bio' Size='bio' type='text' />}
                </div>
            </div>
            <Link href={'/dashboard'}>
                <span className='text-xs absolute right-10 bottom-10 font-semibold text-neutral-700'>Skip</span>
            </Link>
        </section>
    )
}

export default page
