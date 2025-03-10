"use client"
import { fetchAllBlogs } from '@/services/userService';
import Card from './Card';
import { useQuery } from '@tanstack/react-query';

const FewBlog = () => {
    const allBlogsQuery = useQuery({
        queryKey: ["blogs"],
        queryFn: fetchAllBlogs,
        staleTime: 5 * 60 * 1000,
        retry: false,
    });

    return (
        <div className="flex justify-center">
            
            <div className="max-w-7xl grid gap-x-[30px] grid-cols-1 lg:grid-cols-3 mt-8">
                {
                    allBlogsQuery.data?.data?.blogs.slice(0, 6).map((article, index) => (
                        <Card
                            key={index}
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
}

export default FewBlog;
