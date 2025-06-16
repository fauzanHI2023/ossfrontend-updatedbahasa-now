'use client';
import React from 'react';
import Banner from '@/components/ui/banner/Banner';
import {Salad, Droplet} from 'lucide-react';
import {GrMoney} from 'react-icons/gr';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs-fe';
import Image from 'next/image';
import {fetchNewsByHashtagProgram} from '@/lib/publication/auth-news';
import {useQuery} from '@tanstack/react-query';
import {useTranslations} from 'next-intl';

const InitiativeForEmpowerment = () => {
  const t = useTranslations();
  const {data, isLoading, isError} = useQuery({
    queryKey: ['news', 'empowerment'],
    queryFn: () => fetchNewsByHashtagProgram('empowerment')
  });

  const posts = data?.data ?? [];

  return (
    <main className="flex flex-col sm:py-16 py-6 sm:pt-28 pt-24 dark:bg-slate-950 bg-white">
      <Banner
        title={t('bannerInitiativeEmpowerment.title')}
        description={t('bannerInitiativeEmpowerment.desc')}
        image="/DSC050478.JPG"
      />
      <section className="relative overflow-hidden flex flex-col justify-center items-center sm:gap-y-10 gap-y-10 sm:py-[150px] py-10 sm:px-24 px-6 dark:bg-slate-950 bg-white">
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none" />
        <div className="flex flex-row justify-center items-center gap-x-10 w-full relative z-20">
          <h5 className="text-slate-700 w-full dark:text-white font-semibold text-5xl">
            Initiative for <span className="text-sky-600">Empowerment</span>
          </h5>
          <p className="text-slate-600 dark:text-white font-normal text-base">
            Initiative for Empowerment atau disebut juga Klaster Berdaya
            merupakan kumpulan dari berbagai program pemberdayaan yang
            diterapkan pada tingkat individu, keluarga, maupun lingkungan yang
            lebih luas lagi untuk meningkatkan kualitas hidup dan kemampuan para
            penerima manfaat dari program ini dalam upaya meningkatkan
            kesejahteraan yang berkelanjutan. Program Klaster melakukan
            pendekatan pemberdayaan melalui proses fasilitasi masyarakat agar
            mereka bisa mengorganisasikan seluruh potensi yang dimilikinya untuk
            menyelesaikan permasalahan mereka.
          </p>
        </div>
        {/* <div className="flex flex-row gap-x-16 justify-center items-center w-2/3">
          <div className="flex flex-col justify-center items-center gap-y-4 w-1/3">
            <span className="bg-green-200 rounded-[32px] w-16 h-16 text-center flex justify-center items-center">
              <Salad className="text-green-500 text-xl w-8 h-8" />
            </span>
            <h5>Perlindungan Anak</h5>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-4 w-1/3">
            <span className="bg-sky-200 rounded-[32px] w-16 h-16 text-center flex justify-center items-center">
              <Droplet className="text-sky-500 text-xl w-8 h-8" />
            </span>
            <h5>Pendidikan Anak Yatim dan Duafa</h5>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-4 w-1/3">
            <span className="bg-pink-200 rounded-[32px] w-16 h-16 text-center flex justify-center items-center">
              <GrMoney className="text-pink-500 text-xl w-8 h-8" />
            </span>
            <h5>Pemenuhan Kebutuhan Dasar</h5>
          </div>
        </div> */}
        <Tabs
          defaultValue="kesehatannutrisidanketahananpangan"
          className="w-full"
        >
          <TabsList className="flex flex-row justify-start items-center gap-x-8 relative z-20">
            <TabsTrigger
              value="kesehatannutrisidanketahananpangan"
              className="w-max-content flex flex-row gap-x-2"
            >
              <Salad className="text-sky-600" /> Kesehatan, Nutrisi dan
              Ketahanan Pangan
            </TabsTrigger>
            <TabsTrigger
              value="airsanitasidanenergi"
              className="w-max-content flex flex-row gap-x-2"
            >
              <GrMoney className="text-sky-600" /> Air, Sanitasi dan Energi
            </TabsTrigger>
            <TabsTrigger
              value="pemulihanpascabencana"
              className="w-max-content flex flex-row gap-x-2"
            >
              <Droplet className="text-sky-600" /> Pemberdayaan Ekonomi
            </TabsTrigger>
          </TabsList>
          <TabsContent value="kesehatannutrisidanketahananpangan">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10">
              <p className="text-base font-normal text-slate-700 relative z-20">
                Kesehatan, Nutrisi dan Ketahanan Pangan Meliputi 3 Program yaitu
                Sahabat Gizi Kita, Kebun Gizi dan Sustainable Farming.
              </p>
              <ul className="list-disc list-inside">
                <li className="text-base font-normal text-slate-700 relative z-20">
                  Sahabat Gizi Kita (SAGITA) merupakan program yang
                  diperuntukkan bagi penanggulangan permasalahan kesehatan ibu
                  dan anak yang mengalami kurang gizi.
                </li>
                <li className="text-base font-normal text-slate-700 relative z-20">
                  Kebun Gizi adalah program pembentukan ketahanan pangan
                  komunitas selama 6 bulan melalui capacity building masyarakat,
                  bantuan sarana pertanian dan perikanan, serta coaching dan
                  pendampingan.
                </li>
                <li className="text-base font-normal text-slate-700 relative z-20">
                  Program Sustainable Farming bertujuan untuk meningkatkan
                  kapasitas pemuda tani sebagai agent of change dalam
                  implementasi pertanian organik dengan teknologi modern.
                  Program ini mengedepankan kualitas produk yang menyehatkan dan
                  berkelanjutan serta proses pertanian yang efektif dan efisien.
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="airsanitasidanenergi">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10">
              <p className="text-base font-normal text-slate-700 relative z-20">
                Air, Sanitasi dan Energi Mencakup 3 Program yaitu Berbagi Air,
                Kampung Sanitasi dan Energi Untuk Kehidupan
              </p>
              <ul className="list-disc list-inside">
                <li className="text-base font-normal text-slate-700 relative z-20">
                  Program Berbagi Air menggunakan pendekatan PAMDus, yaitu
                  membangun sistem air bersih yang dapat memberikan kemudahan
                  akses air bersih hingga ke rumah-rumah dan dikelola oleh
                  masyarakat.
                </li>
                <li className="text-base font-normal text-slate-700 relative z-20">
                  Program Kampung Sanitasi menitikberatkan pada pemahaman dan
                  perubahan perilaku masyarakat mengenai PHBS serta pembentukan
                  kelompok masyarakat yang mampu secara mandiri memenuhi
                  kebutuhan sanitasi layak di wilayahnya secara berkelanjutan.
                  Bentuk kegiatan fokus pada empat hal, yaitu pembentukan kader
                  sanitasi, pembangu nan sarana sanitasi, dan pembentukan
                  lingkungan sadar sanitasi dengan durasi program 12 bulan.
                </li>
                <li className="text-base font-normal text-slate-700 relative z-20">
                  Program Energi untuk Kehidupan adalah program yang mendukung
                  green energy dalam rangka respons mitigasi isu climate change.
                  Bentuk programnya terdiri dari pembangunan balai energi yang
                  mendukung aktivitas penghidupan masyarakat.
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="pemulihanpascabencana">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10 relative">
              <p className="text-base font-normal text-slate-700 relative z-20">
                Pemberdayaan Ekonomi meliputi beberapa program, yaitu Kelompok
                Usaha Mandiri Masyarakat (KUMM), Kelompok Usaha Bersama (KUBE)
                dan Bangun Industri Desa.
              </p>
              <ul className="list-disc list-inside">
                <li className="text-base font-normal text-slate-700 relative z-20">
                  Kelompok Usaha Mandiri Masyarakat (KUMM) adalah Program
                  pemberdayaan masyarakat yang bertujuan untuk meningkatkan
                  perekonomian suatu keluarga dengan cara
                  membentuk/mengembangkan unit usaha yang nantinya akan dikelola
                  oleh anggota keluarga, sehingga dapat meningkatkan pendapatan
                  keluarga tersebut.
                </li>
                <li className="text-base font-normal text-slate-700 relative z-20">
                  Program Kelompok Usaha Bersama (KUBE) adalah program
                  pemberdayaan ekonomi masyarakat yang berfokus pada pembangunan
                  lingkungan usaha yang kondusif seperti pelatihan usaha,
                  penguatan kelembagaan, dan penguatan jejaring strategis.
                  Penerima manfaat akan diintervensi dalam kelompok usaha dengan
                  1 jenis usaha yang sama.
                </li>
                <li className="text-base font-normal text-slate-700 relative z-20">
                  Bangun Industri Desa (BID) adalah program pember dayaan
                  ekonomi yang dijalankan melalui pengem bangan potensi lokal
                  daerah dengan membangun sebuah industri yang dapat
                  meningkatkan kualitas produk dan memperluas akses pasar dengan
                  nilai jual yang lebih tinggi.
                </li>
              </ul>
              <div className="w-full relative z-20">
                <Image
                  src="/DSC03216_11zon.jpg"
                  width={400}
                  height={400}
                  alt="Human Initiative Disaster"
                  className="w-[400px] rounded-xl"
                />
              </div>
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

export default InitiativeForEmpowerment;
