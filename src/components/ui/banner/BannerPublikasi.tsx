// components/BannerPublikasi.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface BannerProps {
  images: string[];
  title: string; // Tambahkan prop untuk judul
  hashtag: string;
}

const BannerPublikasi: React.FC<BannerProps> = ({ images, title, hashtag }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000); // Ganti gambar setiap 8 detik

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full h-[600px] overflow-hidden mx-6 rounded-2xl mb-16">
      <AnimatePresence>
        {images.map(
          (image, index) =>
            index === currentImageIndex && (
              <motion.div
                key={image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, delay: 3 }} // Durasi animasi fade
                className="absolute top-0 left-0 w-full h-full"
              >
                <Image
                  src={image}
                  alt={`Banner ${index + 1}`}
                  width={1500}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )
        )}
      </AnimatePresence>
      {/* Overlay dengan background hitam di sebelah kiri saja */}
      <div className="absolute top-0 left-0 h-full w-[800px] bg-gradient-to-r from-sky-950 to-sky-800/[0] flex flex-col gap-y-6 items-start justify-center px-16">
        <h1 className="text-white text-xl md:text-4xl font-bold px-4 break-all">{title}</h1>
        <h1 className="text-white text-sm md:text-xl font-semibold px-4">{hashtag}</h1>
      </div>
    </section>
  );
};

export default BannerPublikasi;