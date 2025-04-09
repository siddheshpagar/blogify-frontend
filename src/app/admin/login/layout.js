"use client";

import Image from "next/image";
import { Suspense } from "react";

export default function Layout({ children }) {
    return (
        <Suspense fallback={
            <div className="flex flex-col gap-2 items-center justify-center h-screen w-screen">
                <Image className="animate-spin rounded-full" src="/loading.png" width={48} height={48} alt="Loading..." />
                <p className="mt-4 text-2xl font-semibold text-white animate-pulse">
                    Loading....
                </p>
            </div>
        }>
            {children}
        </Suspense>
    );
}
