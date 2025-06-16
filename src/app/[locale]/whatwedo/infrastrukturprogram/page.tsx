'use client';
import React from 'react';
import Link from 'next/link';
import Banner from '@/components/ui/banner/Banner';
import {Baby, University, Backpack, MoveRight} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs-program';
import Image from 'next/image';
import {MdOutlineMosque} from 'react-icons/md';
import {FaHandsWash} from 'react-icons/fa';
import {LuSchool} from 'react-icons/lu';
import {GiSuspensionBridge} from 'react-icons/gi';
import {fetchNewsByHashtagProgram} from '@/lib/publication/auth-news';
import {useQuery} from '@tanstack/react-query';
import {useTranslations} from 'next-intl';

const InfrastructureProgram = () => {
  const t = useTranslations();
  const {data, isLoading, isError} = useQuery({
    queryKey: ['news', 'infrastructure'],
    queryFn: () => fetchNewsByHashtagProgram('infrastructure')
  });

  const posts = data?.data ?? [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const stripHtml = (html: string) => {
    if (typeof window !== 'undefined') {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    }
    return html;
  };

  const truncateAndStripHtml = (html: string, wordLimit: number) => {
    const plainText = stripHtml(html);
    const words = plainText.split(' ');
    return (
      words.slice(0, wordLimit).join(' ') +
      (words.length > wordLimit ? '...' : '')
    );
  };

  return (
    <main className="flex flex-col sm:py-16 py-6 sm:pt-28 pt-24 dark:bg-slate-950 bg-white">
      <Banner
        title={t('bannerInitiativeInfrastructure.title')}
        description={t('bannerInitiativeInfrastructure.desc')}
        image="/DSC_10301.JPG"
      />
      <section className="relative overflow-hidden flex flex-col justify-center items-center sm:gap-y-10 gap-y-10 sm:py-[150px] py-10 sm:px-24 px-6 dark:bg-slate-950 bg-white">
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none" />
        <div className="flex flex-row justify-center items-center gap-x-10 w-full relative z-20">
          <h5 className="text-slate-700 w-full dark:text-white font-semibold text-5xl">
            Infrastruktur <span className="text-sky-600">Program</span>
          </h5>
          <p className="text-slate-600 dark:text-white font-normal text-base">
            Initiative for Infrastructure merupakan program Human Initiative
            dalam upaya mewujudkan kesejahteraan melalui peningkatan kualitas
            infrastruktur masyarakat di dalam dan luar negeri. Pelaksanaan
            dilakukan melalui program reguler atau program pemulihan
            pascabencana(recovery).
          </p>
        </div>
        {/* <div className="flex flex-row gap-x-16 justify-center items-center w-2/3">
          <div className="flex flex-col justify-center items-center gap-y-4 w-1/3">
            <span className="bg-green-200 rounded-[32px] w-16 h-16 text-center flex justify-center items-center">
              <Baby className="text-green-500 text-xl w-8 h-8" />
            </span>
            <h5>Perlindungan Anak</h5>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-4 w-1/3">
            <span className="bg-sky-200 rounded-[32px] w-16 h-16 text-center flex justify-center items-center">
              <University className="text-sky-500 text-xl w-8 h-8" />
            </span>
            <h5>Pendidikan Anak Yatim dan Duafa</h5>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-4 w-1/3">
            <span className="bg-pink-200 rounded-[32px] w-16 h-16 text-center flex justify-center items-center">
              <Backpack className="text-pink-500 text-xl w-8 h-8" />
            </span>
            <h5>Pemenuhan Kebutuhan Dasar</h5>
          </div>
        </div> */}
        <Tabs defaultValue="masjid" className="w-full">
          <TabsList className="flex flex-wrap justify-start items-center gap-x-2 relative z-20 h-full ">
            <TabsTrigger
              value="masjid"
              className="w-max-content flex flex-row gap-x-2"
            >
              <Image
                src="/Asset 8@16x.png"
                width={20}
                height={20}
                alt="Human Initiative Disaster"
                className="w-[20px] rounded-xl"
              />{' '}
              Pembangunan & Renovasi Masjid
            </TabsTrigger>
            <TabsTrigger
              value="sekolah"
              className="w-max-content flex flex-row gap-x-2"
            >
              <Image
                src="/Asset 6@16x.png"
                width={20}
                height={20}
                alt="Human Initiative Disaster"
                className="w-[20px] rounded-xl"
              />{' '}
              Pembangunan Sarana Pendidikan
            </TabsTrigger>
            <TabsTrigger
              value="wash"
              className="w-max-content flex flex-row gap-x-2"
            >
              <Image
                src="/Asset 12@16x.png"
                width={20}
                height={20}
                alt="Human Initiative Disaster"
                className="w-[20px] rounded-xl"
              />{' '}
              Pembangunan Sarana Air Bersih
            </TabsTrigger>
            <TabsTrigger
              value="kesehatan"
              className="w-max-content flex flex-row gap-x-2"
            >
              <Image
                src="/Asset 11@16x.png"
                width={20}
                height={20}
                alt="Human Initiative Disaster"
                className="w-[20px] rounded-xl"
              />{' '}
              Penyediaan Sarana Kesehatan
            </TabsTrigger>
            <TabsTrigger
              value="hunian"
              className="w-max-content flex flex-row gap-x-2 mt-4"
            >
              <Image
                src="/Asset 10@16x.png"
                width={20}
                height={20}
                alt="Human Initiative Disaster"
                className="w-[20px] rounded-xl"
              />{' '}
              Pembangunan Hunian
            </TabsTrigger>
            <TabsTrigger
              value="jembatan"
              className="w-max-content flex flex-row gap-x-2 mt-4"
            >
              <Image
                src="/Asset 5@16x.png"
                width={20}
                height={20}
                alt="Human Initiative Disaster"
                className="w-[20px] rounded-xl"
              />{' '}
              Pembangunan Sarana Umum
            </TabsTrigger>
            <TabsTrigger
              value="saranaalat"
              className="w-max-content flex flex-row gap-x-2 mt-4"
            >
              <Image
                src="/Asset 9@16x.png"
                width={20}
                height={20}
                alt="Human Initiative Disaster"
                className="w-[20px] rounded-xl"
              />{' '}
              Peralatan Sarana Umum
            </TabsTrigger>
          </TabsList>
          <TabsContent value="masjid">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10">
              <p className="text-sm font-normal text-indigo-950 relative z-20">
                Masjid bukan hanya sebagai tempat ibadah, tetapi juga sebagai
                pusat kegiatan sosial dan pendidikan bagi masyarakat lokal.
                Program ini melibatkan sumber daya lokal, termasuk tenaga kerja
                setempat, tukang batu, tukang kayu, dan pengrajin lokal untuk
                membangun masjid. Dalam hal ini, pembangunan masjid dapat
                menjadi pusat komunitas yang mendukung pendidikan agama,
                pelatihan keterampilan, serta memberikan tempat bagi warga untuk
                beribadah dan berkumpul.
              </p>
              <p className="text-sm font-normal text-indigo-950 relative z-20">
                Selama pelaksanaan program ini, penting untuk memastikan
                partisipasi aktif dan inklusi masyarakat lokal dalam perencanaan
                dan pengambilan keputusan. Program ini juga harus memastikan
                keberlanjutan jangka panjang melalui pelatihan dan pengembangan
                kapasitas lokal. Selain itu, pemerintah dan mitra non-pemerintah
                dapat berkolaborasi untuk mengidentifikasi sumber daya, dana,
                dan teknologi yang diperlukan untuk menjalankan program ini
                dengan sukses. Program pembangunan infrastruktur yang berfokus
                pada pemberdayaan sumber daya lokal dapat berdampak positif pada
                perkembangan sosial, ekonomi, dan kualitas hidup masyarakat di
                Indonesia.
              </p>
              <Image
                src="/PROGRES-100-4-1-2048x1152 (2).jpg"
                width={1000}
                height={700}
                alt="Human Initiative"
                className="w-full h-full relative z-20 rounded"
              />
            </div>
          </TabsContent>
          <TabsContent value="wash">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10">
              <div className="flex flex-col gap-y-6">
                <Image
                  src="/Asset 12@16x.png"
                  width={100}
                  height={100}
                  alt="Human Initiative Disaster"
                  className="w-[100px] rounded-xl"
                />
                <div className="flex flex-row gap-x-5 justify-between items-center">
                  <p className="w-1/5 flex flex-row gap-x-3 text-3xl font-bold text-sky-600 dark:text-slate-300 relative z-20">
                    Pembangunan Sarana Air Bersih
                  </p>
                  <p className="w-4/5 text-sm font-normal text-indigo-950 dark:text-slate-300 relative z-20">
                    Akses ke air bersih adalah hak asasi manusia, dan
                    pembangunan sumber air bersih sangat penting. Program ini
                    mencakup pembuatan sumur bor, pengembangan sistem distribusi
                    air, dan penyediaan pelatihan bagi warga setempat dalam
                    pengelolaan air. Dengan melibatkan komunitas dalam
                    pemeliharaan dan pengelolaan sumber air, program ini dapat
                    berkelanjutan dan memberdayakan masyarakat setempat.
                  </p>
                </div>
              </div>
              <Image
                src="/IMG_3814-2048x1365.jpg"
                width={400}
                height={400}
                alt="Human Initiative"
                className="w-[400px] h-full relative z-20"
              />
              <p className="text-sm font-normal text-indigo-950 dark:text-slate-300 relative z-20">
                Selama pelaksanaan program ini, penting untuk memastikan
                partisipasi aktif dan inklusi masyarakat lokal dalam perencanaan
                dan pengambilan keputusan. Program ini juga harus memastikan
                keberlanjutan jangka panjang melalui pelatihan dan pengembangan
                kapasitas lokal. Selain itu, pemerintah dan mitra non-pemerintah
                dapat berkolaborasi untuk mengidentifikasi sumber daya, dana,
                dan teknologi yang diperlukan untuk menjalankan program ini
                dengan sukses. Program pembangunan infrastruktur yang berfokus
                pada pemberdayaan sumber daya lokal dapat berdampak positif pada
                perkembangan sosial, ekonomi, dan kualitas hidup masyarakat di
                Indonesia.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="sekolah">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10 relative">
              <div className="flex flex-col gap-y-6">
                <Image
                  src="/Asset 6@16x.png"
                  width={100}
                  height={100}
                  alt="Human Initiative Disaster"
                  className="w-[100px] rounded-xl"
                />
                <div className="flex flex-row gap-x-5 justify-between items-center">
                  <p className="w-1/5 flex flex-row gap-x-3 text-3xl font-bold text-sky-600 dark:text-slate-300 relative z-20">
                    Pembangunan Sarana Pendidikan
                  </p>
                  <p className="w-4/5 text-sm font-normal text-indigo-950 dark:text-slate-300 relative z-20">
                    Sekolah adalah langkah penting untuk meningkatkan pendidikan
                    di daerah tersebut. Program ini mencakup pembangunan gedung
                    sekolah, penyediaan peralatan pendidikan, dan pelatihan guru
                    lokal. Sumber daya lokal dapat dimanfaatkan dalam
                    pembangunan sekolah, seperti pekerjaan konstruksi,
                    penyediaan makanan sekolah dari petani lokal, dan melibatkan
                    komite sekolah dalam pengelolaan sekolah.
                  </p>
                </div>
              </div>
              <p className="flex flex-row gap-x-3 text-xl font-bold text-sky-800 dark:text-slate-300 relative z-20">
                Bentuk program Pembangunan Sarana Pendidikan, antara lain:
              </p>
              <ul className="list-disc list-inside relative z-20">
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300">
                  Ruang Kelas
                </li>
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300 pt-2">
                  Asrama
                </li>
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300 pt-2">
                  Sekolah
                </li>
              </ul>
              <Image
                src="/DSC04008-2048x1365.jpg"
                width={400}
                height={400}
                alt="Human Initiative"
                className="w-[400px] h-full relative z-20 rounded"
              />
            </div>
          </TabsContent>
          <TabsContent value="kesehatan">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10 relative">
              <div className="flex flex-col gap-y-6">
                <Image
                  src="/Asset 11@16x.png"
                  width={100}
                  height={100}
                  alt="Human Initiative Disaster"
                  className="w-[100px] rounded-xl"
                />
                <div className="flex flex-row gap-x-5 justify-between items-center">
                  <p className="w-1/5 flex flex-row gap-x-3 text-3xl font-bold text-sky-600 dark:text-slate-300 relative z-20">
                    Penyediaan Sarana Kesehatan
                  </p>
                  <p className="w-4/5 text-sm font-normal text-indigo-950 dark:text-slate-300 relative z-20">
                    Kegiatan penyediaan sarana maupun prasarana yang bertujuan
                    mendukung program kesehatan masyarakat sehingga mampu
                    meningkatkan kesejahteraan dan membentuk lingkungan
                    masyarakat yang sehat.
                  </p>
                </div>
              </div>
              <p className="flex flex-row gap-x-3 text-xl font-bold text-sky-800 dark:text-slate-300 relative z-20">
                Bentuk program Penyediaan Sarana Kesehatan, antara lain:
              </p>
              <ul className="list-disc list-inside relative z-20">
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300">
                  Pembangunan Klinik
                </li>
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300 pt-2">
                  Sarana dan Prasarana Klinik
                </li>
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300 pt-2">
                  Ambulans Laut
                </li>
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300 pt-2">
                  Safety Mobile
                </li>
              </ul>
              <Image
                src="/IMG_8495.JPG"
                width={400}
                height={400}
                alt="Human Initiative"
                className="w-[400px] h-full relative z-20 rounded hidden"
              />
            </div>
          </TabsContent>
          <TabsContent value="hunian">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10 relative">
              <div className="flex flex-col gap-y-6">
                <Image
                  src="/Asset 10@16x.png"
                  width={100}
                  height={100}
                  alt="Human Initiative Disaster"
                  className="w-[100px] rounded-xl"
                />
                <div className="flex flex-row justify-between items-center">
                  <p className="w-1/5 flex flex-row gap-x-3 text-3xl font-bold text-sky-600 dark:text-slate-300 relative z-20">
                    Pembangunan Hunian
                  </p>
                  <p className="w-4/5 text-sm font-normal text-indigo-950 dark:text-slate-300 relative z-20">
                    Kegiatan pembangunan ataupun perbaikan tempat tinggal yang
                    bertujuan memenuhi kebutuhan dasar manusia akan tempat
                    tinggal yang guna meningkatkan kualitas hidup.
                  </p>
                </div>
              </div>
              <p className="flex flex-row gap-x-3 text-xl font-bold text-sky-800 dark:text-slate-300 relative z-20">
                Bentuk program Pembangunan Hunian, antara lain:
              </p>
              <ul className="list-disc list-inside relative z-20">
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300">
                  Hunian Sementara (Huntara)
                </li>
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300 pt-2">
                  Hunian Tetap (Huntap)
                </li>
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300 pt-2">
                  Renovasi Rumah
                </li>
              </ul>
              <Image
                src="/IMG_8495.JPG"
                width={400}
                height={400}
                alt="Human Initiative"
                className="w-[400px] h-full relative z-20 rounded"
              />
            </div>
          </TabsContent>
          <TabsContent value="jembatan">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10 relative">
              <div className="flex flex-col gap-y-6">
                <Image
                  src="/Asset 5@16x.png"
                  width={100}
                  height={100}
                  alt="Human Initiative Disaster"
                  className="w-[100px] rounded-xl"
                />
                <div className="flex flex-row justify-between items-center">
                  <p className="w-1/5 flex flex-row gap-x-3 text-3xl font-bold text-sky-600 dark:text-slate-300 relative z-20">
                    Peralatan Sarana Umum
                  </p>
                  <p className="w-4/5 text-sm font-normal text-indigo-950 dark:text-slate-300 relative z-20">
                    Jembatan dapat menghubungkan wilayah yang sebelumnya
                    terisolasi, memudahkan akses ke pasar, layanan kesehatan,
                    dan pendidikan. Program ini mempekerjakan insinyur dan
                    tenaga kerja lokal untuk membangun jembatan. Selain itu,
                    program ini juga dapat mencakup pelatihan bagi warga
                    setempat tentang pemeliharaan dan manajemen jembatan.
                  </p>
                </div>
              </div>
              <Image
                src="/DJI_0505-2048x1536.jpg"
                width={1000}
                height={700}
                alt="Human Initiative"
                className="w-full h-full relative z-20 rounded"
              />
              <p className="text-base font-normal text-slate-700 relative z-20">
                Selama pelaksanaan program ini, penting untuk memastikan
                partisipasi aktif dan inklusi masyarakat lokal dalam perencanaan
                dan pengambilan keputusan. Program ini juga harus memastikan
                keberlanjutan jangka panjang melalui pelatihan dan pengembangan
                kapasitas lokal. Selain itu, pemerintah dan mitra non-pemerintah
                dapat berkolaborasi untuk mengidentifikasi sumber daya, dana,
                dan teknologi yang diperlukan untuk menjalankan program ini
                dengan sukses. Program pembangunan infrastruktur yang berfokus
                pada pemberdayaan sumber daya lokal dapat berdampak positif pada
                perkembangan sosial, ekonomi, dan kualitas hidup masyarakat di
                Indonesia.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="saranaalat">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10">
              <div className="flex flex-col gap-y-6">
                <Image
                  src="/Asset 9@16x.png"
                  width={100}
                  height={100}
                  alt="Human Initiative Disaster"
                  className="w-[100px] rounded-xl"
                />
                <div className="flex flex-row justify-between items-center">
                  <p className="flex flex-row gap-x-3 text-3xl font-bold text-sky-600 dark:text-slate-300 relative z-20">
                    Peralatan Sarana Umum
                  </p>
                  <p className="text-sm font-normal text-indigo-950 dark:text-slate-300 relative z-20">
                    Kegiatan distribusi peralatan ibadah yang bertujuan untuk
                    mendukung kegiatan ibadah bagi masyarakat duafa dan
                    mendukung pembangunan berkelanjutan.
                  </p>
                </div>
              </div>
              <p className="flex flex-row gap-x-3 text-xl font-bold text-sky-800 dark:text-slate-300 relative z-20">
                Bentuk program Peralatan Sarana Umum, antara lain:
              </p>
              <ul className="list-disc list-inside relative z-20">
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300">
                  Peralatan Ibadah
                </li>
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300 pt-2">
                  Sound System
                </li>
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300 pt-2">
                  Kipas Angin
                </li>
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300 pt-2">
                  Dispenser
                </li>
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300 pt-2">
                  Al-quran
                </li>
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300 pt-2">
                  Solar Panel
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </section>
      <section className="flex flex-col justify-center items-center sm:gap-y-10 gap-y-10 sm:py-28 py-10 sm:px-24 px-6 dark:bg-slate-950 bg-slate-50 relative z-20">
        <div className="flex flex-row justify-center items-center gap-x-10 w-full relative z-20">
          <h5 className="text-slate-700 w-full dark:text-white font-semibold text-5xl">
            <span className="text-sky-600">Related</span> Publications
          </h5>
        </div>

        <div className="list_post flex flex-wrap gap-8 w-full justify-start">
          {isLoading && <p className="text-slate-600">Memuat data...</p>}
          {isError && (
            <p className="text-red-500">Gagal mengambil data publikasi.</p>
          )}

          {posts.map((post: any) => (
            <div
              key={post.id}
              className="post_program_card w-full sm:w-[22%] flex flex-col gap-y-4"
            >
              <div className="w-full relative z-20">
                <Image
                  src={
                    post.news_integration
                      ? `https://cdnx.human-initiative.org/image/${post.guid}`
                      : `${post.guid}`
                  }
                  width={400}
                  height={400}
                  alt={post.post_title || 'Gambar Publikasi'}
                  className="w-full h-[250px] object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-y-4 relative z-20">
                <h5 className="text-slate-700 font-semibold text-lg line-clamp-2">
                  {post.post_title}
                </h5>
                <p
                  className="text-slate-600 font-normal text-base line-clamp-3"
                  dangerouslySetInnerHTML={{__html: post.post_content}}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default InfrastructureProgram;
