import { Heart, Send, Share, Share2, Share2Icon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import Arrow from '../Arrow';

const TopOneBlogArticle = () => {
    return (
        <div className="max-w-7xl lg:mx-auto mx-5 border-t border-b border-[#262626] py-6 lg:py-12 flex gap-8 flex-col lg:flex-row">
            <Image
                src="/images/blog_IMG1.png"
                alt="Global Climate Summit"
                width={515}
                height={427}
                className="rounded-lg w-[358px] h-[213px] lg:w-[515px] lg:h-[427px]"
            />
            <div className="p-4 flex flex-col justify-between max-w-[358px] lg:max-w-none">
                <h2 className="text-xl lg:text-[32px] font-bold">
                    Global Climate Summit Addresses Urgent Climate Action
                </h2>
                <p className="text-[#98989A] mt-2 lg:mt-3 text-base lg:text-xl">
                    World leaders gathered at the Global Climate Summit to discuss urgent climate action, emissions reductions, and renewable energy targets.
                </p>
                <div className="grid grid-cols-3 gap-x-2 gap-y-2 text-gray-500 mt-4">
                    {/* Headings */}
                    <div className="text-[#98989A] text-sm lg:text-lg">Category:</div>
                    <div className="text-[#98989A] text-sm lg:text-lg">Publication Date</div>
                    <div className="text-[#98989A] text-sm lg:text-lg">Author:</div>

                    {/* data */}
                    <div className='text-[#FFFFFF] text-sm lg:text-lg'>Environment</div>
                    <div className='text-[#FFFFFF] text-sm lg:text-lg'>October 10, 2023</div>
                    <div className='text-[#FFFFFF] text-sm lg:text-lg'>Jane Smith</div>
                </div>
                <div className="flex items-center justify-between mt-4 text-gray-400">
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
          <Button className="text-[#98989A] rounded-[12px]  text-sm lg:text-lg bg-[#141414] border border-[#262626] hover:border-[#4a4a4a] md:px-[18px] md:py-[24px]">
            Read more<Arrow />
          </Button>
        </div>
            </div>
        </div>

    );
};

export default TopOneBlogArticle;
