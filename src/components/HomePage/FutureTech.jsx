import Image from "next/image"; import React from 'react'
import Arrow from "../Arrow";

// List of key features displayed in the section
const FutureTech = () => {
    const items = [
        {
            title: "Resource Access",
            description: "Visitors can access a wide range of resources, including ebooks, whitepapers, reports.",
        },
        {
            title: "Community Forum",
            description: "Join our active community forum to discuss industry trends, share insights, and collaborate with peers.",
        },
        {
            title: "Tech Events",
            description: "Stay updated on upcoming tech events, webinars, and conferences to enhance your knowledge.",
        },
    ];

    return (
        <div className=' bg-[#1A1A1A] px-[16px] py-[40px] lg:px-[162px] lg:py-[120px]'>
            <div className="lg:flex lg:items-center">
                <Image
                    src={"/logo.png"}
                    alt="Logo"
                    width={150}
                    height={150}
                    className="h-[60px] w-[60px] lg:h-[150px] lg:w-[150px] lg:mr-20 mb-5 lg:mb-0"
                />
                <div>
                    <span className='bg-[#333333] px-[8px] py-[4px] lg:px-[10px] lg:py-[6px] text-[14px] lg:text-xl '>
                        Learn, Connect, and Innovate
                    </span>
                    <h1 className="2xl:whitespace-nowrap text-[28px] lg:text-[58px] mt-5  lg:mt-4 ">
                        Be Part of the Future Tech Revolution
                    </h1>
                    <p className="mt-1 text-[#7E7E81] text-[14px] lg:text-[18px] lg:mt-[30px]">
                        Immerse yourself in the world of future technology. Explore our comprehensive resources, connect with fellow tech enthusiasts, and drive innovation in the industry. Join a dynamic community of forward-thinkers.
                    </p>
                </div>
            </div>

            <div className="mt-10 lg:mt-[100px] bg-[#141414] border border-[#262626] flex flex-col lg:flex-row gap-[10px] px-[10px] py-[10px] lg:gap-5 lg:px-5 lg:py-5">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="p-6 lg:p-10 bg-[#1A1A1A]  border border-[#262626]"
                    >
                        <div className="flex justify-between  ">
                            <h3 className="font-semibold  text-base lg:text-[22px]">
                                {item.title}
                            </h3>
                            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                <Arrow color="#141414" />
                            </div>
                        </div>
                        <p className="font-normal mt-5 text-[#98989A] text-sm lg:text-[18px]">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FutureTech