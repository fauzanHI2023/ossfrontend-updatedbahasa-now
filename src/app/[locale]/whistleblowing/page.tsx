"use client";
import React, { useState, useEffect } from "react";
import BannerCareer from "@/components/ui/banner/BannerCareer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-wrap-new";
import {
  FaChess,
  FaCompassDrafting,
  FaCoins,
  FaCubesStacked,
  FaGitlab,
  FaChildren,
  FaScaleUnbalanced,
} from "react-icons/fa6";
import { motion } from "framer-motion";

const Whistleblowing = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    // Reset the animation state after it's completed
    setTimeout(() => setIsClicked(false), 1000);
  };

  // Variants untuk animasi Framer Motion
  useEffect(() => {
    if (isFormVisible) {
      document.body.style.overflow = "hidden"; // Mencegah scroll pada body
    } else {
      document.body.style.overflow = ""; // Mengembalikan scroll pada body
    }

    // Membersihkan efek ketika komponen unmount atau saat form tidak lagi ditampilkan
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFormVisible]);

  const formVariants = {
    hidden: { opacity: 0, y: "100%" }, // Mulai dari bawah dan tidak terlihat
    visible: { opacity: 1, y: 0 }, // Muncul dengan fade in dan bergerak ke atas
  };
  return (
    <main>
      <BannerCareer
        title="Laporan Pelanggaran Human Initiative"
        description="kebijakan atau sistem yang bertujuan untuk menyediakan saluran yang aman dan rahasia bagi individu untuk mengungkapkan dugaan pelanggaran secara aman (pelapor dilindungi kerahasiaannya)"
        titlepage="Whistleblowing System"
        image="/whistleblowing1.png"
      />
      <section className="flex flex-col gap-y-12 justify-center items-center w-full sm:px-48 sm:py-16 p-6 dark:bg-slate-950 bg-white">
        <div className="w-2/3 flex flex-col gap-y-12">
          <h5
            className="title-4xl-extrabold-black text-center"
            data-aos="fade-left"
            data-aos-easing="linear"
            data-aos-duration="500"
            data-aos-once="true"
          >
            Apa itu{" "}
            <span className="title-4xl-extrabold-blue">
              Whistleblowing System ?
            </span>
          </h5>
          <p className="text-p-16">
            Human Initiative berkomitmen untuk menciptakan lingkungan yang
            sehat, aman dan berintegritas guna mewujudkan Good Organization
            Governance.
          </p>
          <p className="text-p-16">
            <span className="italic">Whistle Blowing System&nbsp;</span>Human
            Initiative adalah kebijakan atau sistem yang bertujuan untuk
            menyediakan saluran yang aman dan rahasia bagi individu untuk
            mengungkapkan dugaan pelanggaran secara aman (pelapor dilindungi
            kerahasiaannya). Melalui kebijakan ini Human Initiative menyediakan
            saluran bagi Anda (publik) untuk dapat melaporkan dugaan terjadinya
            pelanggaran yang dilakukan oleh pihak internal Human Intiative (baik
            pekerja, relawan, tenaga magang, tenaga outsourcing maupun konsultan
            yang bekerja atas nama Human Initiative).
          </p>
        </div>
        <div className="w-1/2"></div>
      </section>
      <section
        className={`relative flex flex-col w-full sm:px-32 sm:py-20 p-6 bg-white dark:bg-slate-900`}
      >
        <div className="flex flex-col sm:pb-20 pb-12">
          <h5
            className="title-2xl-semibold-600"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            Dugaan pelanggaran yang dapat dilaporkan
          </h5>
        </div>
        <div className="flex flex-row gap-x-8">
          <Tabs defaultValue="kodeetik">
            <TabsList className="pb-6 flex flex flex-row justify-start items-center">
              <TabsTrigger
                value="kodeetik"
                data-aos="fade-left"
                data-aos-duration="300"
                className="flex flex-col gap-y-4"
              >
                <FaChess className="text-2xl w-[22px] h-[22px]" />
                Pelanggaran Kode Etik, Pedoman Perilaku Human Initiative dan
                Konflik Kepentingan
              </TabsTrigger>
              <TabsTrigger
                value="fraud"
                data-aos="fade-left"
                data-aos-duration="300"
                className="flex flex-col gap-y-4"
              >
                <FaCompassDrafting className="text-2xl w-[22px] h-[22px]" />
                Kecurangan (Fraud)
              </TabsTrigger>
              <TabsTrigger
                value="penyuapanpemerasan"
                data-aos="fade-left"
                data-aos-duration="300"
                className="flex flex-col gap-y-4"
              >
                <FaCoins className="text-2xl w-[22px] h-[22px]" />
                Penyuapan dan Pemerasan
              </TabsTrigger>
              <TabsTrigger
                value="gratifikasi"
                data-aos="fade-left"
                data-aos-duration="300"
                className="flex flex-col gap-y-4"
              >
                <FaCubesStacked className="text-2xl w-[22px] h-[22px]" />
                Gratifikasi
              </TabsTrigger>
              <TabsTrigger
                value="pelecehankekerasan"
                data-aos="fade-left"
                data-aos-duration="300"
                className="flex flex-col gap-y-4"
              >
                <FaGitlab className="text-2xl w-[22px] h-[22px]" />
                Tindak Pelecehan, Kekerasan dan Eksploitasi Seksual
              </TabsTrigger>
              <TabsTrigger
                value="kekerasananak"
                data-aos="fade-left"
                data-aos-duration="300"
                className="flex flex-col gap-y-4"
              >
                <FaChildren className="text-2xl w-[22px] h-[22px]" />
                Tindak Kekerasan terhadap anak
              </TabsTrigger>
              <TabsTrigger
                value="pelanggaranhukum"
                data-aos="fade-left"
                data-aos-duration="300"
                className="flex flex-col gap-y-4 justify-center"
              >
                <FaScaleUnbalanced className="text-2xl w-[22px] h-[22px]" />
                Pelanggaran Hukum yang Berlaku
              </TabsTrigger>
            </TabsList>
            <TabsContent value="kodeetik">
              <div className="flex flex-row gap-x-8 mt-16">
                <div className="flex flex-col justify-center items-center gap-y-10">
                  <p className="text-p-16">
                    Tindakan yang tidak sesuai dengan sistem nilai atau norma
                    yang dianut oleh setiap pegiat kemanusiaan Human Initiative
                    dalam melaksanakan tugasnya, di dalamnya memuat etika dalam
                    mencapai tujuan, visi, dan misi organisasi serta etika dalam
                    hubungan antara pemangku kepentingan.
                  </p>
                  {/* Tombol Laporkan Pelanggaran */}
                  <button
                    onClick={() => setIsFormVisible(true)}
                    className="px-4 py-2 text-slate-600 bg-slate-200 rounded-md hover:bg-sky-800 hover:text-white focus:outline-none w-max"
                  >
                    Laporkan Pelanggaran
                  </button>
                </div>

                {/* Form yang Menutupi Seluruh Layar */}
                {isFormVisible && (
                  <motion.div
                    className="fixed inset-0 z-50 overflow-y-auto bg-white"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={formVariants}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="min-h-screen p-6">
                      <div className="flex flex-col gap-y-10">
                        <h3 className="text-2xl font-semibold mb-4 text-sky-600">
                          Whistleblowing System Human Initiative
                        </h3>
                        <h3 className="text-lg font-semibold mb-4">
                          FORMULIR WBS UNTUK PELANGGARAN ETIKA, KECURANGAN,
                          PENYUAPAN
                        </h3>
                      </div>
                      <form>
                        {/* Nama Pelapor */}
                        <div className="mb-4">
                          <label
                            htmlFor="reporter-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nama Pelapor
                          </label>
                          <input
                            type="text"
                            id="reporter-name"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Nomor Kontak */}
                        <div className="mb-4">
                          <label
                            htmlFor="contact-number"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nomor Kontak
                          </label>
                          <input
                            type="text"
                            id="contact-number"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Nama yang Dilaporkan */}
                        <div className="mb-4">
                          <label
                            htmlFor="reported-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nama yang Dilaporkan
                          </label>
                          <input
                            type="text"
                            id="reported-name"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Jabatan yang Dilaporkan */}
                        <div className="mb-4">
                          <label
                            htmlFor="reported-position"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Jabatan yang Dilaporkan (jika mengetahui)
                          </label>
                          <input
                            type="text"
                            id="reported-position"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        {/* Pelanggaran yang Dilaporkan */}
                        <div className="mb-4">
                          <label
                            htmlFor="violation-description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Pelanggaran yang Dilaporkan
                          </label>
                          <textarea
                            id="violation-description"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            required
                          ></textarea>
                        </div>

                        {/* Waktu Kejadian */}
                        <div className="mb-4">
                          <label
                            htmlFor="incident-time"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Waktu Kejadian
                          </label>
                          <input
                            type="date"
                            id="incident-time"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Tempat Kejadian */}
                        <div className="mb-4">
                          <label
                            htmlFor="incident-location"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tempat Kejadian (sebutkan nama lokasi, nama jalan,
                            desa/kelurahan, kecamatan, kabupaten/kota)
                          </label>
                          <textarea
                            id="incident-location"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows={2}
                            required
                          ></textarea>
                        </div>

                        {/* Kronologi Permasalahan */}
                        <div className="mb-4">
                          <label
                            htmlFor="incident-chronology"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Kronologi Permasalahan
                          </label>
                          <textarea
                            id="incident-chronology"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            required
                          ></textarea>
                        </div>

                        {/* Apakah Anda mempunyai bukti pendukung */}
                        <div className="mb-4">
                          <label
                            htmlFor="supporting-evidence"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Apakah Anda mempunyai bukti pendukung (misal: foto,
                            video, dokumen, whatsapp, sms, dll)
                          </label>
                          <textarea
                            id="supporting-evidence"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows={3}
                            required
                          ></textarea>
                        </div>

                        {/* Buttons for Submit and Back */}
                        <div className="flex justify-end gap-4">
                          <button
                            type="button"
                            onClick={() => setIsFormVisible(false)}
                            className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
                          >
                            Kirim Laporan
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="fraud">
              <div className="flex flex-row gap-x-8 mt-16">
                <div className="flex flex-col justify-center items-center gap-y-10">
                  <p className="text-p-16">
                    Tindakan penyimpangan atau pembiaran yang sengaja dilakukan
                    untuk mengelabui, menipu, atau memanipulasi para pemangku
                    kepentingan yang terjadi di lingkungan Human Initiatiative
                    (kantor, lokasi program) atau menggunakan sarana Human
                    Initiative, sehingga mengakibatkan organisasi, donatur,
                    penerima manfaat, mitra atau pihak lain menderita kerugian
                    dan/atau pelaku fraud memperoleh keuntungan keuangan baik
                    secara langsung maupun tidak langsung.
                  </p>
                  <p className="text-p-16">
                    Jenis-jenis perbuatan yang tergolong fraud meliputi
                    kecurangan, penipuan, penggelapan aset, pembocoran informasi
                    (khususnya informasi personal dari basis data yang dimiliki
                    organisasi)
                  </p>
                  {/* Tombol Laporkan Pelanggaran */}
                  <button
                    onClick={() => setIsFormVisible(true)}
                    className="px-4 py-2 text-slate-600 bg-slate-200 rounded-md hover:bg-sky-800 hover:text-white focus:outline-none w-max"
                  >
                    Laporkan Pelanggaran
                  </button>
                </div>

                {/* Form yang Menutupi Seluruh Layar */}
                {isFormVisible && (
                  <motion.div
                    className="fixed inset-0 z-50 overflow-y-auto bg-white"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={formVariants}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="min-h-screen p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Form Laporkan Pelanggaran
                      </h3>
                      <form>
                        {/* Nama Pelapor */}
                        <div className="mb-4">
                          <label
                            htmlFor="reporter-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nama Pelapor
                          </label>
                          <input
                            type="text"
                            id="reporter-name"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Nomor Kontak */}
                        <div className="mb-4">
                          <label
                            htmlFor="contact-number"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nomor Kontak
                          </label>
                          <input
                            type="text"
                            id="contact-number"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Nama yang Dilaporkan */}
                        <div className="mb-4">
                          <label
                            htmlFor="reported-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nama yang Dilaporkan
                          </label>
                          <input
                            type="text"
                            id="reported-name"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Jabatan yang Dilaporkan */}
                        <div className="mb-4">
                          <label
                            htmlFor="reported-position"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Jabatan yang Dilaporkan (jika mengetahui)
                          </label>
                          <input
                            type="text"
                            id="reported-position"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        {/* Pelanggaran yang Dilaporkan */}
                        <div className="mb-4">
                          <label
                            htmlFor="violation-description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Pelanggaran yang Dilaporkan
                          </label>
                          <textarea
                            id="violation-description"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            required
                          ></textarea>
                        </div>

                        {/* Waktu Kejadian */}
                        <div className="mb-4">
                          <label
                            htmlFor="incident-time"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Waktu Kejadian
                          </label>
                          <input
                            type="date"
                            id="incident-time"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Tempat Kejadian */}
                        <div className="mb-4">
                          <label
                            htmlFor="incident-location"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tempat Kejadian (sebutkan nama lokasi, nama jalan,
                            desa/kelurahan, kecamatan, kabupaten/kota)
                          </label>
                          <textarea
                            id="incident-location"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows={2}
                            required
                          ></textarea>
                        </div>

                        {/* Kronologi Permasalahan */}
                        <div className="mb-4">
                          <label
                            htmlFor="incident-chronology"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Kronologi Permasalahan
                          </label>
                          <textarea
                            id="incident-chronology"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            required
                          ></textarea>
                        </div>

                        {/* Apakah Anda mempunyai bukti pendukung */}
                        <div className="mb-4">
                          <label
                            htmlFor="supporting-evidence"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Apakah Anda mempunyai bukti pendukung (misal: foto,
                            video, dokumen, whatsapp, sms, dll)
                          </label>
                          <textarea
                            id="supporting-evidence"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows={3}
                            required
                          ></textarea>
                        </div>

                        {/* Buttons for Submit and Back */}
                        <div className="flex justify-end gap-4">
                          <button
                            type="button"
                            onClick={() => setIsFormVisible(false)}
                            className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
                          >
                            Kirim Laporan
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="penyuapanpemerasan">
              <div className="flex flex-row gap-x-8 mt-16">
                <div className="flex flex-col justify-center items-center gap-y-10">
                  <p className="text-p-16">
                    Suap terjadi jika pengguna jasa (mitra, vendor, pelanggan,
                    pemangku kepentingan ataupun pihak di luar Human Initative
                    lainnya) secara aktif menawarkan imbalan kepada petugas
                    layanan (internal Human Initiative) dengan maksud agar
                    urusannya lebih cepat, walaupun hal tersebut melanggar
                    prosedur.
                  </p>
                  <p className="text-p-16">
                    Pemerasan terjadi jika petugas layanan (pihak internal Human
                    Initiative) yang secara aktif menawarkan jasa atau meminta
                    imbalan kepada pengguna jasa untuk mempercepat layanannya,
                    walau melanggar prosedur. Uang pelicin bisa menjadi gabungan
                    dari suap dan pemerasan.
                  </p>
                  {/* Tombol Laporkan Pelanggaran */}
                  <button
                    onClick={() => setIsFormVisible(true)}
                    className="px-4 py-2 text-slate-600 bg-slate-200 rounded-md hover:bg-sky-800 hover:text-white focus:outline-none w-max"
                  >
                    Laporkan Pelanggaran
                  </button>
                </div>

                {/* Form yang Menutupi Seluruh Layar */}
                {isFormVisible && (
                  <motion.div
                    className="fixed inset-0 z-50 overflow-y-auto bg-white"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={formVariants}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="min-h-screen p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Form Laporkan Pelanggaran
                      </h3>
                      <form>
                        {/* Nama Pelapor */}
                        <div className="mb-4">
                          <label
                            htmlFor="reporter-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nama Pelapor
                          </label>
                          <input
                            type="text"
                            id="reporter-name"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Nomor Kontak */}
                        <div className="mb-4">
                          <label
                            htmlFor="contact-number"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nomor Kontak
                          </label>
                          <input
                            type="text"
                            id="contact-number"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Nama yang Dilaporkan */}
                        <div className="mb-4">
                          <label
                            htmlFor="reported-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nama yang Dilaporkan
                          </label>
                          <input
                            type="text"
                            id="reported-name"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Jabatan yang Dilaporkan */}
                        <div className="mb-4">
                          <label
                            htmlFor="reported-position"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Jabatan yang Dilaporkan (jika mengetahui)
                          </label>
                          <input
                            type="text"
                            id="reported-position"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        {/* Pelanggaran yang Dilaporkan */}
                        <div className="mb-4">
                          <label
                            htmlFor="violation-description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Pelanggaran yang Dilaporkan
                          </label>
                          <textarea
                            id="violation-description"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            required
                          ></textarea>
                        </div>

                        {/* Waktu Kejadian */}
                        <div className="mb-4">
                          <label
                            htmlFor="incident-time"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Waktu Kejadian
                          </label>
                          <input
                            type="date"
                            id="incident-time"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Tempat Kejadian */}
                        <div className="mb-4">
                          <label
                            htmlFor="incident-location"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tempat Kejadian (sebutkan nama lokasi, nama jalan,
                            desa/kelurahan, kecamatan, kabupaten/kota)
                          </label>
                          <textarea
                            id="incident-location"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows={2}
                            required
                          ></textarea>
                        </div>

                        {/* Kronologi Permasalahan */}
                        <div className="mb-4">
                          <label
                            htmlFor="incident-chronology"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Kronologi Permasalahan
                          </label>
                          <textarea
                            id="incident-chronology"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            required
                          ></textarea>
                        </div>

                        {/* Apakah Anda mempunyai bukti pendukung */}
                        <div className="mb-4">
                          <label
                            htmlFor="supporting-evidence"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Apakah Anda mempunyai bukti pendukung (misal: foto,
                            video, dokumen, whatsapp, sms, dll)
                          </label>
                          <textarea
                            id="supporting-evidence"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows={3}
                            required
                          ></textarea>
                        </div>

                        {/* Buttons for Submit and Back */}
                        <div className="flex justify-end gap-4">
                          <button
                            type="button"
                            onClick={() => setIsFormVisible(false)}
                            className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
                          >
                            Kirim Laporan
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="gratifikasi">
              <div className="flex flex-row gap-x-8 mt-16">
                <div className="flex flex-col justify-center items-center gap-y-10">
                  <p className="text-p-16">
                    Pemberian dalam arti luas, yakni meliputi pemberian uang,
                    barang, rabat (discount), komisi, pinjaman tanpa bunga,
                    tiket perjalanan, fasilitas penginapan, perjalanan wisata,
                    pengobatan cuma-cuma, dan fasilitas lainnya. Penyuapan dan
                    pemerasan memiliki unsur janji atau bertujuan menginginkan
                    sesuatu dari pemberian tersebut. Namun di balik itu,
                    gratifikasi diberikan untuk menggugah hati petugas layanan,
                    agar di kemudian hari tujuan pengguna jasa dapat dimudahkan.
                    Istilahnya “tanam budi”, yang suatu saat bisa ditagih.
                  </p>
                  {/* Tombol Laporkan Pelanggaran */}
                  <button
                    onClick={() => setIsFormVisible(true)}
                    className="px-4 py-2 text-slate-600 bg-slate-200 rounded-md hover:bg-sky-800 hover:text-white focus:outline-none w-max"
                  >
                    Laporkan Pelanggaran
                  </button>
                </div>

                {/* Form yang Menutupi Seluruh Layar */}
                {isFormVisible && (
                  <motion.div
                    className="fixed inset-0 z-50 overflow-y-auto bg-white"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={formVariants}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="min-h-screen p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Form Laporkan Pelanggaran
                      </h3>
                      <form>
                        {/* Nama Pelapor */}
                        <div className="mb-4">
                          <label
                            htmlFor="reporter-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nama Pelapor
                          </label>
                          <input
                            type="text"
                            id="reporter-name"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Nomor Kontak */}
                        <div className="mb-4">
                          <label
                            htmlFor="contact-number"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nomor Kontak
                          </label>
                          <input
                            type="text"
                            id="contact-number"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Nama yang Dilaporkan */}
                        <div className="mb-4">
                          <label
                            htmlFor="reported-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Unit Kerja Pelapor
                          </label>
                          <input
                            type="text"
                            id="reported-name"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Jabatan yang Dilaporkan */}
                        <div className="mb-4">
                          <label
                            htmlFor="reported-position"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Level Jabatan Pelapor
                          </label>
                          <input
                            type="text"
                            id="reported-position"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        {/* Pelanggaran yang Dilaporkan */}
                        <div className="mb-4">
                          <label
                            htmlFor="violation-description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Pihak (organisasi/perorangan) yang mengirimkan
                            hadiah/keramahtamah
                          </label>
                          <textarea
                            id="violation-description"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            required
                          ></textarea>
                        </div>

                        {/* Waktu Kejadian */}
                        <div className="mb-4">
                          <label
                            htmlFor="incident-time"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Alamat Pihak pemberi hadiah/keramahtamah
                          </label>
                          <input
                            type="text"
                            id="incident-alamat"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Tempat Kejadian */}
                        <div className="mb-4">
                          <label
                            htmlFor="incident-location"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nomor Kontak (jika ada)
                          </label>
                          <textarea
                            id="incident-location"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows={2}
                            required
                          ></textarea>
                        </div>

                        {/* Kronologi Permasalahan */}
                        <div className="mb-4">
                          <label
                            htmlFor="incident-chronology"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Hubungan pemberi hadiah/keramahtamah dengan Human
                            Initiative
                          </label>
                          <textarea
                            id="incident-chronology"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            required
                          ></textarea>
                        </div>

                        {/* Waktu Kejadian */}
                        <div className="mb-4">
                          <label
                            htmlFor="incident-time"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tanggal hadiah/keramahtamah diterima Pelapor
                          </label>
                          <input
                            type="date"
                            id="incident-time"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Apakah Anda mempunyai bukti pendukung */}
                        <div className="mb-4">
                          <label
                            htmlFor="supporting-evidence"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Jenis hadiah/keramahtamah
                          </label>
                          <textarea
                            id="supporting-evidence"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows={3}
                            required
                          ></textarea>
                        </div>

                        {/* Waktu Kejadian */}
                        <div className="mb-4">
                          <label
                            htmlFor="incident-time"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Perkiraan/taksiran harga hadiah/keramahtamah (dalam
                            Rupiah)*
                          </label>
                          <input
                            type="text"
                            id="incident-alamat"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Waktu Kejadian */}
                        <div className="mb-4">
                          <label
                            htmlFor="incident-time"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Apakah Anda mempunyai bukti pendukung (misal: foto,
                            video, dokumen, whatsapp, sms dll)
                          </label>
                          <input
                            type="text"
                            id="incident-alamat"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        {/* Buttons for Submit and Back */}
                        <div className="flex justify-end gap-4">
                          <button
                            type="button"
                            onClick={() => setIsFormVisible(false)}
                            className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
                          >
                            Kirim Laporan
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="pelecehankekerasan">
              <div className="flex flex-row gap-x-8 mt-16">
                <p className="text-p-16">
                  Kekerasan seksual yaitu segala tindakan atau ancaman bernuansa
                  seksual atau tindakan yang tidak diinginkan dan dapat
                  dilakukan melalui kontak fisik maupun nonfisik dengan menyasar
                  pada seksualitas seseorang, dilakukan dengan paksaan atau
                  dalam posisi yang tidak setara atau penyalahgunaan kekuasaan
                  serta wewenang
                </p>
              </div>
            </TabsContent>
            <TabsContent value="kekerasananak">
              <div className="flex flex-row gap-x-8 mt-16">
                <p className="text-p-16">
                  Hal ini meliputi: (1) memaksa, meyetujui dan/ atau membiarkan
                  kekerasan dan perkawinan anak di bawah 18 tahun; (2)
                  berhubungan seksual dengan anak-anak; (3) pelecehan seksual
                  secara verbal dan nonverbal; (4) menukar uang, barang, layanan
                  dengan seks dan/ atau mempekerjakan pekerja seks anak; (5)
                  Memegang, membelai, mencium, memeluk dan/ atau menyentuh anak
                  secara tidak pantas atau tanpa seizin walinya; (6) menggunakan
                  bahas yang kasar dan/ atau tidak pantas yang merencahkan
                  martabat anak; (7) berduaan dengan seorang anak; (8) terlibat
                  dan/ atau berpartisipasi dalam perlakuan illegal, tidak aman,
                  kasar termasuk praktik ritual berbahaya; (9)mempekerjakan anak
                  dalam segala bentuk; (10) memukul dan/ atau menggunakan
                  hukuman fisik; (11) mengajak/ membawa anak sendirian tanpa
                  persetujuan walinya; (12) membawa anak ke wilayah program
                  untuk menginap tanpa izin walinya; (13) menyalahgunakan data
                  pribadi anak-anak penerima manfaat; (14) berkomunikasi secara
                  tidak pantas atau tidak sesuai norma dengan anak (baik secara
                  daring, menggunakan media sosial, luring); (15) bersikap diam,
                  menutupi atau membiarkan terjadinya insiden/ pelanggaran atau
                  adanya tindak kekerasan terhadap anak yang diketahui
                </p>
              </div>
            </TabsContent>
            <TabsContent value="pelanggaranhukum">
              <div className="flex flex-row gap-x-8 mt-16">
                <p className="text-p-16">
                  Setiap bentuk pelanggaran terhadap hukum pidana dan perdata
                  yang berlaku di Indonesia ataupun negara wilayah operasi Human
                  Initiative.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default Whistleblowing;
