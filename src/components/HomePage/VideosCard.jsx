import React from 'react'
import Image from 'next/image'

const VideosCard = () => {

    const videos = [
        {
            title: "Mars Exploration: Unveiling Alien Landscapes",
            description: "Embark on a journey through the Red Planet's breathtaking landscapes and uncover the mysteries of Mars.",
            imageSrc: "/images/videos_IMG1.png",
            duration: "2.30 min",
        },
        {
            title: "Blockchain Explained: A Revolution in Finance",
            description: "Delve into the world of blockchain technology and its transformative impact on the financial industry.",
            imageSrc: "/images/videos_IMG2.png",
            duration: "2.30 min",

        },
        {
            title: "Breaking the Silence: Mental Health Awareness in the Workplace",
            description: "An exploration of the importance of mental health awareness and the initiatives reshaping workplaces for employee well-being.",
            imageSrc: "/images/videos_IMG3.png",
            duration: "2.30 min",
        },
        {
            title: "Revolutionizing Investment Strategies",
            description: "An in-depth look at global efforts to conserve biodiversity and safeguard endangered species from extinction.",
            imageSrc: "/images/videos_IMG4.png",
            duration: "2.30 min",
        },
    ];

    return (
        <div className='flex justify-center'>
            <div className="max-w-7xl mx-5 grid grid-cols-1 md:grid-cols-2">
                {
                    videos.map((video, index) => (
                        <div
                            key={index}
                            className={`border-[#262626] ${index % 2 === 0 ? 'md:border-r' : ''} 
                                        border-b md:p-10 py-5 flex justify-center`}
                        >
                            <div className="w-full max-w-[358px] md:max-w-[618px]">
                                <div className="relative">
                                    <Image
                                        src={video.imageSrc}
                                        alt={video.title}
                                        width={618}
                                        height={312}
                                        className="rounded-lg w-[358px] h-[210px] md:w-[618px] md:h-[312px]"
                                    />
                                    <div className="absolute right-[30px] bottom-[30px] text-xs md:text-lg text-[#7E7E81]">
                                        {video.duration}
                                    </div>
                                </div>
                                <h3 className="mt-3 md:mt-5 pb-2 md:pb-3 text-base md:text-2xl">{video.title}</h3>
                                <p className="text-sm md:text-lg text-[#98989A] ">{video.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default VideosCard
