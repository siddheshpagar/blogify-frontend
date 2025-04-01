"use client"

import { Heart, Send, Share, Share2, Share2Icon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import Arrow from '../Arrow';
import { fetchAllBlogs } from '@/services/userService';
import Card from './Card'
import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '@/services/APIConstant';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Blogs = () => {
    const [firstBlog, setFirstBlog] = useState(null);
    const router = useRouter();

    // fetch all blogs using react-query
    const allBlogsQuery = useQuery({
        queryKey: ["blog"],
        queryFn: fetchAllBlogs,
        // staleTime: 5 * 60 * 1000,
        retry: false,
    });

    // it sets the first blog when data is available
    useEffect(() => {
        if (allBlogsQuery.data?.data?.blogs) {
            setFirstBlog(allBlogsQuery.data.data.blogs[0]);
        }
    }, [allBlogsQuery.data]);

    // Format date into a more readable format
    const formatDate = (createdAtDate) => {
        const date = new Date(createdAtDate);
        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short", // Abbreviated month name
            year: "numeric",
            weekday: "short",
        }).format(date);
    };

    // Show a loading while fetching the data
    if (allBlogsQuery.isLoading) {
        return (
            <div className="p-10 flex flex-col gap-2 items-center justify-center w-screen">
                <Image className="animate-spin rounded-full" src="/loading.png" width={48} height={48} alt="Loading..." />
                <p className="mt-4 text-2xl font-semibold text-white animate-pulse">
                    Loading....
                </p>
            </div>
        )
    }

    // handles error
    if (allBlogsQuery.isError) {
        const errorMessage = fetchBlogByIdQuery.error.response?.data?.message || "something went wrong please try again";
        // alert(errorMessage)

        if (errorMessage.toLowerCase().includes("please login first")) {
            router.push("/user/login");
            return null;
        }
        return (
            <div className="text-white flex justify-center items-center text-center py-4">
                {errorMessage}
            </div>
        );
    }


    return (
        <div className='flex justify-center items-center flex-col'>

            {/* displaying first blog in little detailed way */}
            {firstBlog &&
                <div className='w-full border-t border-b border-[#262626] py-10 lg:py-12'>
                    <div className="mx-auto max-w-7xl  flex gap-8 flex-col lg:flex-row justify-center items-center">
                        <Image
                            src={`${BASE_URL}/blog-pics/${firstBlog.image}`}
                            alt={firstBlog.title}
                            width={515}
                            height={427}
                            className="rounded-[12px] w-[358px] h-[213px] lg:w-[515px] lg:h-[427px]"
                        />

                        <div className="md:p-4 flex flex-col justify-between max-w-[358px] lg:max-w-none">
                            <h2 className="mb-[6px] md:mb-[30px] text-xl lg:text-[32px] font-bold">
                                {firstBlog.title}
                            </h2>

                            {/* displaying a short preview of the blog description */}
                            <p className=" ProseMirror text-[#98989A] break-all lg:mt-3 text-base lg:text-xl"
                                dangerouslySetInnerHTML={{ __html: firstBlog.description.slice(0, 150) }}
                            />

                            {/* Blog metadata */}
                            <div className="mt-[20px] md:mt-[50px] grid grid-cols-3 gap-x-2 gap-y-2 text-gray-500">
                                {/* Headings */}
                                <div className="text-[#98989A] text-sm lg:text-lg">Category</div>
                                <div className="text-[#98989A] text-sm lg:text-lg">Publication Date</div>
                                <div className="text-[#98989A] text-sm lg:text-lg">Author</div>

                                {/* data */}
                                <div className='text-[#FFFFFF] text-sm lg:text-lg'>{firstBlog.category}</div>
                                <div className='text-[#FFFFFF] text-sm lg:text-lg'>{formatDate(firstBlog.createdAt)}</div>
                                <div className='text-[#FFFFFF] text-sm lg:text-lg'>{firstBlog.author}</div>
                            </div>

                            {/* Interaction buttons (likes, shares, read more) */}
                            <div className="mt-[20px] md:mt-[50px] flex items-center justify-between text-gray-400">
                                <div className='flex gap-[10px]'>
                                    <div className="flex items-center space-x-1 px-[14px] md:px-4 py-[6px] md:py-[8px] rounded-[100px] border border-[#262626] bg-[#141414] hover:border-[#4a4a4a]">
                                        <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-[#666666]" />
                                        <span>14k</span>
                                    </div>
                                    <div className="flex items-center space-x-1 px-[14px] md:px-4 py-[6px] md:py-[8px] rounded-[100px] border border-[#262626] bg-[#141414] hover:border-[#4a4a4a]">
                                        <Send className="w-5 h-5 lg:w-6 lg:h-6 text-[#666666]" />
                                        <span>204</span>
                                    </div>
                                </div>
                                <Button onClick={() => router.push(`/blog/${firstBlog._id}`)} className="text-[#98989A] rounded-[12px] text-sm lg:text-lg bg-[#141414] border border-[#262626] hover:border-[#4a4a4a] md:px-[18px] md:py-[24px]">
                                    Read more<Arrow />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            }


            {/* displays a few other blogs */}
            <div className="max-w-7xl grid md:gap-x-[30px] gap-y-[20px] md:gap-y-12 grid-cols-1 md:grid-cols-3 mt-10 md:mt-12">
                {
                    allBlogsQuery.data.data.blogs.sort(() => 0.5 - Math.random()).slice(1, 7).map((article) => (
                        <Card
                            key={article._id}
                            id={article._id}
                            title={article.title}
                            category={article.category}
                            imageSrc={article.image}
                            likes={10}
                            shares={10}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default Blogs;