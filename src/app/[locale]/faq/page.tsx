"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Page: React.FC = () => {
  return (
    <main className="flex flex-col sm:py-16 py-6 sm:pt-28 pt-24 dark:bg-slate-950 bg-white">
      <section
        className="w-full relative flex flex-row sm:pt-0 pt-0 sm:px-6 px-6 dark:bg-slate-950 bg-white sm:h-[600px] relative z-20 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url('/FAQ.png')` }}
      >
        <div className="flex flex-col justify-center items-center py-16 px-8 w-full">
          <motion.h4
            initial={{ opacity: 0 }} // Start from left with opacity 0
            animate={{ opacity: 1 }} // Animate to full opacity and original position
            transition={{ duration: 2 }} // Animation duration of 3 seconds
            className="text-white sm:text-5xl text-2xl font-bold"
          >
            FAQ
          </motion.h4>
        </div>
      </section>
      <section className="w-full relative flex flex-col justify-center items-center sm:pt-0 pt-0 sm:px-6 px-6 dark:bg-slate-950 bg-white h-full">
        <div className="sm:my-16 my-8 w-1/2">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Apakah seluruh donasi akan disalurkan sesuai program Human
                Initiative?
              </AccordionTrigger>
              <AccordionContent>
                Donasi yang diamanahkan melalui Human Initiative akan disalurkan
                sesuai dengan program yang dipilih atau program yang saat ini
                dijalankan oleh Human Initiative
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Apa perbedaan antara Investasi Peduli dengan program yang lain?
              </AccordionTrigger>
              <AccordionContent>
                Investasi Peduli adalah sebuah program untuk para donatur yang ingin secara rutin dan  bersinambungan mendukung seluruh program Human Initiative. Program Invenstasi Peduli ini adalah program rutin jangka panjang berbasis dana infaq bebas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Apakah donasi melalui pembayaran secara online aman ?
              </AccordionTrigger>
              <AccordionContent>
                Kami bekerjasama dengan pihak ketiga yaitu Midtrans dalam sistem pembayaran online yang telah tersertifikasi keamanannya. Para donatur akan mendapatkan kode OTP dari bank ketika akan melakukan transaksi sehingga keamanan terjamin.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Apakah perlu melakukan konfirmasi setelah melakukan donasi?
              </AccordionTrigger>
              <AccordionContent>
                Ya, kami berharap Bapak/Ibu Donatur melakukan konfirmasi setelah berdonasi. Hal tersebut Untuk kemudahan pelacakan transaksi atas donasi yang Bapak/Ibu lakukan serta penyaluran sesuai dengan peruntukannya. Silahkan konfirmasi  melalui salah satu channel layanan kami yaitu website human-initiative.org, layanan donatur di nomor WhatsApp 087782662667 atau email: care@human-intitative.org 
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                Jika tidak melakukan konfirmasi apakah donasi saya tetap akan disalurkan?
              </AccordionTrigger>
              <AccordionContent>
                Ya, Human Initiative akan tetap menyalurkan donasi yang masuk dari nomor rekening yang tertera. Namun demi kenyamanan bersama, kami berharap Bapak/Ibu donatur melakukan konfirmasi setelah berdonasi untuk program yang anda pilih. Hal tersebut demi kelancaran informasi serta penyaluran donasi secara tepat. Untuk lebih memudahkan proses donasi, Bapak/Ibu dapat langsung berdonasi via web human-initiative.org atau solusipeduli.org
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>
                Apakah saya mendapatkan laporan donasi?
              </AccordionTrigger>
              <AccordionContent>
                Laporan donasi akan kami kirimkan dalam bentuk berita penyaluran setelah donatur melakukan konfirmasi. Laporan kami kirimkan via email, atau whatsapp. Untuk laporan hardcopy Khusus untuk  jumlah donasi tertentu. Silahkan menghubungi layanan donatur kami di (021) 87780015 atau care@human-initiative.org untuk informasi lebih detail
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>
                Dimana saya bisa mengecek donasi saya telah disalurkan?
              </AccordionTrigger>
              <AccordionContent>
                Bapak/Ibu dapat follow akun sosial media resmi Human Initiative untuk  melihat informasi penyaluran dan program. Silahkan berkunjung ke laman Facebook : Human Initiative atau Instagram di @humaninitiative_id
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
};

export default Page;
