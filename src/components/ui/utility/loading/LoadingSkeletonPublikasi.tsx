"use client"
import React from 'react'
import BannerPublikasi from '@/components/ui/banner/BannerPublikasi';
import { Skeleton } from '../../skeleton';

const LoadingSkeletonPublikasi = () => {
  const homePageImages = [
    "/document (1).png",
    "/document (2).png",
    "/document (3).png",
    "/document (4).png",
  ]; // Daftar gambar untuk halaman beranda
  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
        <BannerPublikasi images={homePageImages} title='Document'/>
        <section className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-8">
                <Skeleton className=""/>
            </div>
            <div className="flex flex-row gap-x-8">
                <div className="flex flex-col gap-y-4 w-1/4">
                    <div className="w-full h-20">
                        <Skeleton/>
                    </div>
                    <div className="flex flex-col gap-y-2"> 
                        <Skeleton className="w-full"/>
                        <Skeleton className="w-full"/>
                    </div>
                </div>
                <div className="flex flex-col gap-y-4 w-1/4">
                    <div className="w-full h-20">
                        <Skeleton/>
                    </div>
                    <div className="flex flex-col gap-y-2"> 
                        <Skeleton className="w-full"/>
                        <Skeleton className="w-full"/>
                    </div>
                </div>
                <div className="flex flex-col gap-y-4 w-1/4">
                    <div className="w-full h-20">
                        <Skeleton/>
                    </div>
                    <div className="flex flex-col gap-y-2"> 
                        <Skeleton className="w-full"/>
                        <Skeleton className="w-full"/>
                    </div>
                </div>
                <div className="flex flex-col gap-y-4 w-1/4">
                    <div className="w-full h-20">
                        <Skeleton/>
                    </div>
                    <div className="flex flex-col gap-y-2"> 
                        <Skeleton className="w-full"/>
                        <Skeleton className="w-full"/>
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}

export default LoadingSkeletonPublikasi