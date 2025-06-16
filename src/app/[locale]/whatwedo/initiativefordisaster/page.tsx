'use client';
import React from 'react';
import Banner from '@/components/ui/banner/Banner';
import {Flame, TimerReset, BedDouble} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs-fe';
import Image from 'next/image';
import {fetchNewsByHashtagProgram} from '@/lib/publication/auth-news';
import {useQuery} from '@tanstack/react-query';
import {SiAwesomewm} from 'react-icons/si';
import {SiDeliveroo} from 'react-icons/si';
import {useTranslations} from 'next-intl';

const InitiativeForDisaster = () => {
  const t = useTranslations();
  const {data, isLoading, isError} = useQuery({
    queryKey: ['news', 'disaster'],
    queryFn: () => fetchNewsByHashtagProgram('disaster')
  });

  const posts = data?.data ?? [];

  return (
    <main className="flex flex-col sm:py-16 py-6 sm:pt-28 pt-24 dark:bg-slate-950 bg-white">
      <Banner
        title={t('bannerInitiativeDisaster.title')}
        description={t('bannerInitiativeDisaster.desc')}
        image="/DSC04568.JPG"
      />
      <section className="relative overflow-hidden flex flex-col justify-center items-center sm:gap-y-10 gap-y-10 sm:py-[150px] py-10 sm:px-24 px-6 dark:bg-slate-950 bg-white">
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none" />
        <div className="flex flex-row justify-center items-center gap-x-10 w-full relative z-20">
          <h5 className="text-slate-700 w-full dark:text-white font-semibold text-5xl">
            Initiative for <span className="text-sky-600">Disaster</span>
          </h5>
          <p className="text-slate-600 dark:text-white font-normal text-base">
            Initiative for Disaster is a collection of various programs aimed at
            reducing the impact of disasters, through empowering the potential
            and capacity of the community to recognize potential disasters, and
            making preparations for disasters. In addition to preventive
            actions, the preparation of teams that will be deployed in the event
            of a disaster is also a concern in various disaster programs.​
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
              <TimerReset className="text-sky-500 text-xl w-8 h-8" />
            </span>
            <h5>Pendidikan Anak Yatim dan Duafa</h5>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-4 w-1/3">
            <span className="bg-pink-200 rounded-[32px] w-16 h-16 text-center flex justify-center items-center">
              <BedDouble className="text-pink-500 text-xl w-8 h-8" />
            </span>
            <h5>Pemenuhan Kebutuhan Dasar</h5>
          </div>
        </div> */}
        <Tabs defaultValue="programkampungtangguhbencana" className="w-full">
          <TabsList className="flex flex-row justify-start items-center gap-x-2 relative z-20">
            <TabsTrigger
              value="programkampungtangguhbencana"
              className="w-max-content flex flex-row gap-x-2"
            >
              <Flame className="text-sky-600" /> Program Kampung Tangguh Bencana
            </TabsTrigger>
            <TabsTrigger
              value="mitigasperubahaniklim"
              className="w-max-content flex flex-row gap-x-2"
            >
              <BedDouble className="text-sky-600" /> Mitigasi Perubahan Iklim
            </TabsTrigger>
            <TabsTrigger
              value="pengurannganrisikobencana"
              className="w-max-content flex flex-row gap-x-2"
            >
              <BedDouble className="text-sky-600" /> Pengurangan Risiko Bencana
            </TabsTrigger>
            <TabsTrigger
              value="tanggapdarurat"
              className="w-max-content flex flex-row gap-x-2"
            >
              <BedDouble className="text-sky-600" /> Emergency Response
            </TabsTrigger>
            {/* <TabsTrigger
              value="pemulihanpascabencana"
              className="w-max-content flex flex-row gap-x-2"
            >
              <TimerReset className="text-sky-600" /> Post Disaster Recovery
            </TabsTrigger> */}
          </TabsList>
          {/* <TabsContent value="penguranganresikobencana">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10">
              <p className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                Aims to reduce the threat of disaster and mitigate the adverse
                effects of a disaster threat by educating a person or a
                community.
              </p>
              <p className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                Among the programs are:
              </p>
              <ul className="list-disc list-inside relative z-20">
                <li className="text-base font-normal text-slate-700 dark:text-slate-300">
                  Resilient Village​
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300">
                  Safe School
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300">
                  Information Communication and Education
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300">
                  Early Warning System
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300">
                  Planet Volunteer
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300">
                  Disaster Response Family
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300">
                  Climate Change
                </li>
              </ul>
            </div>
          </TabsContent> */}
          <TabsContent value="programkampungtangguhbencana">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10">
              <div className="flex flex-col gap-y-3">
                <h4 className="text-sm text-indigo-950 font-bold">
                  Manajemen Bencana
                </h4>
                <p className="text-sm font-normal text-indigo-950 dark:text-slate-300 relative z-20">
                  Serangkaian kegiatan yang dilaksanakan dalam rangka
                  pencegahan, mitigasi kesiapsiagaan, tanggap darurat, dan
                  pemulihan yang berkaitan dengan kejadian bencana.
                </p>
              </div>
              <div className="flex flex-col gap-y-3">
                <h4 className="text-sm text-indigo-950 font-bold">
                  Program Kampung Tangguh Bencana
                </h4>
                <p className="text-sm font-normal text-indigo-950 dark:text-slate-300 relative z-20">
                  merupakan desa yang memiliki kemampuan untuk mengenali ancaman
                  di wilayahnya dan mampu mengorganisir sumber daya masyarakat
                  untuk mengurangi kerentanan dan sekaligus meningkatkan
                  kapasitas demi mengurangi risiko bencana.
                </p>
              </div>
              <p className="flex flex-row gap-x-3 text-3xl font-bold text-sky-600 dark:text-slate-300 relative z-20">
                <SiAwesomewm className="text-sky-500" /> Keunggulan Program
              </p>
              <ul className="list-disc list-inside relative z-20">
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300">
                  Dilakukan pendampingan secara rutin
                </li>
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300 pt-2">
                  Advokasi mendapatkan pengakuan dari BPBD
                </li>
                <li className="text-sm font-normal text-indigo-950dark:text-slate-300 pt-2">
                  Memasukkan aksi perubahan iklim di wilayah program
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="mitigasperubahaniklim">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10">
              <p className="text-sm font-normal text-indigo-950 dark:text-slate-300 relative z-20">
                Program Mitigasi Perubahan Iklim adalah serangkaian kegiatan
                untuk mengurangi dampak perubahan iklim dengan menurunkan emisi
                gas rumah kaca atau meningkatkan penyimpanan karbon.
              </p>
              <p className="flex flex-row gap-x-3 text-3xl font-bold text-sky-600 dark:text-slate-300 relative z-20">
                <SiAwesomewm className="text-sky-500" /> Keunggulan Program
              </p>
              <ul className="list-disc list-inside relative z-20">
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300">
                  Pengurangan emisi gas rumah kaca
                </li>
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300 pt-2">
                  Peningkatan kualitas lingkungan dan ketahanan ekosistem
                </li>
                <li className="text-sm font-normal text-indigo-950dark:text-slate-300 pt-2">
                  Pengembangan teknologi hijau, efisiensi energi dan penghematan
                  biaya
                </li>
                <li className="text-sm font-normal text-indigo-950dark:text-slate-300 pt-2">
                  Peningkatan kesadaran dan partisipasi masyarakat
                </li>
                <li className="text-sm font-normal text-indigo-950dark:text-slate-300 pt-2">
                  Pengurangan risiko bencana
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="pengurannganrisikobencana">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10">
              <p className="text-sm font-normal text-indigo-950 dark:text-slate-300 relative z-20">
                Sejumlah program yang bertujuan untuk meningkatnya resiliensi
                masyarakat terhadap penanggulangan bencana dan adaptasi
                perubahan iklim.
              </p>
              <p className="flex flex-row gap-x-3 text-3xl font-bold text-sky-600 dark:text-slate-300 relative z-20">
                <SiDeliveroo className="text-sky-500" /> Bentuk program
                Pengurangan Risiko Bencana:
              </p>
              <ul className="list-disc list-inside relative z-20">
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300">
                  Kampung Tangguh
                </li>
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300 pt-2">
                  Aksi Adaptasi dan Mitigasi Perubahan Iklim
                </li>
                <li className="text-sm font-normal text-indigo-950dark:text-slate-300 pt-2">
                  Sekolah Aman Bencana
                </li>
                <li className="text-sm font-normal text-indigo-950dark:text-slate-300 pt-2">
                  Aksi Antisipasi
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="tanggapdarurat">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10">
              <p className="text-sm font-normal text-indigo-950 dark:text-slate-300 relative z-20">
                Sejumlah program yang bertujuan meningkatnya kualitas hidup
                masyarakat terdampak bencana minimal ke posisi awal sebelum
                bencana terjadi.
              </p>
              <p className="flex flex-row gap-x-3 text-3xl font-bold text-sky-600 dark:text-slate-300 relative z-20">
                <SiDeliveroo className="text-sky-500" /> Bentuk program
                Pengurangan Risiko Bencana:
              </p>
              <ul className="list-disc list-inside relative z-20">
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300">
                  SAR – Rescue
                </li>
                <li className="text-sm font-normal text-indigo-950 dark:text-slate-300 pt-2">
                  Emergency Relief
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="pemulihanpascabencana">
            <div className="flex flex-col gap-y-8 w-full h-full rounded-2xl p-10 relative">
              <p className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                A process through which basic needs are met after a disaster,
                both natural and social disasters, will be carried out by the
                disaster recovery team.​
              </p>
              <p className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                There are various activities carried out by the recovery team,
                including Psychosocial Support Assistance provided to
                individuals and communities experiencing psychological
                disorders, where this assistance is carried out continuously and
                mutually influences between psychological aspects and social
                aspects in the environment where individuals or communities
                are.​
              </p>
              <p className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                Then there is also Emergency Relief, which is a program to
                fulfill basic needs for residents affected by disasters during
                emergency response quickly, precisely, and with dignity with a
                scope:​
              </p>
              <ul className="list-disc list-inside">
                <li className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                  Shelter
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                  Water, Sanitation and Health Promotion
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                  Food Security/Nutrition
                </li>
                <li className="text-base font-normal text-slate-700 dark:text-slate-300 relative z-20">
                  Family Needs
                </li>
              </ul>
              <div className="w-full relative z-20">
                <Image
                  src="/IMG_5460_11zon.jpg"
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

export default InitiativeForDisaster;
