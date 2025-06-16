'use client';
import React from 'react';
import Banner from '@/components/ui/banner/Banner';
import {Baby, University, Backpack} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs-program';
import Image from 'next/image';
import {fetchNewsByHashtagProgram} from '@/lib/publication/auth-news';
import {useQuery} from '@tanstack/react-query';
import {useTranslations} from 'next-intl';

const InitiativeForChildren = () => {
  const t = useTranslations();
  const {data, isLoading, isError} = useQuery({
    queryKey: ['news', 'children'],
    queryFn: () => fetchNewsByHashtagProgram('children')
  });

  const posts = data?.data ?? [];

  return (
    <main className="flex flex-col sm:py-16 py-6 sm:pt-28 pt-24 dark:bg-slate-950 bg-white">
      <Banner
        title={t('bannerInitiativeChildren.title')}
        description={t('bannerInitiativeChildren.desc')}
        image="/DSC08227.JPG"
      />
      <section className="relative overflow-hidden flex flex-col justify-center items-center sm:gap-y-10 gap-y-10 sm:py-[150px] py-10 sm:px-24 px-6 dark:bg-slate-950 bg-white">
        {/* <div className="absolute inset-0 w-full h-full z-20 pointer-events-none" />
        <Boxes/> */}
        <div className="flex flex-row justify-center items-center gap-x-10 w-full relative z-20">
          <h5 className="text-slate-700 dark:text-slate-300 w-full dark:text-white font-semibold text-5xl">
            Initiative for <span className="text-sky-600">Children</span>
          </h5>
          <p className="text-slate-600 dark:text-white font-normal text-base">
            Initiative for Children is a collection of various programs that
            focus on improving the knowledge and skills of orphans or the poor.
            These programs include educational scholarship programs, provision
            of school supplies, worship equipment, psychological support, and
            various trainings that support them to be able to live
            independently.
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
        <Tabs defaultValue="perlindungananak" className="w-full">
          <TabsList className="flex flex-row justify-start items-center gap-x-8 relative z-20">
            <TabsTrigger
              value="perlindungananak"
              className="w-max-content flex flex-row gap-x-2"
            >
              <Baby className="text-sky-600" /> Child Protection
            </TabsTrigger>
            <TabsTrigger
              value="pendidikananakyatimdanduafa"
              className="w-max-content flex flex-row gap-x-2"
            >
              <Backpack className="text-sky-600" /> Education of Orphans and The
              Underprivileged
            </TabsTrigger>
            <TabsTrigger
              value="pemenuhankebutuhandasar"
              className="w-max-content flex flex-row gap-x-2"
            >
              <University className="text-sky-600" /> Fulfillment of Basic Needs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="perlindungananak">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10">
              <p className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                Hai Sahabat Inisiator, Anak adalah masa depan. Anak yang
                Sehat,kuat dan berkarakter menjadi cikal bakal bangsa yang
                hebat. itu semua dapat terwujud dengan pemperhatikan hak-hak
                anak dalam pertumbuhannya. Yuk Simak Video Berikut
              </p>
              <iframe
                src="https://human-initiative.org/wp-content/uploads/2018/05/Child-Protection-Human-Initiative-REV-01.mp4?_=4"
                frameBorder="0"
                allowFullScreen
                width="600"
                height="400"
                className="relative z-20"
              ></iframe>
              <h6 className="text-xl font-semibold text-slate-700 dark:text-slate-300 relative z-20">
                Seperti Keluarga di Rumah, HOME Ingin Setiap Anak Mencapai
                Potensi Maksimalnya
              </h6>
              <p className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                HOME Children Learning Center adalah tempat bagi setiap anak,
                khususnya yatim, anak berasal dari keluarga kurang mampu, dan
                anak terlantar untuk mendapatkan dukungan pemenuhan hak dan
                perlindungan anak. Seperti Rumah, HOME ingin setiap anak
                mencapai potensi maksimalnya melalui kegiatan belajar, bermain,
                berkreasi serta ruang untuk konsultasi. Anak Tangguh di masa
                depan perlu mendapatkan dukungan dari orang baik di masa
                kecilnya.
              </p>
              <iframe
                src="https://human-initiative.org/wp-content/uploads/2018/05/Home-2-COMPRESS.mp4?_=5"
                frameBorder="0"
                allowFullScreen
                width="600"
                height="400"
                className="relative z-20"
              ></iframe>
              <p className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                Selanjutnya, Kami memiliki Sekolah Tanpa Kekerasan yang
                merupakan program preventif untuk menutup peluang terjadinya
                kekerasan, eksploitasi, perlakuan salah, dan penelantaran di
                sekolah dengan mengimplementasikan child safeguarding policy.
                Melalui program ini, civitas sekolah diedukasi, dilatih,
                didampingi dalam penyusunan dan implementasi child safeguarding
                policy.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="pendidikananakyatimdanduafa">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10">
              <p className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                Program ini mencakup Sekolah Human Initiative, Pondok Yatim dan
                Duafa dan Pendidikan Untuk Anak Penyintas.
              </p>
              <ul className="list-disc list-inside">
                <li className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                  Sekolah Human Initiative adalah Program pembangunan sekolah
                  untuk anak-anak terdampak bencana agar dapat mengenyam
                  pendidikan formal.
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                  Pondok Yatim dan Duafa merupakan Program pembangunan pondok
                  untuk anak-anak yatim terdampak bencana yang berkomitmen
                  menghafal Alquran dan belajar ilmu agama.
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                  Pendidikan Untuk Anak Penyintas adalah Program dukungan
                  pendidikan kepada para penyintas dari berbagai negara yang
                  berada di Indonesia. Dukungan pendidikan berupa advokasi akses
                  pendidikan formal dan penyelenggaraan pendidikan nonformal
                  berupa pendidikan budaya, bahasa inggris, komputer, dan life
                  skill untuk anak-anak pengungsi.
                </li>
              </ul>
              <div className="w-full relative z-20">
                <Image
                  src="/DSC08242 (1)_11zon.jpg"
                  width={400}
                  height={400}
                  alt="Human Initiative Disaster"
                  className="w-[400px] rounded-xl"
                />
              </div>
              <div className="w-full relative z-20">
                <Image
                  src="/PRT01592_11zon.jpg"
                  width={400}
                  height={400}
                  alt="Human Initiative Disaster"
                  className="w-[400px] rounded-xl"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="pemenuhankebutuhandasar">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10 relative">
              <p className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                Pemenuhan Kebutuhan Dasar Anak meliputi Program Orang Tua
                Asuh(OTA)
              </p>
              <iframe
                src="https://human-initiative.org/wp-content/uploads/2018/05/OTA-Aksa_rev-2-video.mp4?_=6"
                frameBorder="0"
                allowFullScreen
                width="600"
                height="400"
                className="relative z-20"
              ></iframe>
              <p className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                Program Orang Tua Asuh sendiri adalah Gerakan kepedulian sosial
                untuk menjamin keberlangsungan pendidikan anak-anak yatim dan
                pelajar kurang mampu melalui pola pengasuhan. Bentuk program
                gerakan Orang Tua Asuh adalah bantuan beasiswa dan pendidikan
                karakter serta budi pekerti kepada penerima manfaat.
              </p>
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

export default InitiativeForChildren;
