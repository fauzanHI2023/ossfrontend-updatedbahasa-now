"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

const Page: React.FC = () => {
  return (
    <main className="flex flex-col sm:py-16 py-6 sm:pt-28 pt-24 dark:bg-slate-950 bg-white">
      <section
        className="w-full relative flex flex-row sm:pt-0 pt-0 sm:px-6 px-6 dark:bg-slate-950 bg-white sm:h-[600px] relative z-20 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url('/Desktop - 34.png')` }}
      >
        <div className="flex flex-col justify-center items-center py-16 px-8 w-full">
          <motion.h4
            initial={{ opacity: 0 }} // Start from left with opacity 0
            animate={{ opacity: 1 }} // Animate to full opacity and original position
            transition={{ duration: 2 }} // Animation duration of 3 seconds
            className="text-white sm:text-5xl text-2xl font-bold"
          >
            Privacy and Policy
          </motion.h4>
        </div>
      </section>
      <section className="w-full relative flex flex-col justify-center items-center sm:pt-0 pt-0 sm:px-40 px-6 dark:bg-slate-950 bg-white h-full">
        <div className="flex sm:flex-row flex-col gap-y- sm:gap-x-10 sm:my-16 my-8 w-full">
          <div className="w-1/2">
            <Image
              src="/Desktop - 37.png"
              alt="Human Initiative"
              width={800}
              height={568}
              className="w-[700px] h-[468px]"
            />
          </div>
          <div className="flex flex-col gap-y-10 w-1/2">
            <div className="flex flex-col gap-y-6">
              <h6 className="title-2xl-semibold-black">Privacy</h6>
              <p className="text-p-14">
                Human Initiative sebagai pengelola situs melindungi keamanan data pengguna situs. Kebijakan ini berlaku untuk semua laman yang dikelola oleh manajemen lembaga Human Initiative di situs human-initiative.org dan pengolahan data secara offline.
              </p>
              <p className="text-p-14">
                Pengelola situs tidak menjual atau menyewakan informasi pribadi pengguna situs kepada pihak-pihak di luar lembaga Human Initiative. Data yang diberikan pengguna situs kepada pengelola situs adalah sebagai pemenuhan syarat atas pemanfaatan fasilitas, fitur, dan/atau layanan yang ditawarkan oleh pengelola situs.
              </p>
              <p className="text-p-14">
                Kerahasiaan data pengguna situs yang wajib dijaga oleh pengelola situs human-initiative.org menjadi tidak berlaku apabila pengelola situs dipaksa oleh ketentuan hukum yang berlaku, perintah pengadilan, dan/atau perintah dari aparat/instansi yang berwenang, untuk membuka data-data milik pengguna situs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
