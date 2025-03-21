import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/HeaderSection/Header";
import FutureTech from "@/components/HomePage/FutureTech";
import Footer from "@/components/FooterSection/Footer";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Blogify",
  description: "Blogify is a modern blogging platform where you can create, edit, and share your thoughts with the world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#141414] text-white`}
      >
        {/* Wrapping the entire app with React Query provider for API state management */}
        <ReactQueryProvider>

          {/* Main header and navbar component */}
          <Header></Header>

          {/* Dynamic page content goes here */}
          {children}

          {/* Footer component */}
          <FutureTech></FutureTech> {/* List of key features displayed in the section */}
          <Footer></Footer> {/* footer links and buttons */}

          {/* React Query DevTools for debugging API requests */}
          {/* <ReactQueryDevtools/> */}

        </ReactQueryProvider>
      </body>
    </html>
  );
}
