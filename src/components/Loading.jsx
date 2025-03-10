"use client"
import { LoaderPinwheel } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center  justify-center ">
      {/* Fixed Spinning Loader */}
      <LoaderPinwheel className="spinning-loader text-white w-16 h-16" />

      {/* Loading Text */}
      <p className="mt-4 text-lg font-semibold text-white animate-pulse">
        Loading...
      </p>

      {/* Custom CSS Animation */}
      <style>
        {`
          @keyframes smoothSpin {
            0% { transform: rotate(0deg); animation-timing-function: ease-in; }
            50% { transform: rotate(180deg); animation-timing-function: ease-out; }
            100% { transform: rotate(360deg); animation-timing-function: ease-in; }
          }

          .spinning-loader {
            animation: smoothSpin 1s infinite;
          }
        `}
      </style>
    </div>
  );
}
