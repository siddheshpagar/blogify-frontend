"use client"
import Image from 'next/image'
import React from 'react'
import Arrow from '../Arrow'
import { useRouter } from 'next/navigation';

const MiddleSection = () => {
    const router = useRouter();

    const items = [
        {
            imgSrc: "/item1.png",
            title: "Latest News Updates",
            subtitle: "Stay Current",
            description: "Over 1,000 articles published monthly",
            url:"/blog",
        },
        {
            imgSrc: "/item2.png",
            title: "Expert Contributors",
            subtitle: "Trusted Insights",
            description: "50+ renowned AI experts on our team",
            url:"/user/dashboard/createblog",
        },
        {
            imgSrc: "/item3.png",
            title: "Global Readership",
            subtitle: "Worldwide Impact",
            description: "2 million monthly readers",
            url:"/user/dashboard/listblog",
        },
    ];

    return (
        <div className="max-w-7xl lg:mx-auto mx-5">
            <div className="text-left grid gap-x-8 grid-cols-1 lg:grid-cols-3 justify-center">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`py-10 ${index !== items.length - 1 ? 'border-b lg:border-r lg:border-b-0' : ''} border-[#262626]`}
                    >
                        <Image
                            src={item.imgSrc}
                            alt=""
                            width={50}
                            height={50}
                            className="mb-4 w-[30px] h-[30px] lg:w-[50px] lg:h-[50px]"
                        />
                        <div className="flex items-center gap-x-20 lg:gap-x-32">
                            <div>
                                <h3 className="text-base lg:text-xl font-bold">{item.title}</h3>
                                <p className="mt-1 text-[#7E7E81] text-sm lg:text-lg">{item.subtitle}</p>
                            </div>
                            <div onClick={()=>{router.push(item.url)}} className="cursor-pointer hover:scale-110 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                <Arrow color="#141414" />
                            </div>
                        </div>
                        <p className="mt-4 text-[#98989A] text-sm lg:text-xl">{item.description}</p>
                    </div>
                ))}
            </div>
            <div className=" lg:py-10 my-5 lg:my-8 lg:mt-8  lg:flex lg:items-start lg:justify-between">
                <h2 className="text-3xl font-bold lg:w-1/2">
                    Today's Headlines: Stay Informed
                </h2>
                <p className="mt-4 text-gray-300 lg:mt-0 lg:ml-4 lg:w-1/2">
                    Explore the latest news from around the world. We bring you up-to-the-minute updates on the most significant events, trends, and stories. Discover the world through our news coverage.
                </p>
            </div>
        </div>
    )
}

export default MiddleSection