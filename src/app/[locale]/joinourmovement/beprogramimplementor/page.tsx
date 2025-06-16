"use client";
import React, { useEffect } from "react";
import BannerCareer from "@/components/ui/banner/BannerCareer";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Landmark } from "lucide-react";
import {
  FaMoneyCheckDollar,
  FaArrowUpFromGroundWater,
  FaChartSimple,
  FaChildren,
} from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const BeProgrameImplementor = () => {
  useEffect(() => {
    AOS.init();
  });
  return (
    <main className="flex flex-col sm:py-16 py-6 sm:pt-28 pt-24 dark:bg-slate-950 bg-white">
      <BannerCareer
        title="Akselerasi Dampak Sosial NGO Lokal, Bersama Mewujudkan Perubahan!"
        description=""
        titlepage="Implementator Program"
        image="/implementatorprogrambe.png"
      />
      <section className="flex sm:flex-row flex-col gap-x-12 w-full sm:px-48 sm:py-16 p-6 dark:bg-slate-950 bg-white">
        <div className="w-1/2 flex flex-col gap-y-12">
          <h5
            className="title-xl-medium-blue"
            data-aos="fade-left"
            data-aos-easing="linear"
            data-aos-duration="500"
            data-aos-once="true"
          >
            Dukungan dan Pendanaan untuk NGO Lokal di Indonesia
          </h5>
          <p
            className="text-p-16"
            data-aos="fade-left"
            data-aos-easing="linear"
            data-aos-delay="200"
            data-aos-duration="500"
            data-aos-once="true"
          >
            Human Initiative membuka kesempatan bagi NGO, Yayasan, atau Lembaga
            Sosial lokal di Indonesia untuk bergabung dalam program pendanaan
            dan dukungan kami. Program ini dirancang untuk memperkuat kapasitas
            organisasi lokal melalui pendanaan, pelatihan, coaching, dan
            pendampingan, agar mampu memberikan dampak sosial yang lebih luas
            dan berkelanjutan.
          </p>
        </div>
        <div className="w-1/2"></div>
      </section>
      <section className="flex flex-col justify-center items-center gap-y-12 w-full sm:px-48 sm:py-16 p-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-col justify-center items-center gap-y-12">
          <h5
            className="title-4xl-extrabold-black"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-delay="400"
            data-aos-duration="500"
            data-aos-once="true"
          >
            Tentang Program&nbsp;
            <span
              className="title-4xl-extrabold-blue"
              data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-delay="500"
              data-aos-duration="500"
              data-aos-once="true"
            >
              Grant Making Organization
            </span>
          </h5>
          <p
            className="text-p-16 text-center"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-delay="600"
            data-aos-duration="500"
            data-aos-once="true"
          >
            Human Initiative berkomitmen untuk mendukung NGO dan Lembaga Sosial
            lokal di Indonesia dalam upaya meningkatkan kapasitas dan dampak
            program sosial. Melalui program ini, kami menyediakan pendanaan,
            pelatihan, coaching, dan pendampingan bagi organisasi yang memiliki
            visi dan misi sejalan dengan nilai-nilai kemanusiaan dan pembangunan
            berkelanjutan.
          </p>
        </div>
        <div className="w-1/2"></div>
      </section>
      <section className="flex sm:flex-row flex-col sm:gap-x-12 gap-y-8 w-full sm:px-48 sm:py-16 p-6 bg-about-implementator-program">
        <div className="w-1/2 flex flex-col gap-y-12">
          <h5
            className="title-xl-medium-blue"
            data-aos="fade-left"
            data-aos-easing="linear"
            data-aos-duration="500"
            data-aos-once="true"
          >
            Mengapa Bergabung dengan Program Ini?
          </h5>
          <p
            className="text-p-16-white"
            data-aos="fade-left"
            data-aos-easing="linear"
            data-aos-delay="200"
            data-aos-duration="500"
            data-aos-once="true"
          >
            Kami memahami tantangan yang dihadapi oleh NGO dan LSM lokal, mulai
            dari keterbatasan dana hingga kurangnya sumber daya untuk pelatihan
            dan pengembangan. Oleh karena itu, kami menawarkan solusi lengkap
            yang tidak hanya memberikan dana, tetapi juga penguatan kapasitas
            organisasi melalui berbagai bentuk dukungan:
          </p>
        </div>
        <div className="w-1/2">
          <div className="flex flex-col gap-y-6 w-full">
            <div className="flex flex-row gap-x-4 bg-white rounded-3xl shadow px-6 py-4">
              <span
                className="w-20 flex flex-col justify-center items-center"
                data-aos="zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="300"
                data-aos-once="true"
              >
                <FaMoneyCheckDollar className="text-sky-800 text-4xl w-16 h-16 stroke-1" />
              </span>
              <div className="flex flex-col gap-y-2">
                <h5
                  className="title-xl-medium-blue border-b border-slate-200"
                  data-aos="fade-left"
                  data-aos-easing="linear"
                  data-aos-duration="500"
                  data-aos-once="true"
                >
                  Pendanaan Program
                </h5>
                <p
                  className="text-p-14"
                  data-aos="fade-left"
                  data-aos-easing="linear"
                  data-aos-delay="300"
                  data-aos-duration="500"
                  data-aos-once="true"
                >
                  Dana bantuan untuk mendukung pelaksanaan proyek-proyek sosial
                  yang berdampak.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-x-4 bg-white rounded-3xl shadow px-6 py-4">
              <span
                className="w-20 flex flex-col justify-center items-center"
                data-aos="zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="300"
                data-aos-once="true"
              >
                <FaArrowUpFromGroundWater className="text-sky-800 text-4xl w-16 h-16 stroke-1" />
              </span>
              <div className="flex flex-col gap-y-2">
                <h5
                  className="title-xl-medium-blue border-b border-slate-200"
                  data-aos="fade-left"
                  data-aos-easing="linear"
                  data-aos-duration="500"
                  data-aos-once="true"
                >
                  Training
                </h5>
                <p
                  className="text-p-14"
                  data-aos="fade-left"
                  data-aos-easing="linear"
                  data-aos-delay="300"
                  data-aos-duration="500"
                  data-aos-once="true"
                >
                  Pelatihan yang berfokus pada penguatan kapasitas manajemen,
                  pengelolaan proyek, dan peningkatan keterampilan teknis.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-x-4 bg-white rounded-3xl shadow px-6 py-4">
              <span
                className="w-20 flex flex-col justify-center items-center"
                data-aos="zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="300"
                data-aos-once="true"
              >
                <FaChartSimple className="text-sky-800 text-4xl w-16 h-16 stroke-1" />
              </span>
              <div className="flex flex-col gap-y-2">
                <h5
                  className="title-xl-medium-blue border-b border-slate-200"
                  data-aos="fade-left"
                  data-aos-easing="linear"
                  data-aos-duration="500"
                  data-aos-once="true"
                >
                  Coaching
                </h5>
                <p
                  className="text-p-14"
                  data-aos="fade-left"
                  data-aos-easing="linear"
                  data-aos-delay="300"
                  data-aos-duration="500"
                  data-aos-once="true"
                >
                  Bimbingan dari para ahli untuk membantu organisasi merancang,
                  mengelola, dan mengevaluasi program dengan lebih efektif.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-x-4 bg-white rounded-3xl shadow px-6 py-4">
              <span
                className="w-20 flex flex-col justify-center items-center"
                data-aos="zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="300"
                data-aos-once="true"
              >
                <FaChildren className="text-sky-800 text-4xl w-16 h-16 stroke-1" />
              </span>
              <div className="flex flex-col gap-y-2">
                <h5
                  className="title-xl-medium-blue border-b border-slate-200"
                  data-aos="fade-left"
                  data-aos-easing="linear"
                  data-aos-duration="500"
                  data-aos-once="true"
                >
                  Pendampingan
                </h5>
                <p
                  className="text-p-14"
                  data-aos="fade-left"
                  data-aos-easing="linear"
                  data-aos-delay="300"
                  data-aos-duration="500"
                  data-aos-once="true"
                >
                  Dukungan jangka panjang untuk membantu organisasi mencapai
                  tujuan strategisnya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex sm:flex-row flex-col gap-x-12 w-full sm:px-48 sm:py-16 p-6 dark:bg-slate-950 bg-white">
        <div className="w-1/2">
          <Image
            src="/daftar_program (4).png"
            alt="Cara Mendaftar Implementator Program Human Initiative"
            width={400}
            height={450}
            className="w-[500px] rounded-2xl"
          />
        </div>
        <div className="w-1/2 flex flex-col gap-y-12">
          <h5
            className="title-4xl-extrabold-blue"
            data-aos="fade-left"
            data-aos-easing="linear"
            data-aos-duration="500"
            data-aos-once="true"
          >
            Siapa yang Bisa Mendaftar?
          </h5>
          <p
            className="text-p-16"
            data-aos="fade-left"
            data-aos-easing="linear"
            data-aos-delay="200"
            data-aos-duration="500"
            data-aos-once="true"
          >
            Program ini terbuka untuk NGO, LSM, dan Lembaga Sosial tingkat lokal
            di Indonesia yang
          </p>
          <ul className="flex flex-col gap-y-4 w-full list-disc list-outside pl-5">
            <li className="title-xl-medium-600">
              Memiliki fokus kerja di bidang sosial, lingkungan, kesehatan,
              pendidikan, atau pembangunan ekonomi.
            </li>
            <li className="title-xl-medium-600">
              Terdaftar secara legal dan memiliki rekam jejak program yang
              jelas.
            </li>
            <li className="title-xl-medium-600">
              Berkomitmen untuk berkolaborasi dan meningkatkan kapasitas
              organisasi.
            </li>
          </ul>
        </div>
      </section>
      <section className="flex flex-col gap-y-12 justify-center items-center w-full sm:px-48 sm:py-16 p-6 dark:bg-slate-950 bg-white">
        <div className="w-2/3 flex flex-col gap-y-12">
          <h5
            className="title-4xl-extrabold-black text-center"
            data-aos="fade-left"
            data-aos-easing="linear"
            data-aos-duration="500"
            data-aos-once="true"
          >
            Cara <span className="title-4xl-extrabold-blue">Mendaftar</span>
          </h5>
          <ul className="flex flex-col gap-y-4 w-full list-decimal list-outside pl-5">
            <li className="text-p-16">
              Lengkapi Formulir Pendaftaran Isi formulir yang tersedia di
              halaman ini dengan informasi lengkap mengenai organisasi Anda,
              termasuk proposal program yang ingin didanai.
            </li>
            <li className="text-p-16">
              Unggah Dokumen Pendukung Lampirkan dokumen yang diperlukan,
              seperti profil organisasi, laporan program, dan anggaran.
            </li>
            <li className="text-p-16">
              Seleksi dan Wawancara Tim kami akan meninjau aplikasi Anda dan
              mengundang organisasi yang memenuhi syarat untuk proses wawancara.
            </li>
            <li className="text-p-16">
              Pengumuman dan Kick-off Program Organisasi yang terpilih akan
              diumumkan dan diundang untuk mengikuti kick-off program.
            </li>
          </ul>
        </div>
        <div className="w-1/2"></div>
      </section>
      <section className="flex flex-col gap-y-12 h-[200px] justify-center items-center w-full rounded-xl" style={{backgroundImage: `url("/publicreport (1).png")`}}>
        {/* Overlay dengan background hitam di sebelah kiri saja */}
        <div className="w-full h-full bg-black/[.45] backdrop-blur-xl flex items-center justify-center px-16">
          <Link
            href="/joinourmovement/formimplementatorprogram"
            className="bg-sky-800 text-white text-xl font-base text-center py-4 px-6"
          >
            Daftar Sekarang
          </Link>
        </div>
      </section>
    </main>
  );
};

export default BeProgrameImplementor;
