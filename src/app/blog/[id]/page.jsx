"use client"
import SimilarBlogs from '@/components/SimilarBlogs';
import { BASE_URL } from '@/services/APIConstant';
import { fetchBlogById } from '@/services/userService';
import { useQuery } from '@tanstack/react-query';
import { ArrowDown, ArrowUp, Eye, Heart, Send } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const Page = ({ params }) => {
    const { id } = params;

    const [isOpen, setIsOpen] = useState(false);// state to handle read more toggle and hight of blog description
    const [showReadMoreButton, setShowReadMoreButton] = useState(false);// to show/hide read more button and also to show effect on blog description
    const [liked, setLiked] = useState(false); // To toggle the like button

    const ref = useRef(null);

    // Fetch blog data using react-query
    const fetchBlogByIdQuery = useQuery({
        queryKey: ["blog", id],// cache based on blog id
        queryFn: () => fetchBlogById(id),
        enabled: !!id,// query will not run if id is not there
    });

    // Format date into a more readable format
    const formatDate = (createdAtDate) => {
        const date = new Date(createdAtDate);
        return new Intl.DateTimeFormat("en-US", {
            month: "long",  // Full month name (e.g., October)
            day: "2-digit", // Day with two digits (e.g., 15)
            year: "numeric" // Full year (e.g., 2023)
        }).format(date);
    };

    // it checks whether the blog description overflows to show read more button
    useEffect(() => {
        if (ref.current) {
            setShowReadMoreButton(ref.current.scrollHeight > ref.current.clientHeight);
        }
    }, [fetchBlogByIdQuery.data]);

    const content = [
        "Introduction of the blog", "Analysis", "Case Study", "Insights", "Background", "Conclusion", "Summary of the blog", "Analysis", "Case Study", "Insights", "Background", "Conclusion", "Summary of the blog", "FAQs of blog", "References",
    ];

    const blogContent = Array(30).fill(
        "<h2>Lorem ipsum</h2><strong>Lorem ipsum dolor</strong>Lorem ipsum dolor sit, Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quaerat adipisci eum quo accusantium laboriosam beatae deleniti voluptate error iste, fugiat expedita natus dolore vel officiis omnis. Libero, voluptas atque? amet consectetur adipisicing elit. Quidem quam animi eum iure voluptatum rerum dolore beatae, dignissimos possimus ex architecto deleniti omnis repellat maxime facere eligendi placeat optio dolorem."
    );

    // Toggle like button
    const handleLikeToggle = () => {
        // api call for liking/unliking 
        setLiked(!liked);
    };

    // Shows loading while fetching data
    if (fetchBlogByIdQuery.isLoading) {
        return (
            <div className="flex flex-col gap-2 items-center justify-center h-screen w-screen">
                <Image className="animate-spin rounded-full" src="/loading.png" width={48} height={48} alt="Loading..." />
                <p className="mt-4 text-2xl font-semibold text-white animate-pulse">
                    Loading....
                </p>
            </div>
        )
    }

    // handles if any API error
    if (fetchBlogByIdQuery.isError) {
        const errorMessage = fetchBlogByIdQuery.error.response?.data?.message || "something went wrong please try again";
        // alert(errorMessage)

        if (errorMessage.toLowerCase().includes("please login first")) {
            router.push("/user/login");
            return null;
        }
        return (
            <div className="text-white h-screen flex justify-center items-center text-center py-4">
                {errorMessage}
            </div>
        );
    }

    return (
        <div>
            <div className="border border-b border-[#262626] relative h-[281px] md:h-[598px]">
                {/* Blog Image */}
                <Image
                    className=" h-full w-full object-cover"
                    height={598}
                    width={800}
                    src={`${BASE_URL}/blog-pics/${fetchBlogByIdQuery.data.data.blog.image}`}
                    alt={fetchBlogByIdQuery.data.data.blog.title}
                />

                {/* provides some effect on image */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(180deg, #14141400 0%, #141414E0 75.52%, #141414 100%)",
                    }}
                ></div>

                {/* blog title */}
                <p className="absolute bottom-[17px] md:bottom-[30px] w-full text-[#FFFFFF] text-[28px] md:text-[64px] text-center font-semibold leading-[42px] md:leading-[96px] tracking-[-0.03em]  ">
                    {fetchBlogByIdQuery.data.data.blog.title}
                </p>
            </div>

            {/* blog content */}
            <div className="border-b border-[#262626] flex flex-col-reverse md:flex-row ">{/*lg:space-x-4 gap-y-4 lg:space-y-0 */}
                {/* 1 */}
                {/* Blog Description */}
                <div className="flex-grow md:border-r md:border-[#262626] py-[40px] px-[24px] md:py-[80px] md:pl-[162px] md:pr-[80px]">
                    <div className="relative">
                        <div
                            ref={ref}
                            // break-all 
                            className={`ProseMirror text-[#98989A] Blog transition-all duration-300 overflow-hidden  ${isOpen ? "" : "max-h-screen"
                                }`}
                            dangerouslySetInnerHTML={{ __html: fetchBlogByIdQuery.data.data.blog.description }}
                        />
                        {/* shadow effect transperant top to dark in bottom */}
                        {showReadMoreButton && !isOpen && (
                            <div
                                className="gradient-blogText absolute bottom-0 left-0 right-0 h-[102px] md:h-[105px] pointer-events-none"
                            // 
                            ></div>)}
                    </div>
                    {showReadMoreButton && (
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#98989A] text-[14px] md:text-[18px] leading-[21px] md:leading-[27px] tracking-[-0.03em] font-normal flex items-center mx-auto gap-1 md:gap-[10px] rounded-[8px] border border-[#262626] bg-[#141414] hover:bg-[#191818] py-[14px] px-[20px] md:px-[24px] "
                        >
                            {isOpen ? "Read Less" : "Read Full Blog"}
                            {isOpen ? <ArrowUp /> : <ArrowDown />}

                        </button>
                    )}
                </div>

                {/* 2 */}
                <div >
                    <div className=" border-b border-[#262626] flex justify-center items-center space-x-[14px] px-[53.5px] md:px-[80px] py-[20px] md:py-[50px]">
                        {/* Like Button */}
                        <button
                            onClick={handleLikeToggle}
                            className="flex items-center space-x-2 px-[14px] md:px-6 py-[8px] md:py-[10px] rounded-[100px] border border-[#262626] bg-[#141414] hover:border-white transition"
                        >
                            <Heart
                                className={`w-[27.63px] h-[25.5px] ${liked ? "fill-red-500 text-[#FF5500]" : "text-[#666666]"
                                    }`}
                            />
                            <span className="text-[#98989A] font-normal text-[14px] md:text-[18px]">24.5k</span>
                        </button>

                        {/* View Button */}
                        <div className="flex items-center space-x-2 px-[14px] md:px-6 py-[8px] md:py-[10px] rounded-[100px] border border-[#262626] bg-[#141414] hover:border-white transition">
                            <Eye className="w-[27.63px] h-[25.5px] text-[#666666]" />
                            <span className="text-[#98989A] font-normal text-[14px] md:text-[18px]">50k</span>
                        </div>

                        {/* Share Button */}
                        <div className="flex items-center space-x-2 px-[14px] md:px-6 py-[8px] md:py-[10px] rounded-[100px] border border-[#262626] bg-[#141414] hover:border-white transition">
                            <Send className="w-[27.63px] h-[25.5px] text-[#666666]" />
                            <span className="text-[#98989A] font-normal text-[14px] md:text-[18px]">206</span>
                        </div>
                    </div>

                    {/* blog metadata */}
                    <div className='border-b md:border-b-0 border-[#262626] py-[40px] px-[24px] md:pl-[80px] md:pr-[162px] md:py-[80px]'>
                        <div className='text-[14px] md:text-[18px] leading-[21px] md:leading-[27px] tracking-[-0.03em] grid grid-cols-2 gap-x-[20px] gap-y-[20px] md:gap-y-[30px]'>
                            <div >
                                <p className="mb-1 md:mb-[10px] text-[#98989A]   font-normal">Publication Date</p>
                                <p className="text-[#FFFFFF] font-medium ">{formatDate(fetchBlogByIdQuery.data.data.blog.createdAt)}</p>
                            </div>
                            <div >
                                <p className="mb-1 md:mb-[10px] text-[#98989A]   font-normal">Category</p>
                                <p className="text-[#FFFFFF] font-medium ">{fetchBlogByIdQuery.data.data.blog.category}</p>
                            </div>
                            <div >
                                <p className="mb-1 md:mb-[10px] text-[#98989A]   font-normal">Reading Time</p>
                                <p className="text-[#FFFFFF] font-medium ">10 Min</p>
                            </div>
                            <div >
                                <p className="mb-1 md:mb-[10px] text-[#98989A]   font-normal">Author Name</p>
                                <p className="text-[#FFFFFF] font-medium ">{fetchBlogByIdQuery.data.data.blog.author}</p>
                            </div>
                        </div>

                        <div className='mt-[30px] md:mt-[50px] text-[14px] md:text-[18px] leading-[21px] md:leading-[27px] tracking-[-0.03em]'>
                            <p className='text-[#98989A] mb-4 md:mb-[10px]'>Table of Contents</p>
                            <div className='custom-scrollbar max-h-[353px] md:max-h-[443px] overflow-y-auto flex flex-col gap-5 p-5 rounded-[12px] bg-[#1A1A1A] text-[#FFFFFF]'>
                                {content.map((text, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <span className=" ">•</span>
                                        <p>{text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* similar News/blogs */}
            <div className='border-[#262626] border-b px-[16px] md:px-[162px] py-[40px] md:py-[80px]'>
                <SimilarBlogs id={fetchBlogByIdQuery.data.data.blog._id} />
            </div>
        </div>
    );
};

export default Page;