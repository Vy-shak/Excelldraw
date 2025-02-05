"use client"

import React, { useState, useRef, } from 'react'
import Image from 'next/image';
import { Button, Input } from '../../../components';
import Link from 'next/link';
import { supabase, avatarsPublicurl } from '../../../lib/superBase/superbaseClient';


const url = "https://ppppwffeiuaabvrukckb.supabase.co/storage/v1/object/public/appAvatars/"
const avatarData = [
    { id: 'Avatar2.svg', url: `${url}Avatar2.svg` },
    { id: 'Avatar3.svg', url: `${url}Avatar3.svg` },
    { id: 'Avatar4.svg', url: `${url}Avatar4.svg` },
    { id: 'Avatar5.svg', url: `${url}Avatar5.svg` },
    { id: 'Avatar6.svg', url: `${url}Avatar6.svg` },
    { id: 'Avatar8.svg', url: `${url}Avatar8.svg` },
    { id: 'Avatar9.svg', url: `${url}Avatar9.svg` },
    { id: 'Avatar10.svg', url: `${url}Avatar10.svg` },
    { id: 'Avatar11.svg', url: `${url}Avatar11.svg` },
    { id: 'Avatar12.svg', url: `${url}Avatar12.svg` },
    { id: 'Avatar13.svg', url: `${url}Avatar13.svg` },
    { id: 'Avatar14.svg', url: `${url}Avatar14.svg` }
];


type Profile = {
    id: string,
    url: string
}


const page = () => {
    const [Profile, setProfile] = useState<Profile>({ id: 'Avatar2.svg', url: "https://ppppwffeiuaabvrukckb.supabase.co/storage/v1/object/public/appAvatars/Avatar2.svg" })
    const [customUrl, setCustomurl] = useState('')
    const bioRef = useRef<HTMLInputElement>(null)
    const uploadImgref = useRef<HTMLInputElement>(null)
    console.log(Profile)

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
        const profileName = `${randomId}customProfile`
        const upload = await supabase.storage.from('Profilepic').upload(profileName, file);
        const { error } = upload;
        if (error) {
            console.log("unable to upload file")
        }
        const getUrl = await supabase.storage.from("Profilepic").getPublicUrl(profileName);
        const profileUrl = getUrl.data.publicUrl;
        if (!profileUrl) {
            console.log('no url found')
            return
        }
        setProfile({ id: profileName, url: profileUrl });
        uploadImgref.current.value = '';
    }

    localStorage.setItem('profilePic', Profile.url)


    return (
        <section className='w-screen flex justify-start pt-16 items-start h-screen bg-white'>
            <div className='w-52 h-screen border-r flex flex-col justify-start space-y-4 items-center border-neutral-300'>
                <div className='w-32 h-32 overflow-hidden rounded-full'>
                    {Profile && <Image key={Profile.id} width={200} height={200} quality={100} priority className='w-36 overflow-hidden' alt='avatar1' src={Profile.url} />}
                </div>
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
                            <Image width={100} height={100} onClick={() => setProfile({ id: item.id, url: `${url}${item.id}` })} className={`border-2 ${Profile.id === item.id ? 'border-green-500 scale-110' : null}  rounded-full`} key={item.id} src={item.url} alt='avtarimg' />
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
