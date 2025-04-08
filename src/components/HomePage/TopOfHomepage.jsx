"use client"
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import Arrow from '../Arrow';
import { Statistics } from './Statistics';
import { useRouter } from 'next/navigation';

export default function TopOfHomepage() {

  const router = useRouter();

  // Statistics data for the homepage
  const stats = [
    {
      number: "300",
      description: "Resources available",
    },
    {
      number: "12k",
      description: "Total Downloads",
    },
    {
      number: "10k",
      description: "Active Users",
    },
  ];

  // Profile images for the community section
  const profiles = [
    { src: '/person1.png', alt: 'Person 1' },
    { src: '/person2.png', alt: 'Person 2' },
    { src: '/person3.png', alt: 'Person 3' },
    { src: '/person4.png', alt: 'Person 4' },
  ];

  return (
    <div className=''>

      {/* Grid layout On large screens (lg), it has two sections with a 3:2 ratio and on mobile screens it stacks into a single column */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] lg:border-b lg:border-[#262626]">

        {/* 1 */}
        <div className="lg:border-r lg:border-[#262626]">
          <section className="lg:ml-20 text-center py-12 lg:py-16 px-5">
            <div className="max-w-7xl mx-auto text-left">
              <p className="text-lg lg:text-3xl text-[#666666] mb-3">
                Your Journey to Tomorrow Begins Here
              </p>
              <h1 className="text-3xl lg:text-6xl font-bold mt-4 mb-1">
                Explore the Frontiers of Artificial Intelligence
              </h1>
              <p className="text-sm lg:text-lg text-[#7E7E81] mt-4">
                Welcome to the epicenter of AI innovation. {process.env.NEXT_PUBLIC_APP_NAME} AI News is your passport to a world where machines think, learn, and reshape the future. Join us on this visionary expedition into the heart of AI.
              </p>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="grid grid-cols-3 text-center lg:pt-8">
            {
              // Displaying key numbers
              stats.map((stat, index) => (
                <Statistics
                  key={index}
                  number={stat.number}
                  description={stat.description}
                  index={index}
                  totalItems={stats.length}
                />
              ))
            }
          </section>
        </div>

        {/* 2 */}
        <div className="border-[#262626] border-b pb-8 lg:p-0 lg:border-0">

          {/* rays image */}
          <Image src="/rays.png" alt="rays" width={500} height={500} />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-gray-700 via-black to-transparent opacity-20 pointer-events-none"></div>

          <div className="pl-16">
            <h2 className="text-[18px] lg:text-[24px] font-bold mb-4">
              Explore 1000+ resources
            </h2>
            <p className="text-[14px] lg:text-[18px] mb-6 text-[#98989A]">
              Over 1,000 articles on emerging tech trends and breakthroughs.
            </p>

            {/* Profile Images of community members */}
            <div className="bg-[#262626] lg:max-w-52 max-w-24 rounded-full flex relative z-10 mb-6">
              {profiles.map((profile, index) => (
                <div
                  key={index}
                  className="content-center w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] rounded-full overflow-hidden border-[#262626] -ml-2 lg:-ml-4 mt-1 mb-1 first:ml-1 last:mr-1 lg:mt-2  lg:mb-2 lg:first:ml-2 lg:last:mr-2"
                >
                  <Image
                    src={profile.src}
                    alt={profile.alt}
                    width={60}
                    height={60}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>

            {/* Explore resources button */}
            <Button
              variant="default"
              onClick={() => { router.push("/blog") }}
              className="border border-[#262626] hover:bg-yellow-600"
            >
              Explore Resources<Arrow />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
