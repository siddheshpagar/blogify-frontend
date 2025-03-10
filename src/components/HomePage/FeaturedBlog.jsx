"use client"
import React from 'react'
import { Button } from '../ui/button'
import Arrow from '../Arrow'
import { useRouter } from 'next/navigation'

// This component displays a section with a button to redirect users to the blog page
const FeaturedBlog = () => {
    const router = useRouter();

    return (
        <div className="bg-[#1A1A1A] px-5 lg:px-0 py-10 lg:py-20 mt-5 lg:mt-8   lg:flex lg:items-center lg:justify-evenly">
            <div className='lg:w-2/3'>
                <span
                    onClick={() => { router.push("/blog") }}
                    className='cursor-pointer bg-[#333333] px-[10px] py-[6px] text-[14px] lg:text-xl '
                >
                    Featured Blog
                </span>
                <h2
                    onClick={() => { router.push("/blog") }}
                    className="cursor-pointer text-[28px] lg:text-[58px] mt-2 lg:mt-1"
                >
                    Expand & Discover More Blogs
                </h2>
            </div>
            <Button
                onClick={() => { router.push("/blog") }}
                className="bg-[#141414] border border-[#262626] px-[20px] w-full lg:w-auto py-[14px] lg:px-[24px] lg:py-[18px]">
                View All<Arrow />
            </Button>
        </div>
    )
}

export default FeaturedBlog