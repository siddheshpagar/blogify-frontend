import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import Arrow from './Arrow';

export default function HeaderHomepage() {

  const profiles = [
    { src: '/person1.png', alt: 'Person 1' },
    { src: '/person2.png', alt: 'Person 2' },
    { src: '/person3.png', alt: 'Person 3' },
    { src: '/person4.png', alt: 'Person 4' },
  ];

  return (
    <div className=''>

      {/* at top */}
      <p className='text-center text-xs lg:text-sm '>
        Subscribe to our Newsletter For New & Latest Blogs and Resources
        <Link href={"/newsletter"}>
          <Arrow />
        </Link>
      </p>

      {/* Header */}
      <header className="bg-[#1a1a1a] flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt={`${process.env.NEXT_PUBLIC_APP_NAME} Logo`} width={50} height={50} className='w-[35px] h-[35px] lg:w-[50px]  lg:h-[50px]' />
          <span className="text-lg lg:text-xl font-bold">{process.env.NEXT_PUBLIC_APP_NAME}</span>
        </div>
        <Button variant="secondary" className="bg-yellow-500 text-black">
          Subscribe
        </Button>
      </header>

      {/* //////////// */}
      {/*  Section 1 and Section 2 */}

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] lg:border-b lg:border-[#262626]">
        {/* 1 */}
        <div className="lg:border-r lg:border-[#262626]">
          {/* Top Section */}
          <section className="lg:ml-20 text-center py-12 lg:py-16 px-5">
            <div className="max-w-7xl mx-auto text-left">
              <p className="text-lg lg:text-3xl text-[#666666] mb-3">
                Your Journey to Tomorrow Begins Here
              </p>
              <h1 className="text-3xl lg:text-6xl font-bold mt-4 mb-1">
                Explore the Frontiers of Artificial Intelligence
              </h1>
              <p className="text-sm lg:text-lg text-[#7E7E81] mt-4">
                Welcome to the epicenter of AI innovation. Blogify AI News is your passport to a world where machines think, learn, and reshape the future. Join us on this visionary expedition into the heart of AI.
              </p>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="grid grid-cols-3 text-center lg:pt-8">
            <div className="border border-[#262626] p-8">
              <h3 className="text-3xl font-bold pb-3">300<span className='text-yellow-500'>+</span></h3>
              <p className="text-[#98989A]">Resources available</p>
            </div>
            <div className="border border-[#262626] p-8">
              <h3 className="text-3xl font-bold pb-3">12k<span className='text-yellow-500'>+</span></h3>
              <p className="text-[#98989A]">Total Downloads</p>
            </div>
            <div className="border border-[#262626] p-8">
              <h3 className="text-3xl font-bold pb-3">10k<span className='text-yellow-500'>+</span></h3>
              <p className="text-[#98989A]">Active Users</p>
            </div>
          </section>
        </div>

        {/* 2 */}
        <div className="border-[#262626] border-b pb-8 lg:p-0 lg:border-0">
          {/* rays */}
          <Image src="/rays.png" alt="rays" width={500} height={500} />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-gray-700 via-black to-transparent opacity-20 pointer-events-none"></div>

          <div className="pl-16">
            {/* Header */}
            <h2 className="text-[18px] lg:text-[24px] font-bold mb-4">
              Explore 1000+ resources
            </h2>
            <p className="text-[14px] lg:text-[18px] mb-6 text-[#98989A]">
              Over 1,000 articles on emerging tech trends and breakthroughs.
            </p>

            {/* Images */}
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

            {/* Button */}
            <Button
              variant="default"
              className="border border-[#262626] hover:bg-yellow-600"
            >
              Explore Resources<Arrow />
            </Button>
          </div>
        </div>

      </div>



      <div className=" text-left grid gap-x-8 grid-cols-1 lg:grid-cols-3">
        <div className="p-5 lg:p-10 border-b lg:border-r  lg:border-b-0 border-[#262626]">
          <Image src="/item1.png" alt="" width={50} height={50} className="mb-4 w-[30px] h-[30px] lg:w-[50px] lg:h-[50px]" />
          <div className="flex items-center gap-x-20">
            <div>
              <h3 className="text-base lg:text-xl font-bold">Latest News Updates</h3>
              <p className="mt-1 text-[#7E7E81] text-sm lg:text-lg">Stay Current</p>
            </div>
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <Arrow color='#141414' />
            </div>
          </div><p className="mt-4 text-[#98989A] text-sm lg:text-xl">Over 1,000 articles published monthly</p>
        </div>

        <div className="p-5 lg:p-10 border-b lg:border-r lg:border-b-0 border-[#262626]">
          <Image src="/item2.png" alt="" width={50} height={50} className="mb-4 w-[30px] h-[30px] lg:w-[50px] lg:h-[50px]" />
          <div className="flex items-center gap-x-20">
            <div>
              <h3 className="text-base lg:text-xl font-bold">Expert Contributors</h3>
              <p className="mt-1 text-[#7E7E81] text-sm lg:text-lg">Trusted Insights</p>
            </div>
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <Arrow color='#141414' />
            </div>
          </div><p className="mt-4 text-[#98989A] text-sm lg:text-xl">50+ renowned AI experts on our team</p>
        </div>

        <div className="p-5 lg:p-10 ">
          <Image src="/item3.png" alt="" width={50} height={50} className="mb-4 w-[30px] h-[30px] lg:w-[50px] lg:h-[50px]" />
          <div className="flex items-center gap-x-20">
            <div>
              <h3 className="text-base lg:text-xl font-bold">Global Readership</h3>
              <p className="mt-1 text-[#7E7E81] text-sm lg:text-lg">Worldwide Impact</p>
            </div>
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <Arrow color='#141414' />
            </div>
          </div><p className="mt-4 text-[#98989A] text-sm lg:text-xl">2 million monthly readers</p>
        </div>
      </div>

      <div className="p-5 lg:p-10 mt-5 lg:mt-8 lg:text-left lg:flex lg:items-start lg:justify-between">
        <h2 className="text-3xl font-bold">
          Today&apos;s Headlines: Stay Informed
        </h2>
        <p className="mt-4 text-gray-300 lg:mt-0 lg:ml-4 lg:w-1/2">
          Explore the latest news from around the world. We bring you up-to-the-minute updates on the most significant events, trends, and stories. Discover the world through our news coverage.
        </p>
      </div>


    </div>
  );
}


/*

pages/index.js
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Homepage() {
  return (
    <div className="bg-[#141414] text-white">
      //Top notification banner 
      <div className="bg-[#1a1a1a] text-center text-sm py-2">
        Subscribe to our Newsletter For New & Latest Blogs and Resources
        <Link href="/newsletter" className="ml-2 inline-block text-yellow-500 hover:underline">
          <ArrowRight className="inline-block ml-1" />
        </Link>
      </div>

       Header
      <header className="bg-[#1a1a1a] flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="FutureTech Logo" width={50} height={50} />
          <span className="text-lg lg:text-xl font-bold">FutureTech</span>
        </div>
        <Button variant="secondary" className="bg-yellow-500 text-black">
          Subscribe
        </Button>
      </header>

       //Hero Section 
      <section className="text-center py-16 bg-[#141414]">
        <h1 className="text-4xl lg:text-6xl font-bold">Explore the Frontiers of Artificial Intelligence</h1>
        <p className="text-lg text-gray-400 mt-4 max-w-xl mx-auto">
          Welcome to the epicenter of AI innovation. FutureTech AI News is your passport to a world where machines think, learn, and reshape the future.
        </p>
      </section>

       //Statistics Section 
      <section className="grid grid-cols-3 gap-8 text-center py-8">
        <div>
          <h3 className="text-3xl font-bold text-yellow-500">300+</h3>
          <p className="text-gray-400">Resources available</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-yellow-500">12k+</h3>
          <p className="text-gray-400">Total Downloads</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-yellow-500">10k+</h3>
          <p className="text-gray-400">Active Users</p>
        </div>
      </section>

      //Resources Section 
      <section className="grid grid-cols-2 gap-8 py-8">
        <div className="bg-[#1A1A1A] p-6 rounded-lg">
          <h4 className="text-2xl font-bold mb-4">Explore 1000+ resources</h4>
          <p className="text-gray-400 mb-4">
            Over 1,000 articles on emerging tech trends and breakthroughs.
          </p>
          <Button variant="secondary" className="bg-yellow-500 text-black">
            Explore Resources
          </Button>
        </div>
        <div className="bg-[#1A1A1A] p-6 rounded-lg">
          <h4 className="text-2xl font-bold mb-4">Latest News Updates</h4>
          <p className="text-gray-400 mb-4">
            Stay current with the latest updates in AI technology.
          </p>
          <Link href="/news">
            <a className="text-yellow-500 hover:underline flex items-center">
              See Latest News <ArrowRight className="ml-2" />
            </a>
          </Link>
        </div>
      </section>

      // Headlines Section 
      <section className="bg-[#1A1A1A] text-center py-12">
        <h2 className="text-4xl font-bold mb-4">Today&apos;s Headlines: Stay Informed</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Explore the latest news from around the world. We bring you up-to-the-minute updates on significant events, trends, and stories.
        </p>
      </section>
    </div>
  );
}


*/