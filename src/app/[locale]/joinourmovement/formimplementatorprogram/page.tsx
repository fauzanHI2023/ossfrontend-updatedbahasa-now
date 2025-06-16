"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import PopupNotif from "@/components/ui/utility/PopupNotif";

const RegistrationForm: React.FC = () => {
  const [notifMessage, setNotifMessage] = useState("");
  const [formData, setFormData] = useState({
    negara: "",
    namaResmi: "",
    namaKerja: "",
    namaInggris: "",
    namaArab: "",
    alamatResmi: "",
    pejabatPertama: "",
    nomorIdentitas: "",
    telepon: "",
    email: "",
    websiteResmi: "",
    sosialMedia: "",
    tanggalPendirian: "",
    tanggalRegistrasi: "",
    tanggalKadaluarsa: "",
    maksudTujuan: "",
    programUtama: "",
    bantuanSosial: "",
    pembuatKeputusan: "",
    implementatorKebijakan: "",
    boardOfDirector: "",
    sistemPengelolaanProyek: "",
    yayasanKerjasama: "",
    lembagaAnggota: "",
    sumberPendapatan: "",
    penyaluranDana2023: "",
    penyaluranDana2022: "",
    penyaluranDana2021: "",
    penyaluranOperasional2023: "",
    penyaluranOperasional2022: "",
    penyaluranOperasional2021: "",
    gajiKaryawan: "",
    sewaKantor: "",
    biayaATK: "",
    biayaPeralatanKantor: "",
    biayaKerumahtanggaan: "",
    biayaMarketing: "",
    skemaPersetujuanDana: "",
    lampiranSkema: "",
    dokumentasiPenyaluran: "",
    deklarasi: "",
  });

  // Define the type of keys for isAccordionOpen
  type AccordionKeys =
    | "informasiResmi"
    | "informasiKomunikasi"
    | "informasiRegistrasi"
    | "informasiBadan"
    | "latarBelakang"
    | "informasiPengelolaanProyek"
    | "pendapatanLembaga"
    | "penyaluranDana"
    | "lampiran";

  const [isAccordionOpen, setIsAccordionOpen] = useState<
    Record<AccordionKeys, boolean>
  >({
    informasiResmi: false,
    informasiKomunikasi: false,
    informasiRegistrasi: false,
    informasiBadan: false,
    latarBelakang: false,
    informasiPengelolaanProyek: false,
    pendapatanLembaga: false,
    penyaluranDana: false,
    lampiran: false,
  });

  const [mounted, setMounted] = useState(false); // To handle client-only rendering

  useEffect(() => {
    setMounted(true); // Ensures the component is mounted on the client
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!mounted) {
    return null; // Prevents rendering until the component is mounted
  }

  const handleSubmit:any = () => {
    setNotifMessage("Data Berhasil Disimpan.");
  }

  // Ensure section is of type AccordionKeys
  const toggleAccordion = (section: AccordionKeys) => {
    setIsAccordionOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <main className="flex flex-col jsutify-center items-center sm:mt-[100px] mt-[60px] relative">
      <section
        className="w-full relative flex flex-row sm:pt-0 pt-0 sm:px-6 px-6 dark:bg-slate-950 bg-white sm:h-[600px] relative z-20 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url('/implementatorprogrambe.png')` }}
      >
        <div className="flex flex-col justify-center items-center py-16 px-8 w-full">
          <motion.h4
            initial={{ opacity: 0 }} // Start from left with opacity 0
            animate={{ opacity: 1 }} // Animate to full opacity and original position
            transition={{ duration: 2 }} // Animation duration of 3 seconds
            className="text-white sm:text-5xl text-2xl font-bold"
          >
            Form Implementator Program
          </motion.h4>
        </div>
      </section>
      <form action={handleSubmit} className="w-1/2 p-8 bg-white shadow-md rounded-md space-y-4 my-16">
        {/* Informasi Resmi Lembaga Accordion */}
        <div className="rounded-md">
          <button
            type="button"
            className="w-full text-left p-4 bg-slate-50 dark:bg-slate-800 text-sky-700 dark:text-white font-medium rounded-xl shadow-md"
            onClick={() => toggleAccordion("informasiResmi")}
          >
            Informasi Resmi Lembaga
          </button>
          {isAccordionOpen.informasiResmi && (
            <div className="p-4 space-y-4 bg-slate-100 text-slate-950">
              {[
                { label: "Negara", name: "negara", type: "text" },
                { label: "Nama Resmi", name: "namaResmi", type: "text" },
                { label: "Nama Kerja/Brand", name: "namaKerja", type: "text" },
                {
                  label: "Nama Dalam Bahasa Inggris",
                  name: "namaInggris",
                  type: "text",
                },
                {
                  label: "Nama Dalam Bahasa Arab",
                  name: "namaArab",
                  type: "text",
                },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name} className="font-medium">
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    className="border border-solid border-slate-300 p-2 rounded-md transition ease-in-out duration-300 focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-sky-600 dark:focus-visible:ring-sky-500"
                    required
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Informasi Komunikasi Lembaga Accordion */}
        <div className="rounded-md">
          <button
            type="button"
            className="w-full text-left p-4 bg-slate-50 dark:bg-slate-800 text-sky-700 dark:text-white font-medium rounded-xl shadow-md"
            onClick={() => toggleAccordion("informasiKomunikasi")}
          >
            Informasi Komunikasi Lembaga
          </button>
          {isAccordionOpen.informasiKomunikasi && (
            <div className="p-4 space-y-4 bg-slate-100 text-slate-950">
              {[
                { label: "Alamat Resmi", name: "alamatResmi", type: "text" },
                {
                  label: "Pejabat Pertama Dalam Kontrak",
                  name: "pejabatPertama",
                  type: "text",
                },
                {
                  label: "Nomor Identitas",
                  name: "nomorIdentitas",
                  type: "text",
                },
                { label: "Telepon", name: "telepon", type: "text" },
                { label: "Email", name: "email", type: "email" },
                {
                  label: "Website Resmi Lembaga",
                  name: "websiteResmi",
                  type: "text",
                },
                {
                  label: "Sosial Media Lembaga",
                  name: "sosialMedia",
                  type: "text",
                },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name} className="font-medium">
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    className="border border-solid border-slate-300 p-2 rounded-md transition ease-in-out duration-300 focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-sky-600 dark:focus-visible:ring-sky-500"
                    required
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Informasi Registrasi Accordion */}
        <div className="rounded-md">
          <button
            type="button"
            className="w-full text-left p-4 bg-slate-50 dark:bg-slate-800 text-sky-700 dark:text-white font-medium rounded-xl shadow-md"
            onClick={() => toggleAccordion("informasiRegistrasi")}
          >
            Informasi Registrasi
          </button>
          {isAccordionOpen.informasiRegistrasi && (
            <div className="p-4 space-y-4 bg-slate-100 text-slate-950">
              {[
                {
                  label: "Tanggal Pendirian Lembaga",
                  name: "tanggalPendirian",
                  type: "date",
                },
                {
                  label: "Tanggal Registrasi",
                  name: "tanggalRegistrasi",
                  type: "date",
                },
                {
                  label: "Tanggal Kadaluarsa",
                  name: "tanggalKadaluarsa",
                  type: "date",
                },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name} className="font-medium">
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    className="border border-solid border-slate-300 p-2 rounded-md transition ease-in-out duration-300 focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-sky-600 dark:focus-visible:ring-sky-500"
                    required
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Latar Belakang Pendirian Lembaga Accordion */}
        <div className="rounded-md">
          <button
            type="button"
            className="w-full text-left p-4 bg-slate-50 dark:bg-slate-800 text-sky-700 dark:text-white font-medium rounded-xl shadow-md"
            onClick={() => toggleAccordion("latarBelakang")}
          >
            Latar Belakang Pendirian Lembaga
          </button>
          {isAccordionOpen.latarBelakang && (
            <div className="p-4 space-y-4 bg-slate-100 text-slate-950">
              {[
                {
                  label: "Maksud dan Tujuan Pendirian Lembaga",
                  name: "maksudTujuan",
                  type: "text",
                },
                {
                  label: "Program/Kegiatan Utama",
                  name: "programUtama",
                  type: "text",
                },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name} className="font-medium">
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    className="border border-solid border-slate-300 p-2 rounded-md transition ease-in-out duration-300 focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-sky-600 dark:focus-visible:ring-sky-500"
                    required
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Latar Belakang Pendirian Lembaga Accordion */}
        <div className="rounded-md">
          <button
            type="button"
            className="w-full text-left p-4 bg-slate-50 dark:bg-slate-800 text-sky-700 dark:text-white font-medium rounded-xl shadow-md"
            onClick={() => toggleAccordion("latarBelakang")}
          >
            Latar Belakang Pendirian Lembaga
          </button>
          {isAccordionOpen.latarBelakang && (
            <div className="p-4 space-y-4 bg-slate-100 text-slate-950">
              {[
                {
                  label: "Maksud dan Tujuan Pendirian Lembaga",
                  name: "maksudTujuan",
                  type: "text",
                },
                {
                  label: "Program/Kegiatan Utama",
                  name: "programUtama",
                  type: "text",
                },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name} className="font-medium">
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    className="border border-solid border-slate-300 p-2 rounded-md transition ease-in-out duration-300 focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-sky-600 dark:focus-visible:ring-sky-500"
                    required
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Informasi Pengelolaan Proyek Accordion */}
        <div className="rounded-md">
          <button
            type="button"
            className="w-full text-left p-4 bg-slate-50 dark:bg-slate-800 text-sky-700 dark:text-white font-medium rounded-xl shadow-md"
            onClick={() => toggleAccordion("informasiPengelolaanProyek")}
          >
            Informasi Pengelolaan Proyek
          </button>
          {isAccordionOpen.informasiPengelolaanProyek && (
            <div className="p-4 space-y-4 bg-slate-100 text-slate-950">
              {[
                {
                  label: "Sistem Pengelolaan Proyek",
                  name: "sistemPengelolaanProyek",
                  type: "text",
                },
                {
                  label: "Yayasan Kerjasama",
                  name: "yayasanKerjasama",
                  type: "text",
                },
                {
                  label: "Lembaga Anggota",
                  name: "lembagaAnggota",
                  type: "text",
                },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name} className="font-medium">
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    className="border border-solid border-slate-300 p-2 rounded-md transition ease-in-out duration-300 focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-sky-600 dark:focus-visible:ring-sky-500"
                    required
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pendapatan Lembaga Accordion */}
        <div className="rounded-md">
          <button
            type="button"
            className="w-full text-left p-4 bg-slate-50 dark:bg-slate-800 text-sky-700 dark:text-white font-medium rounded-xl shadow-md"
            onClick={() => toggleAccordion("pendapatanLembaga")}
          >
            Pendapatan Lembaga
          </button>
          {isAccordionOpen.pendapatanLembaga && (
            <div className="p-4 space-y-4 bg-slate-100 text-slate-950">
              {[
                {
                  label: "Sumber Pendapatan",
                  name: "sumberPendapatan",
                  type: "text",
                },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name} className="font-medium">
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    className="border border-solid border-slate-300 p-2 rounded-md transition ease-in-out duration-300 focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-sky-600 dark:focus-visible:ring-sky-500"
                    required
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Penyaluran Dana Accordion */}
        <div className="rounded-md">
          <button
            type="button"
            className="w-full text-left p-4 bg-slate-50 dark:bg-slate-800 text-sky-700 dark:text-white font-medium rounded-xl shadow-md"
            onClick={() => toggleAccordion("penyaluranDana")}
          >
            Penyaluran Dana
          </button>
          {isAccordionOpen.penyaluranDana && (
            <div className="p-4 space-y-4 bg-slate-100 text-slate-950">
              {[
                {
                  label: "Penyaluran Dana Program Tahun 2023 (IDR)",
                  name: "penyaluranDana2023",
                  type: "text",
                },
                {
                  label: "Penyaluran Dana Program Tahun 2022 (IDR)",
                  name: "penyaluranDana2022",
                  type: "text",
                },
                {
                  label: "Penyaluran Dana Program Tahun 2021 (IDR)",
                  name: "penyaluranDana2021",
                  type: "text",
                },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name} className="font-medium">
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    className="border border-solid border-slate-300 p-2 rounded-md transition ease-in-out duration-300 focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-sky-600 dark:focus-visible:ring-sky-500"
                    required
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lampiran Accordion */}
        <div className="rounded-md">
          <button
            type="button"
            className="w-full text-left p-4 bg-slate-50 dark:bg-slate-800 text-sky-700 dark:text-white font-medium rounded-xl shadow-md"
            onClick={() => toggleAccordion("lampiran")}
          >
            Lampiran
          </button>
          {isAccordionOpen.lampiran && (
            <div className="p-4 space-y-4 bg-slate-100 text-slate-950">
              {[
                {
                  label: "Lampirkan AD/ART Lembaga",
                  name: "lampiranADART",
                  type: "file",
                },
                {
                  label: "Lampirkan Daftar Dewan Pembina",
                  name: "lampiranDewanPembina",
                  type: "file",
                },
                {
                  label: "Lampirkan Daftar Direksi/Pengurus",
                  name: "lampiranDireksi",
                  type: "file",
                },
                {
                  label: "Lampirkan Identitas General Manager/PIC Program",
                  name: "lampiranPIC",
                  type: "file",
                },
                {
                  label: "Laporan Keuangan Audit",
                  name: "laporanKeuanganAudit",
                  type: "file",
                },
                {
                  label: "Laporan Tahunan Lembaga",
                  name: "laporanTahunan",
                  type: "file",
                },
                {
                  label: "Nomor Rekening Bank",
                  name: "nomorRekeningBank",
                  type: "file",
                },
                {
                  label: "Kebijakan Keuangan Organisasi",
                  name: "kebijakanKeuangan",
                  type: "file",
                },
                { label: "Penghargaan", name: "penghargaan", type: "file" },
                {
                  label: "Dokumen Perijinan Penggalangan Dana (PUB)",
                  name: "dokumenPerijinanPUB",
                  type: "file",
                },
                {
                  label: "Informasi Keanggotaan",
                  name: "informasiKeanggotaan",
                  type: "file",
                },
                {
                  label: "Surat Keterangan Pembebasan Pajak (Non-PKP)",
                  name: "suratPembebasanPajak",
                  type: "file",
                },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name} className="font-medium">
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    className="border border-solid border-slate-300 p-2 rounded-md transition ease-in-out duration-300 focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-sky-600 dark:focus-visible:ring-sky-500"
                    required
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Repeat similar structure for the rest of the accordions based on your requirements */}

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-sky-700 text-white dark:bg-sky-500 rounded-md"
        >
          Submit
        </button>
      </form>
      <PopupNotif
        message={notifMessage}
        duration={3000}
        onClose={() => setNotifMessage("")}
      />
    </main>
  );
};

export default RegistrationForm;
