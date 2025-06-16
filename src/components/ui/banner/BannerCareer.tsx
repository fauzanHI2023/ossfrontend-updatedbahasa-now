"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

interface BannerCareerProps {
  title: string;
  description: string;
  titlepage: string;
  image: string;
}

const BannerCareer: React.FC<BannerCareerProps> = ({
  title,
  description,
  titlepage,
  image,
}) => {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section
      className="relative flex flex-row sm:pt-0 pt-0 sm:px-6 px-6 dark:bg-slate-950 bg-white sm:h-[600px] relative z-20 bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <motion.div 
        initial={{ opacity: 0, x: -650 }} // Start from left with opacity 0
        animate={{ opacity: 1, x: 0 }} // Animate to full opacity and original position
        transition={{ duration: 2 }} // Animation duration of 3 seconds
        className="absolute w-3/5 h-full left-0 z-10">
        <Image
          src="/Rectangle 581.png"
          width={1000}
          height={1000}
          alt={titlepage}
          className="w-full h-full"
          data-aos="fade-up-left"
          data-aos-duration="700"
        />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 350 }} // Start from left with opacity 0
        animate={{ opacity: 1, x: 0 }} // Animate to full opacity and original position
        transition={{ duration: 2, delay: 3 }} // Animation duration of 3 seconds
        className="absolute w-2/5 h-32 right-0 z-10"
        style={{top: '40%'}}>
        <Image
          src="/Rectangle 580.png"
          width={1000}
          height={1000}
          alt={titlepage}
          className="w-full h-full"
          data-aos="fade-up-left"
          data-aos-duration="700"
        />
      </motion.div>
      <div className="flex flex-col gap-y-16 justify-center items-start py-16 px-8 inset-0 w-2/3 h-full relative z-20">
        <motion.h4 
            initial={{ opacity: 0}} // Start from left with opacity 0
            animate={{ opacity: 1}} // Animate to full opacity and original position
            transition={{ duration: 2 }} // Animation duration of 3 seconds
            className="text-white text-4xl font-bold w-2/3"
        >
            {title}
        </motion.h4>
        <motion.h5 
            initial={{ opacity: 0}} // Start from left with opacity 0
            animate={{ opacity: 1}} // Animate to full opacity and original position
            transition={{ duration: 2, delay: 2 }} // Animation duration of 3 seconds
            className="text-white text-base font-normal w-2/3"
        >
          {description}
        </motion.h5>
      </div>
      <motion.div 
        className="flex flex-col w-1/3 justify-center items-center relative z-20"
        initial={{ opacity: 0}} // Start from left with opacity 0
        animate={{ opacity: 1}} // Animate to full opacity and original position
        transition={{ duration: 2, delay: 4 }} // Animation duration of 3 seconds
      >
        <h4 className="text-white text-5xl font-bold">{titlepage}</h4>
      </motion.div>
    </section>
  );
};

export default BannerCareer;
