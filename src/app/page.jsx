import MiddleSection from "@/components/HomePage/MiddleSection";
import VideosCard from "@/components/HomePage/VideosCard";
import TopOfHomepage from "@/components/HomePage/TopOfHomepage";
import FeaturedBlog from "@/components/HomePage/FeaturedBlog";
import Blogs from "@/components/HomePage/Blogs";

export default function Home() {
  
  return (
    <main className="">
      <TopOfHomepage></TopOfHomepage> {/* Top Section of the homepage */}
      <MiddleSection></MiddleSection> {/* Middle Section of the homepage*/}
      <Blogs /> {/* Displaying a list of few blogs */}
      <FeaturedBlog /> {/* button to redirect to all blogs */}
      <VideosCard></VideosCard> {/* video-based Card */}
    </main >
  );
}