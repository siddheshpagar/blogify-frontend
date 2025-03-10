import Image from 'next/image';
import { Heart, Send } from 'lucide-react';
import { BASE_URL } from '@/services/APIConstant';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import Arrow from './Arrow';

const BlogCard = ({ id, title, category, imageSrc, description, likes, shares }) => {
    const router = useRouter();

    return (
        <div className="rounded-lg overflow-hidden mb-4">
            <Image
                src={`${BASE_URL}/blog-pics/${imageSrc}`}
                alt={title}
                width={512}
                height={222}
                className="w-[358px] h-[185px] lg:w-[512px] lg:h-[222px]  object-cover"
            />
            <div className="pt-4 max-w-[358px] lg:max-w-[512px]">
                <h3 className="pb-2 lg:pb-3 text-base lg:text-lg">{title}</h3>
                <p className="pb-2 lg:pb-3 text-sm lg:text-lg text-[#98989A]">{category}</p>
                <p className=" ProseMirror text-[#98989A] break-all md:mt-3 text-base lg:text-xl"
                    dangerouslySetInnerHTML={{ __html:  `${description.slice(0, 200)}...` }}
                />
                <div className="flex items-center justify-between mt-4 text-gray-400">
                    <div className='flex gap-[10px]'>
                        <div className="flex items-center space-x-1 px-[14px] md:px-4 py-[6px] md:py-[8px] rounded-[100px] border border-[#262626] bg-[#141414] hover:border-[#4a4a4a]">
                            <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-[#666666]" />
                            <span>{likes}</span>
                        </div>
                        <div className="flex items-center space-x-1 px-[14px] md:px-4 py-[6px] md:py-[8px] rounded-[100px] border border-[#262626] bg-[#141414] hover:border-[#4a4a4a]">
                            <Send className="w-5 h-5 lg:w-6 lg:h-6 text-[#666666]" />
                            <span>{shares}</span>
                        </div>
                    </div>
                    <Button onClick={() => router.push(`/blog/${id}`)} className="text-[#98989A] rounded-[12px]  text-sm lg:text-lg bg-[#141414] border border-[#262626] hover:border-[#4a4a4a] md:px-[18px] md:py-[24px]">
                        Read more<Arrow />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
