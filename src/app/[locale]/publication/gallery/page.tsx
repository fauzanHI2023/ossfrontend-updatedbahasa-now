"use client"
import React from 'react'
import BannerPublikasi from '@/components/ui/banner/BannerPublikasi';

const Gallery = () => {
  const homePageImages = [
    "/gallery (1).png",
    "/gallery (2).png",
    "/gallery (3).png",
    "/gallery (4).png",
  ]; // Daftar gambar untuk halaman beranda
  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
        <BannerPublikasi images={homePageImages} title='Gallery of Human Initiative' hashtag='Berdaya, Kolaborasi, Amanah'/>
    </main>
  )
}

export default Gallery