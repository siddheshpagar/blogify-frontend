"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

const FooterSection = ({ title, items }) => {
    const router = useRouter();

    return (
        <div>
            <h4 className="text-xl mb-8">{title}</h4>
            <ul className="text-[#666666]">
                {items.map((item, index) => (
                    <li key={index} className={`mb-1 lg:mb-2 ${item.isNew ? 'flex' : ''}`}>
                        <p
                            className={`${item.isNew ? 'mr-2' : ''}
                    ${item.url ? 'cursor-pointer inline' : ''}
                    `}
                            onClick={item.url ? () => router.push("/blog") : undefined}
                        >
                            {item.name}
                        </p>
                        {item.isNew && (
                            <div className="relative w-[58px]">
                                <div className="absolute inset-0 p-[1px] bg-gradient-to-r from-[#262626] to-[#FFD119] rounded-md">
                                    <div className="flex items-center justify-center h-full bg-[#141414] rounded-md">
                                        <span className="text-sm">New</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>)
}




export default FooterSection