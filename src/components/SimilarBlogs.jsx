import React from 'react'
import { Button } from './ui/button';
import Arrow from './Arrow';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Heart, Send } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllBlogs } from '@/services/userService';
import { BASE_URL } from '@/services/APIConstant';

const SimilarBlogs = ({ id }) => {

    const router = useRouter();

    const fewBlogsQuery = useQuery({
        queryKey: ["blog"],
        queryFn: fetchAllBlogs,
        // staleTime: 5 * 60 * 1000,
        retry: false,
    });


    if (fewBlogsQuery.isLoading) {
        return (
            <div className="p-10 flex flex-col gap-2 items-center justify-center w-screen">
                <Image className="animate-spin rounded-full" src="/loading.png" width={48} height={48} alt="Loading..." />
                <p className="mt-4 text-2xl font-semibold text-white animate-pulse">
                    Loading....
                </p>
            </div>
        )
    }

    if (fewBlogsQuery.isError) {
        const errorMessage = fetchBlogByIdQuery.error.response?.data?.message || "something went wrong please try again";
        // alert(errorMessage)

        if (errorMessage.toLowerCase().includes("please login first")) {
            router.push("/user/login");
            return null;
        }
        return (
            <div className="text-white flex justify-center items-center text-center py-4">
                "{errorMessage}"
            </div>
        );
    }

    const images = [
        { id: 1, title: "A Decisive Victory for Progressive Policies", category: "Politics", src: "https://s3-alpha-sig.figma.com/img/7252/a338/cf8ee6710b21c8fc19db90a20c7bf36a?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=La8E2ZbQSUZjmul8izsj2ARcJBP~Mq9dXVX5~yFoKmyGqyQ1ivB1ghCyTR~DktFAmQ2I0pxYcT7t3g7AbAS1kAai9JNYFYSgDYiX97-5TR8XN12mRnZc01QofTPY-yDTnd8ZPnRivc~0xv10TAFGsmMd52M7IB-X77pbFNziyfwzdmG5N43vzbWU1vORTCY~Gb7QYbrLgyOpO1~C~BPMkQFGb34UayfcstRSNMa9DUCSia80eQ-eRR~BvMVdRyTTLydEO~T8h4EuezYbT3MuamDpeDuEeqA~Zf2jkpkzA~kYky4E5aOPaFT9Y2HhZX9Yfy~ELUg7oZm6gsRJDhGh8Q__" },
        { id: 2, title: "Tech Giants Unveil Cutting-Edge AI Innovations", category: "Technology", src: "https://s3-alpha-sig.figma.com/img/36b7/4178/f38cb3273b2afde8a40098aab9d8f487?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y799hKLFWJqCFEySSOphQMKm42-sBQXgJuEvG05fFU39JH-~2M-vgMUHu5sa7V9IwONFXvUztGLtI7FJdqdTNu2EEz4~DC7GKRs2AkppazhNSv8wAnJzOcp6VXbq2~1JtSFTPQc80TJEDcRKI0zQ8mAmWkcWGwR3xwov8N2ppcHCDIW51sPnikDsUZPGT4CQWIhJhuGMQrYxNk96RjT2GgSa~LhkM3XdqRffDCepmbSQGHRztOl1uLjx7jHpyV44J3ZTkCQ89~YFJs1mwNCygAdSUSc3XHr0Re1u2v~yOC55rOLqzZVlMd~oqC3-y8D0K7xsr~EC2jNBBpOEpZL6tw__" },
        { id: 3, title: "COVID-19 Variants", category: "Health", src: "https://s3-alpha-sig.figma.com/img/1eaf/8d38/386397d61a9b02642422c6a4467cde69?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CHBfhcHVyS9Tuh4sQwlSgKenGT9ih-oBZIRolO4vrNukBf1PbLOtAg5fddKbfJvfoEJXiq2twubME7wuKR3e4gQFOMWF0ZJA9UvfnI9adj7lvZZI7cYDyiwlGyMAyKeahn9we8hkqSr3~gzd2cZvu8NWCaInX2YsET8GKTA-EixXZgnWEf7Z2RcmckVKo-AVjsXu3KXlM-L~vvZWnt6vvdbPXTgJapWqm98uFj51udtnAW-BAqhPBxRsfRn55th2mR0t6QYTC~572owNuOW9TY3CBkJLm5EI3lik~vBOPcF0vYKmwnmXae~qihGgrXXFPrM7HAslSSbRmvgIu~0u~Q__" },
        { id: 4, title: "The Rise of Artificial Intelligence in Healthcare", category: "Healthcare", src: "https://s3-alpha-sig.figma.com/img/a7da/2200/f6c37edcb06722e854c1bd926a092148?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UQXQfYKisO3nuZ7FdhSXtj-pZ-xXbzCbBUIEMvLP-WqBGxyO~JfOwP1PIbGBBrIaNKE4gahxk6Ow0RS5EboOFxl-Xw-Eq4zrBKgHABoUtICa5L9drYtakGsDHlnxW81cLScD7lP-5D1~xdOv3xd2jsXVCWfNvE0IKk93X54KNbuMNPQnGC4ShFUISr~UdB0H3ZKJ~Ik00GBT9pZWd-TdV3wBuZDlPgauTmoIvIAKAHgtupmkKYYryGYRZ8IT2hUt4UVK8rp~kZOTtuXbf17ZzqMzqxIWAExu4b211bidt~uGEyNBlNTvCLcJ0O~DWGSa3wUo4Ipfs1IdSK1DF5ebmg__" },
    ];


    const handleClick = () => {
        router.push('/blog'); // Navigate to the "/all" route
    };

    // allBlogsQuery.data.data.blogs.


    const getRandomBlogs = (blogs, count) => {
        const shuffled = blogs.sort(() => 0.5 - Math.random()); // Shuffle the array
        return shuffled.slice(0, count); // Get first `count` blogs
    };


    return (
        <div >
            <div className='tracking-[-0.03em] flex justify-between items-center'>
                <p className='font-medium text-[20px] md:text-[28px] leading-[26px] md:leading-[36.4px] '>Similar Blogs</p>
                <Button onClick={handleClick} className="text-[#98989A] text-[14px] md:text-[18px] font-normal leading-[21px] md:leading-[27px] px-[20px] md:px-[18px] py-[14px] md:py-[24px] flex items-center gap-1" >
                    <span>View All Blogs</span>
                    <Arrow />
                </Button>
            </div>
            <div className='mt-[40px] md:mt-[60px] flex flex-col md:flex-row md:flex-wrap md:justify-center md:gap-x-[30px] gap-y-[30px]'>
                {/* {fewBlogsQuery.data.data.blogs
                    .filter((blog) => blog._id !== id)
                    .slice(0, 3) */}

                {getRandomBlogs(
                    fewBlogsQuery.data.data.blogs.filter((blog) => blog._id !== id),
                    3
                ).map((blog) => (
                    <div key={blog._id} className="flex-1 min-w-[250px]">
                        <Image
                            src={`${BASE_URL}/blog-pics/${blog.image}`}
                            //   layout="responsive"
                            width={512} // Arbitrary width for aspect ratio
                            height={222} // Arbitrary height for aspect ratio
                            quality={100}
                            className="whitespace-pre-wrap
                                 rounded-[10px] md:rounded-[12px] h-[185px] md:h-[222px] object-center object-cover"
                            alt={blog.title}
                        />
                        <p className='mt-[16px] md:mt-[20px] text-[16px] md:text-[20px] font-semibold leading-[24px] md:leading-[30px] tracking-[-0.03em] text-[#FFFFFF]'>{blog.title}</p>
                        <span className='mt-1 md:mt-[10px] text-[14px] md:text-[20px] font-normal leading-[21px] md:leading-[30px] tracking-[-0.03em] text-[#98989A]'>{blog.category}</span>
                        {/* Share Button */}
                        <div className='mt-[10px] md:mt-[20px] flex flex-wrap gap-y-2 justify-between items-center'>
                            {/* 1 */}
                            <div className='flex items-center gap-x-[8px] md:gap-x-[10px]'>
                                <div className="flex items-center space-x-1 md:space-x-[10px] px-[14px] md:px-[16px] py-[6px] md:py-[8px] rounded-[100px] border border-[#262626] bg-[#141414] hover:border-white transition">
                                    <Heart className="w-[20px] md:w-[24px] h-[20px] md:h-[24px] text-[#666666]" />
                                    <span className="text-[#98989A] font-normal text-[14px] md:text-[18px] leading-[21px] md:leading-[27px] tracking-[-0.03em]">206</span>
                                </div>

                                <div className="flex items-center space-x-1 md:space-x-[10px] px-[14px] md:px-[16px] py-[6px] md:py-[8px] rounded-[100px] border border-[#262626] bg-[#141414] hover:border-white transition">
                                    <Send className="w-[20px] md:w-[24px] h-[20px] md:h-[24px] text-[#666666]" />
                                    <span className="text-[#98989A] font-normal text-[14px] md:text-[18px] leading-[21px] md:leading-[27px] tracking-[-0.03em]">206</span>
                                </div>
                            </div>
                            {/* 2 */}
                            <Button onClick={()=>router.push(`/blog/${blog._id}`)} className="bg-[#141414] border border-[#262626] rounded-[8px] md:rounded-[12px] text-[#98989A] text-[14px] md:text-[18px] font-normal leading-[21px] md:leading-[27px] px-[20px] md:px-[24px] py-[14px] md:py-[18px] flex items-center gap-x-1 md:gap-x-[10px]" >
                                <span>Read More</span>
                                <Arrow />
                            </Button>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default SimilarBlogs