"use client"
import BlogCard from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import { fetchAllBlogs } from '@/services/userService';
import { useQuery } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

// final
// displays all blogs with category filters and a refresh option
const Page = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");//selected category for filtering blogs
    const [isRefetching, setIsRefetching] = useState(false);

    const router = useRouter();

    // List of blog categories
    const categories = [
        "All",
        "Technology",
        "Lifestyle",
        "Education"
    ]

    // Fetch all blogs using react-query
    const allBlogsQuery = useQuery({
        queryKey: ["blog"],
        queryFn: fetchAllBlogs,
        // refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        retry: false,
    });

    // Function to manually refetch blogs
    const handleRefetch = async () => {
        setIsRefetching(true);
        await allBlogsQuery.refetch();
        setIsRefetching(false);
    };

    // Shows loading while fetching blogs
    if (allBlogsQuery.isLoading) {
        return (
            <div className="flex flex-col gap-2 items-center justify-center h-screen w-screen">
                <Image className="animate-spin rounded-full" src="/loading.png" width={48} height={48} alt="Loading..." />
                <p className="mt-4 text-2xl font-semibold text-white animate-pulse">
                    Loading....
                </p>
            </div>
        )
    }

    // shows errors if any
    if (allBlogsQuery.isError) {
        const errorMessage = allBlogsQuery.error.response?.data?.message || "something went wrong please try again";
        // alert(errorMessage)

        // If error is related to authentication redirect user to login page
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
            <div className='flex justify-center items-center gap-3 md:gap-5  m-12 md:m-16'>
                {/* Page title */}
                <h1 className='text-4xl md:text-[55px] tracking-wider md:tracking-widest md:[word-spacing:8px] '>Latest Blogs</h1>

                {/* refresh button */}
                <div onClick={handleRefetch} className="cursor-pointer bg-transparent text-white text-3xl md:text-[55px]"><RefreshCw className={isRefetching ? "animate-spin  [animation-duration:500ms]" : ""} /></div>
            </div>

            <div className="mb-5 md:mb-7 flex items-center justify-center gap-2 md:gap-4 ">
                {
                    // shows all categories button to filter the blogs according to selected categories
                    categories.map((category) => (
                        <Button key={category}
                            onClick={() => {
                                setSelectedCategory(category)
                            }}
                            className={`
                                 md:text-base hover:bg-white hover:text-black p-2
                                ${selectedCategory === category ? "bg-white text-black" : "bg-transparent"}
                                `}
                        >
                            {category}
                        </Button>
                    ))
                }
            </div>

            {/* Show loading spinner when data is being refreshed */}
            {isRefetching && (
                <div className="flex justify-center items-center mb-5 md:mb-7">
                    <Image className="animate-spin" src="/loading.png" width={32} height={32} alt="Refreshing..." />
                </div>
            )}

            {/* Blog listing */}
            <div className='flex justify-center items-center flex-col'>
                <div className="max-w-7xl grid md:gap-x-[30px] gap-y-[30px] md:gap-y-12 grid-cols-1 md:grid-cols-3 ">
                    {
                        allBlogsQuery.data.data.blogs.
                            filter((blog) => selectedCategory === "All" || blog.category === selectedCategory)
                            .sort(() => 0.5 - Math.random())// Shuffle blogs randomly
                            .map((article) => (
                                <BlogCard
                                    key={article._id}
                                    id={article._id}
                                    title={article.title}
                                    category={article.category}
                                    description={article.description}
                                    imageSrc={article.image}
                                    likes={10}
                                    shares={10}
                                />
                            ))
                    }
                </div>
            </div>
        </div >
    )
}

export default Page