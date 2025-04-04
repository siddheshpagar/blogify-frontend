import React from 'react'
import FooterSection from './FooterSection';
import { footersections, resources } from './footersectionData';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {

    return (
        <footer className="max-w-7xl lg:mx-auto mx-5">

            {/* Footer links */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-5 py-10 lg:py-20 lg:px-5 ">

                {/* Mapping through footer sections and rendering each one */}
                {
                    footersections.map((footersection, index) => (
                        <FooterSection key={index} title={footersection.title} items={footersection.items} />
                    ))
                }

                {/* Additional Footer links shown in form of buttons */}
                <div className="col-span-2 lg:col-span-1">
                    <h4 className="text-xl mb-8">Resources</h4>
                    <div className="flex flex-wrap flex-row lg:flex-col gap-2 lg:gap-[10px]">
                        {
                            resources.map((resource, index) => (
                                <Button
                                    key={index}
                                    className="w-min border border-[#262626] pr-[14px] pl-[14px] pt-[4px] pb-[8px] lg:pr-4 lg:pl-4 lg:pt-[10px] lg:pb-[10px]"
                                >
                                    {resource.title} {resource.icon}
                                </Button>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* policies, social media, and copyright icons and links */}
            <div className="text-[#666666] text-[14px] lg:text-[18px] flex flex-col lg:flex-row justify-between items-center text-center border-t border-[#262626] gap-y-6 py-6 lg:p-10">
                <div className="order-2 lg:order-1 flex items-center space-x-2 lg:space-x-[11px]">
                    <p className="">Terms & Conditions</p>
                    <span className="border-l border-[#262626] h-4 lg:h-6"></span> {/* Vertical border */}
                    <p>Privacy Policy</p>
                </div>

                <div className='order-1 lg:order-2 flex flex-row gap-x-[14px] items-center lg:gap-x-5'>
                    <Link href="https://wa.me/917021031478" target="_blank" rel="noopener noreferrer">
                        <Image src="/twitter.png" alt='twitter' width={22.8} height={19.2} className='w-[19px] h-[16px]  lg:w-[22.8px] lg:h-[19.2px]'></Image>
                    </Link>

                    <Link href="mailto:pagarsiddhesh2000@gmail.com" target="_blank" rel="noopener noreferrer">
                        <Image src="/socialMedia.png" alt='twitter' width={22.8} height={19.2} className='w-[20px] h-[11.38px]  lg:w-6 lg:h-[13.66px]'></Image>
                    </Link>

                    <Link href="https://www.linkedin.com/in/siddheshpagar/" target="_blank" rel="noopener noreferrer">
                        <Image src="/linkedin.png" alt='twitter' width={20.8} height={20.8} className='w-[17.33px] h-[17.33px]  lg:w-[20.8px] lg:h-[20.8px]'></Image>
                    </Link>
                </div>

                <p className='order-3 lg:order-3'>&copy; 2024 FutureTech. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer