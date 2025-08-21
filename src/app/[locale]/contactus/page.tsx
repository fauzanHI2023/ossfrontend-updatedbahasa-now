'use client';
import React, {useState} from 'react';
import Image from 'next/image';
import {motion} from 'framer-motion';
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import {postContact, PostContact} from '@/lib/contactus/auth-post-contact';

const Page: React.FC = () => {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<PostContact>({
    nama: '',
    email: '',
    feature: '',
    desciptions: ''
  });

  // 🔹 pakai mutation
  const {mutate, data, isPending, isError, error} = useMutation({
    mutationFn: (newContact: PostContact) => postContact(newContact),
    onSuccess: () => {
      // kalau kamu ada query GET contacts, bisa di-refresh
      queryClient.invalidateQueries({queryKey: ['contacts']});
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };
  return (
    <main className="flex flex-col sm:py-16 py-6 sm:pt-28 pt-24 dark:bg-slate-950 bg-white">
      <section
        className="w-full relative flex flex-row sm:pt-0 pt-0 sm:px-6 px-6 dark:bg-slate-950 bg-white sm:h-[600px] relative z-20 bg-cover bg-no-repeat bg-center"
        style={{backgroundImage: `url('/Desktop - 33 (1).png')`}}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="flex flex-col justify-center items-center py-16 px-8 w-full">
          <motion.h4
            initial={{opacity: 0}} // Start from left with opacity 0
            animate={{opacity: 1}} // Animate to full opacity and original position
            transition={{duration: 2}} // Animation duration of 3 seconds
            className="text-white sm:text-5xl text-2xl font-bold z-[50] relative"
          >
            Contact Us
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
            <div className="flex flex-col gap-y-4">
              <h5 className="text-4xl text-slate-950">Contact Us</h5>
              <p className="text-xs text-slate-600">
                Fill in the form, or, if you prefer,{' '}
                <span className="text-sky-500">send us an email</span>
              </p>
              <form action="" className="pt-12 flex flex-col gap-y-12">
                <div>
                  <input
                    type="text"
                    placeholder="Siapa nama kamu?"
                    className="focus:outline-none text-4xl placeholder-slate-400 font-extralight border-b border-slate-200 px-4 pt-2 pb-2"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Masukkan email kamu?"
                    className="focus:outline-none text-4xl placeholder-slate-400 font-extralight border-b border-slate-200 px-4 pt-2 pb-2"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Ceritakan kepada kami tentang proyek Anda?"
                    className="focus:outline-none text-4xl placeholder-slate-400 font-extralight border-b border-slate-200 px-4 pt-2 pb-2"
                  />
                </div>
              </form>
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
                Pengguna situs yang merupakan pendukung program baik dalam
                bentuk donasi, penyebaran informasi, dan berbagai bentuk
                dukungan lainnya berkewajiban untuk:
              </p>
              <ul className="list-decimal">
                <li className="text-p-14">
                  Mencermati segala informasi mengenai program yang dimuat di
                  dalam situs sebelum memberi dukungan.
                </li>
                <li className="text-p-14">
                  Calon donatur dapat memanfaatkan kontak yang tertera dalam
                  situs untuk mengetahui detail program baik saat penggalangan
                  dana maupun saat implementasi program.
                </li>
                <li className="text-p-14">
                  Mencantumkan nama sebenarnya & alamat email aktif saat
                  berdonasi, ini untuk memudahkan pengguna situs dalam
                  mendapatkan laporan implementasi program dari lembaga.
                </li>
                <li className="text-p-14">
                  Tidak menggunakan uang yang berasal dari sumber yang tidak sah
                  secara hukum dalam mendonasikan uangnya untuk mendukung
                  program-program yang tertera di dalam situs.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
