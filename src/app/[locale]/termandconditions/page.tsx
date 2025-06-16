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
        style={{ backgroundImage: `url('/Desktop - 33 (1).png')` }}
      >
        <div className="flex flex-col justify-center items-center py-16 px-8 w-full">
          <motion.h4
            initial={{ opacity: 0 }} // Start from left with opacity 0
            animate={{ opacity: 1 }} // Animate to full opacity and original position
            transition={{ duration: 2 }} // Animation duration of 3 seconds
            className="text-white sm:text-5xl text-2xl font-bold"
          >
            Terms and Conditions
          </motion.h4>
        </div>
      </section>
      <section className="w-full relative flex flex-col justify-center items-center sm:pt-0 pt-0 sm:px-40 px-6 dark:bg-slate-950 bg-white h-full">
        <div className="flex sm:flex-row flex-col gap-y- sm:gap-x-10 sm:my-16 my-8 w-full">
          <div className="w-1/2">
            <Image
              src="/Desktop - 35.png"
              alt="Human Initiative"
              width={800}
              height={568}
              className="w-[700px] h-[468px]"
            />
          </div>
          <div className="flex flex-col gap-y-10 w-1/2">
            <div className="flex flex-col gap-y-10">
              <h5 className="title-2xl-semibold-black">Syarat dan Ketentuan</h5>
              <p className="text-p-14">
                Syarat dan ketentuan dalam halaman ini mengikat para pengunjung
                dan pengguna situs human-initiative.org untuk tunduk dan patuh
                atas apa yang telah ditetapkan oleh pihak pengelola situs.
                Dengan mengunjungi dan/atau menggunakan situs
                human-initiative.org, maka baik pengunjung maupun pengguna
                dinyatakan telah memahami dan menyepakati semua isi dalam syarat
                dan ketentuan di bawah ini.
              </p>
            </div>
            <div className="flex flex-col gap-y-6">
              <h6 className="title-xl-semibold-black">Umum</h6>
              <p className="text-p-14">
                human-initiative.org adalah situs yang dikelola oleh manajemen
                lembaga Human Initiative yang menyediakan informasi dan
                fasilitas donasi via online untuk program-program lembaga.
                Pernyataan lainnya tentang Human Initiative dapat dibaca di FAQ.
              </p>
              <p className="text-p-14">
                Kewajiban pengunjung dan pengguna situs adalah memberikan data
                dan informasi dengan benar, tidak menyesatkan, dan/atau tidak
                melakukan pemalsuan.
              </p>
              <p className="text-p-14">
                Human Initiative menjamin tidak akan mendukung atau menyediakan
                dana/material untuk individu maupun organisasi yang dikenal
                menganjurkan, mendukung, atau terlibat dalam aktivitas melanggar
                hukum, kekerasan, pencucian uang ataupun terorisme.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full relative flex flex-col justify-center items-center sm:pt-0 pt-0 sm:px-40 px-6 dark:bg-slate-950 bg-white h-full">
        <div className="flex sm:flex-row-reverse flex-col gap-y- sm:gap-x-10 sm:my-16 my-8 w-full">
          <div className="w-1/2">
            <Image
              src="/Desktop - 36.png"
              alt="Human Initiative"
              width={800}
              height={568}
              className="w-[700px] h-[468px]"
            />
          </div>
          <div className="flex flex-col gap-y-10 w-1/2">
            <div className="flex flex-col gap-y-6">
              <h6 className="title-xl-semibold-black">Bagi Donatur</h6>
              <p className="text-p-14">
                Pengguna situs yang merupakan pendukung program baik dalam bentuk donasi, penyebaran informasi, dan berbagai bentuk dukungan lainnya berkewajiban untuk:
              </p>
              <ul className="list-decimal">
                <li className="text-p-14">Mencermati segala informasi mengenai program yang dimuat di dalam situs sebelum memberi dukungan.</li>
                <li className="text-p-14">Calon donatur dapat memanfaatkan kontak yang tertera dalam situs untuk mengetahui detail program baik saat penggalangan dana maupun saat implementasi program.</li>
                <li className="text-p-14">Mencantumkan nama sebenarnya & alamat email aktif saat berdonasi, ini untuk memudahkan pengguna situs dalam mendapatkan laporan implementasi program dari lembaga.</li>
                <li className="text-p-14">Tidak menggunakan uang yang berasal dari sumber yang tidak sah secara hukum dalam mendonasikan uangnya untuk mendukung program-program yang tertera di dalam situs.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
