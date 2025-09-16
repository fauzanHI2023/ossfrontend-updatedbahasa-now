'use client';
import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {postContact, PostContact} from '@/lib/contactus/auth-post-contact';
import {FaWhatsapp} from 'react-icons/fa';
import {MdOutlineMail} from 'react-icons/md';
import Swal from 'sweetalert2';

const Page: React.FC = () => {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<PostContact>({
    nama: '',
    email: '',
    feature: '',
    descriptions: ''
  });

  // 🔹 pakai mutation
  const {mutate, isPending} = useMutation({
    mutationFn: (newContact: PostContact) => postContact(newContact),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['contacts']});
      setForm({nama: '', email: '', feature: '', descriptions: ''}); // reset form
      Swal.fire({
        icon: 'success',
        title: 'Submit Successfull!',
        timer: 2000,
        showConfirmButton: false
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));
  };

  return (
    <main className="flex flex-col dark:bg-slate-950 bg-white">
      <section className="w-full h-screen relative flex flex-col justify-center items-center sm:pt-0 pt-0 px-0 dark:bg-slate-950 bg-white h-full">
        <div className="flex sm:flex-row flex-col gap-y- sm:gap-x-10 my-0 w-full h-screen">
          {/* Kontak Info */}
          <div className="w-1/3 flex flex-col justify-center items-start gap-y-8 px-16 bg-gradient-to-b to-[#1E99FD] from-sky-300 rounded-tr-3xl rounded-br-3xl">
            <h3 className="text-white font-semibold text-2xl">
              Human Initiative Contact
            </h3>
            <h6 className="text-white font-sm text-sm">
              Kebaikan bertumbuh ketika kita bergerak bersama
            </h6>
            <ul className="flex flex-col gap-y-4 w-full">
              <li className="flex flex-row justify-start items-center gap-x-2 text-slate-800 bg-sky-50 px-4 py-3 rounded-xl w-full">
                <FaWhatsapp />
                <p>+62 812 8080 4561</p>
              </li>
              <li className="flex flex-row justify-start items-center gap-x-2 text-slate-800 bg-sky-100 px-4 py-3 rounded-xl w-full">
                <MdOutlineMail />
                <p>admin@human-initiative.org</p>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-y-10 w-2/3 py-16 pl-6 pr-14">
            <div className="flex flex-col gap-y-4 bg-[#F3F9FF] rounded-3xl p-12">
              <h5 className="text-4xl font-bold text-slate-950">Contact Us</h5>
              <p className="text-xs text-slate-600">
                Fill in the form, or, if you prefer,{' '}
                <span className="text-sky-500">send us an email</span>
              </p>

              <form
                onSubmit={handleSubmit}
                className="pt-12 flex flex-wrap gap-y-8"
              >
                <div className="w-1/2 pr-4">
                  <label htmlFor="nama">Full Name</label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="Masukkan nama kamu."
                    className="w-full focus:outline-none text-base placeholder-slate-400 font-extralight border border-slate-200 rounded-xl px-4 pt-2 pb-2"
                  />
                </div>

                <div className="w-1/2 pl-4">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Masukkan email kamu."
                    className="w-full focus:outline-none text-base placeholder-slate-400 font-extralight border border-slate-200 rounded-xl px-4 pt-2 pb-2"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="feature">Feature</label>
                  <select
                    id="feature"
                    name="feature"
                    value={form.feature}
                    onChange={handleChange}
                    className="w-full focus:outline-none text-base font-extralight border border-slate-200 rounded-xl px-4 py-2"
                  >
                    <option value="" disabled>
                      Pilih salah satu
                    </option>
                    <option value="Tanya CSR">Tanya CSR</option>
                    <option value="Tanya Donasi">Tanya Donasi</option>
                    <option value="Tanya tentang Program Kami">
                      Tanya tentang Program Kami
                    </option>
                  </select>
                </div>

                <div className="w-full">
                  <label htmlFor="descriptions">Descriptions</label>
                  <textarea
                    id="descriptions"
                    name="descriptions"
                    rows={5}
                    value={form.descriptions}
                    onChange={handleChange}
                    placeholder="Ceritakan kepada kami tentang proyek Anda?"
                    className="w-full focus:outline-none text-base placeholder-slate-400 font-extralight border border-slate-200 rounded-xl px-4 pt-2 pb-2"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-slate-700 text-white px-2 py-4 rounded-xl w-full disabled:opacity-50"
                >
                  {isPending ? (
                    <motion.div
                      className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                    />
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
