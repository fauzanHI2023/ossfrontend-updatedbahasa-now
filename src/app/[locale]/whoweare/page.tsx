'use client';
import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import {FlipWords} from '@/components/ui/flip-words';
import SpotlightCard from '@/components/ui/SpotlightCard';
import {
  Building,
  AlignVerticalDistributeCenter,
  Slack,
  Award,
  Phone,
  Mail,
  Instagram,
  DatabaseZap,
  HeartHandshake,
  SunSnow,
  MapPinned
} from 'lucide-react';
import {FaTrophy} from 'react-icons/fa';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs-wrap-new';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useTranslations} from 'next-intl';

interface Team {
  image: string;
  nama: string;
  jabatan: string;
}

const teams: Team[] = [
  {
    image: '/BoD Human Initiative - Tomy Hendrajati.jpg',
    nama: 'Tomy Hendrajati',
    jabatan: 'President of Human Initiative'
  },
  {
    image: '/BoD Human Initiative - Romi Ardiansyah.jpg',
    nama: 'Romi Ardiansyah',
    jabatan: 'Vice President of Operation'
  },
  {
    image: '/BoD Human Initiative - Andjar Radite.jpg',
    nama: 'Andjar Radite',
    jabatan: 'Vice President of Resources & Social Enterprise'
  },
  {
    image: '/BoD Human Initiative - Bambang Suherman.jpg',
    nama: 'Bambang Suherman',
    jabatan: 'Vice President of Worldwide Partnership & National Development'
  }
];

interface Award {
  tahun: string;
  judul: string;
  keterangan: string;
}

const awards: Award[] = [
  {
    tahun: '2006',
    judul: 'Program Rebuilding Fund',
    keterangan:
      'Mendapatkan penghargaan dari Numico Group, Netherland dalam program “Rebuilding Fund” pembangunan 500 perumahan dan sekolah, bagi korban gempa Yogyakarta 2006.'
  },
  {
    tahun: '2010',
    judul: 'Pahlawan dari Tanah Bencana',
    keterangan:
      'Suharjoni, Disaster Risk Management Human Initiative, terpilih sebagai satu dari sembilan orang “Pahlawan dari tanah bencana” versi majalah Tempo edisi khusus Tokoh Pilihan yang terbit Desember 2010.'
  },
  {
    tahun: '2011',
    judul: 'The Best Humanitarian NGO',
    keterangan:
      'Meraih (The Best Humanitarian NGO) pada acaraThe International Conference on Family of The Islamic World yang diselenggarakan The Union NGOs of The Islamic World (UNIW) tanggal 7-8 Mei 2011.'
  },
  {
    tahun: '2011',
    judul: 'Platinum bidang Konsumen',
    keterangan:
      'Pada 15 Desember 2011, Human Initiative mendukung Program Gizi Kita dan Program Ayo Melek Gizi yang mendorong PT. Sarihusada Generasi Mahardhika meraih Penghargaan Platinum bidang Konsumen Indonesian CSR Awards 2011 untuk sektor industri dan manufaktur.'
  },
  {
    tahun: '2012',
    judul: 'Penghargaan dari BNPB',
    keterangan:
      'Eko Sulistio, Disaster Risk Management Human Initiative mendapatkan penghargaan dari BADAN SAR NASIONAL atas partisipasinya dalam penanganan korban kecelakaan Pesawat Sukhoi SJ100 di kawasan Gunung Salak Bogor, Jawa Barat Mei 2012.'
  },
  {
    tahun: '2012',
    judul: "Finalis Program MDG's Award",
    keterangan:
      "Finalis Program MDG's Award Tahun 2012 dalam Program Pondok Sagita (Sadar Gizi Ibu dan Balita)."
  },
  {
    tahun: '2013',
    judul: 'Sincerest Appreciation',
    keterangan:
      'Sincerest Appreciation to Human Initiative in the commemoration of World Humanitarian Day 2013 in Indonesia from UN OCHA (UN Office for The Coordination Humanitarian Affairs) Indonesia.'
  },
  {
    tahun: '2018',
    judul: 'Penghargaan dari BNPB',
    keterangan:
      'Penghargaan dari BNPB karena dinilai telah berjasa mendukung Pemerintah dalam penanggulangan bencana, 2018.'
  },
  {
    tahun: '2006-2018',
    judul: 'Program Ekspedisi Nusantara',
    keterangan:
      'Terbit Undang - Undang tentang Pengelolaan Zakat yang mengubah tata kelola organisasi secara internal.'
  }
];

interface Story {
  year: string;
  img: string;
  description: string;
}

const stories: Story[] = [
  {
    year: '1999',
    img: '/A4 - Philosophical Walk IF 24 (1)-01.jpg',
    description:
      'Human Initiative was established to manage humanitarian aids for various crisis occurring in Indonesia.'
  },
  {
    year: '2001',
    img: '/A4 - Philosophical Walk IF 24 (1)-02.jpg',
    description:
      'Human Initiative was designated as a National Zakat Charity Institution.​'
  },
  {
    year: '2005',
    img: '/A4 - Philosophical Walk IF 24 (1)-03.jpg',
    description:
      'Managing humanitarian aid and programs for the victims of the Aceh Tsunami, which was five times larger in volume than the previous one.​'
  },
  {
    year: '2008',
    img: '/A4 - Philosophical Walk IF 24 (1)-04.jpg',
    description:
      'Registered at the United Nations as an NGO with Special Consultative Status with the Economic Social Council.​'
  },
  {
    year: '2010',
    img: '/A4 - Philosophical Walk IF 24 (1)-05.jpg',
    description:
      'Appointed as a National Social Organization and registered as a partner institution in the European Union for social programs.​'
  },
  {
    year: '2012',
    img: '/A4 - Philosophical Walk IF 24 (1)-06.jpg',
    description:
      'The Law on Zakat Management was issued, changing organizational governance internally.​'
  },
  {
    year: '2016',
    img: '/A4 - Philosophical Walk IF 24 (1)-07.jpg',
    description:
      'The spin-off and name change to Human Initiative, which focuses on humanitarian programs and no longer manages zakat, infaq, and sadaqah.​'
  }
];

interface Branch {
  negara: string;
  namacabang: string;
  jeniskantor: string;
  alamat: string;
}

const branch: Branch[] = [
  {
    negara: 'Indonesia',
    namacabang: 'Kantor Pusat',
    jeniskantor: 'Operasional',
    alamat: 'Jl. Anggrek, Curug, Kec. Cimanggis, Kota Depok, Jawa Barat 16453'
  },
  {
    negara: 'Indonesia',
    namacabang: 'Kantor Pusat',
    jeniskantor: 'Administratif',
    alamat:
      'Jl. Raya Condet No.27-G Kelurahan Batu Ampar Kecamatan Kramat jati Kota Jakarta Timur Daerah Khusus Jakarta 13520'
  },
  {
    negara: 'Indonesia ',
    namacabang: 'KCP Bontang',
    jeniskantor: 'Operasional',
    alamat:
      'Jln HM Ardhan RT 25 Pisangan Kelurahan Satimpo – Bontang Selatan Kota Bontang Kalimantan Timur'
  },
  {
    negara: 'Indonesia',
    namacabang: 'Human Initiative Bengkulu',
    jeniskantor: 'Operasional',
    alamat:
      'Jl Merapi Raya No. 64 Kel panorama Kec. Singaran Pati Kota Bengkulu 38226'
  },
  {
    negara: 'Indonesia',
    namacabang: 'Human Initiative Sulawesi Selatan',
    jeniskantor: 'Operasional',
    alamat:
      'Jl. Puri Tata Indah No.36 Palace, Blok A, Parang Tambung, Kec. Tamalate, Kota Makassar, Sulawesi Selatan 90224'
  },
  {
    negara: 'Indonesia',
    namacabang: 'Human Initiative Riau',
    jeniskantor: 'Operasional',
    alamat:
      'Jalan Paus Ujung No. 1B, Simpang Arifin Ahmad Tangkerang Barat, Kec. Marpoyan Damai Pekanbaru 28125'
  },
  {
    negara: 'Indonesia',
    namacabang: 'Human Initiative Kalimantan Timur',
    jeniskantor: 'Operasional',
    alamat:
      'Balikpapan Baru Cluster Toronto Blok JA6, Damai, Kecamatan Balikpapan Selatan, Kota Balikpapan, Kalimantan Timur 76114'
  },
  {
    negara: 'Indonesia',
    namacabang: 'Human Initiative Bukittinggi',
    jeniskantor: 'Operasional',
    alamat: 'Jalan Hafid Jalil, RT 03/RW 01 Birugo Bukittinggi 26181'
  },
  {
    negara: 'Indonesia',
    namacabang: 'Human Initiative Jawa Timur',
    jeniskantor: 'Operasional',
    alamat:
      'Jalan Ngagel Madya VIII no. 32, Baratajaya, Gubeng, Surabaya, Jawa Timur, 60284'
  },
  {
    negara: 'Indonesia',
    namacabang: 'Human Initiative Sumatera Barat',
    jeniskantor: 'Operasional',
    alamat:
      'alan By Pass, Kayu Gadang RT/RW 04/06 (Belakang Masjid Taufiq), Kel. Pasar Ambacang, Kec. Kuranji, Padang 25152'
  },
  {
    negara: 'Indonesia',
    namacabang: 'Human Initiative Daerah Istimewa Yogyakarta',
    jeniskantor: 'Operasional',
    alamat:
      'Jl. Bangirejo Taman No.9, Karangwaru, Kec. Tegalrejo, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55241'
  },
  {
    negara: 'Indonesia',
    namacabang: 'Human Initiative Sumatera Utara',
    jeniskantor: 'Operasional',
    alamat:
      'Jalan Kenanga Raya No. 22, Kel. Tanjung Sari Kec. Medan Selayang, 20132'
  },
  {
    negara: 'Indonesia',
    namacabang: 'Human Initiative Jawa Tengah',
    jeniskantor: 'Operasional',
    alamat: 'Jalan Setiabudi No. 70, Semarang 50269'
  },
  {
    negara: 'Indonesia',
    namacabang: 'Human Initiative Aceh',
    jeniskantor: 'Operasional',
    alamat: 'Jalan Reformasi, Desa Santan, Kec. Ingin Jaya, Aceh Besar 23371'
  },
  {
    negara: 'Indonesia',
    namacabang: 'Human Initiative Maluku',
    jeniskantor: 'Operasional',
    alamat:
      'Jalan Kebun Cengkeh Komp. BTN Manusela Blok B/5-6, Lt. 2, Desa Batu Merah Kec, Sirimau, Ambon 97128'
  },
  {
    negara: 'Indonesia',
    namacabang: 'Human Initiative Jawa Barat',
    jeniskantor: 'Operasional',
    alamat: 'Jalan Cikutra No.138, Bandung 40124'
  },
  {
    negara: 'Australia',
    namacabang: 'Human Initiative Australia',
    jeniskantor: 'Operasional',
    alamat: '30 Australis Dr, Ropes Crossing NSW 2760, Australia'
  },
  {
    negara: 'Inggris',
    namacabang: 'Human Initiative United Kingdom',
    jeniskantor: 'Operasional',
    alamat: '112 Waverley Rd, Harrow HA2 9RE, UK'
  },
  {
    negara: 'Korea Selatan',
    namacabang: 'Human Initiative Korea Selatan',
    jeniskantor: 'Operasional',
    alamat: 'Busan Indonesia Center 3rd Floor 1900 Geumgok-dong Buk-gu, Busan'
  },
  {
    negara: 'Japan',
    namacabang: 'Human Initiative Japan',
    jeniskantor: 'Operasional',
    alamat: 'Tokyo, Setagaya, Kitami 9-18-25, Japan'
  },
  {
    negara: 'Europe',
    namacabang: 'Human Initiative Europe',
    jeniskantor: 'Operasional',
    alamat:
      'Human Initiative Europe e.V. | Bei den Mühren 1, 20457 Hamburg, Germany'
  },
  {
    negara: 'Representatif',
    namacabang: 'REPRESENTATIF',
    jeniskantor: 'Operasional',
    alamat:
      'Amerika, Arab Saudi, Belanda, Denmark, Jerman, Jepang, Kuwait, Malaysia, Maroko, Singapura, Qatar, Taiwan, Turki dan Uni Emirat Arab.'
  }
];

const slideStories = {
  className: 'center',
  focusOnSelect: true,
  centerMode: true,
  infinite: true,
  variableWidth: true,
  adaptiveHeight: true,
  centerPadding: '60px',
  autoplay: true,
  slidesToShow: 1,
  speed: 500
};

const WhoWeAre = () => {
  const t = useTranslations();
  const wordFlips = ['build', 'develope'];
  const [selectedBranchType, setSelectedBranchType] = useState<string>('Pusat');

  useEffect(() => {
    AOS.init();
  }, []);

  const filteredBranches = branch.filter((b) => {
    if (selectedBranchType === 'Pusat') return b.namacabang === 'Kantor Pusat';
    if (selectedBranchType === 'Cabang Indonesia')
      return b.negara === 'Indonesia' && b.namacabang !== 'Kantor Pusat';
    if (selectedBranchType === 'Cabang Luar Indonesia')
      return b.negara !== 'Indonesia';
    return false;
  });
  return (
    <main className="flex flex-col sm:py-24 py-6 sm:pt-28 pt-24 dark:bg-slate-950 bg-white">
      <section className="flex flex-col sm:pt-16 pt-0 sm:px-24 px-6 dark:bg-slate-950 bg-white">
        <div
          data-aos="fade-up"
          data-aos-duration="700"
          className="flex flex-row gap-x-12 justify-center items-end pb-20"
        >
          <h5 className="text-slate-800 dark:text-slate-300 text-5xl font-semibold sm:w-full w-full leading-tight">
            {t('whoWeArePage.sectionOne.titleWe')}{' '}
            <FlipWords
              words={wordFlips}
              className="text-sky-500 dark:text-sky-600"
            />
            {t('whoWeArePage.sectionOne.titlleEnd')}
            <span className="text-slate-500 dark:text-400 pl-3">
              {t('whoWeArePage.sectionOne.titleEndTwo')}
            </span>
          </h5>
          {/* <p className="sm:w-2/5 w-full text-base font-normal pr-12">
            Kenali visi dan misi kami, temui manajemen, kisah perjalanan,
            penghargaan, keabsahan hukum, dampak yang telah tercipta, dan
            cabang-cabang kami. Bersama, mari terus menciptakan perubahan
            positif.
          </p> */}
        </div>
      </section>
      <section className="flex flex-col w-full h-[900px] sm:px-0 px-6">
        <div className="h-[1200px] bg-gradient-to-b from-blue-500 to-white">
          <Image
            src="/02 Psikososial.jpeg"
            width={2400}
            height={1000}
            alt="Who We Are Human Initiative"
            className="w-full h-[900px] bg-cover bg-center"
          />
        </div>
      </section>
      <section className="relative flex sm:flex-row sm:gap-x-12 flex-col justify-center items-center sm:gap-y-16 gap-y-10 sm:py-28 py-14 sm:px-28 px-6 dark:bg-slate-950 bg-white">
        <div className="sm:w-1/2 w-full flex flex-col justify-start items-start gap-y-10 text-left">
          <h5
            className="text-slate-700 dark:text-white font-semibold sm:text-5xl text-xl"
            data-aos="fade-up"
            data-aos-duration="400"
          >
            {t('whoWeArePage.sectionTwo.title')}
          </h5>
          <div className="flex flex-col justify-center items-center gap-y-4">
            <p
              className="text-slate-500 dark:text-slate-200 font-normal sm:text-base text-base"
              data-aos="fade-up"
              data-aos-duration="700"
            >
              {t('whoWeArePage.sectionTwo.descone')}
            </p>
            <p
              className="text-slate-500 dark:text-slate-200 font-normal sm:text-base text-base"
              data-aos="fade-up"
              data-aos-duration="700"
            >
              {t('whoWeArePage.sectionTwo.desctwo')}
            </p>
            <p
              className="text-slate-500 dark:text-slate-200 font-normal sm:text-base text-base"
              data-aos="fade-up"
              data-aos-duration="700"
            >
              {t('whoWeArePage.sectionTwo.descthree')}
            </p>
          </div>
        </div>
        <div
          className="sm:w-1/2 w-full dark:hidden flex flex-col w-full justify-center items-center gap-y-16"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          <Image
            src="/Peta (Light).png"
            alt="Maps Human Initiatiative"
            width={1052}
            height={653}
          />
        </div>
        <div
          className="sm:w-1/2 w-full hidden dark:block flex flex-col w-full justify-center items-center gap-y-16"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          <Image
            src="/Peta (Dark).png"
            alt="Maps Human Initiatiative"
            width={1052}
            height={653}
            className="w-full bg-cover"
          />
        </div>
      </section>
      <section className="relative flex flex-col sm:gap-y-16 gap-y-10 sm:py-28 py-14 sm:px-28 px-6 dark:bg-slate-950 bg-white">
        <div className="bg-dot-thick-sky-600 dark:bg-dot-thick-sky-600 absolute w-[100px] h-[70px] left-0 top-0"></div>
        <div className="bg-dot-thick-sky-600 dark:bg-dot-thick-sky-600 absolute w-[100px] h-[70px] right-0 bottom-0"></div>
        <div className="flex flex-row justify-start items-center gap-x-10">
          <h5
            className="text-slate-700 dark:text-white font-semibold sm:text-6xl text-xl"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {t('whoWeArePage.sectionThree.titleOur')}{' '}
            <span className="text-sky-600">
              {t('whoWeArePage.sectionThree.titleVisions')}
            </span>
          </h5>
          <p
            className="text-slate-600 dark:text-white font-medium sm:text-3xl text-base"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            {t('whoWeArePage.sectionThree.descOne')}
          </p>
        </div>
        <div className="flex flex-row gap-x-16">
          <div
            className="w-1/4 h-[180px] rounded-xl object-cover object-center"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="2000"
          >
            <Image
              src="/IMG_8069.JPG"
              width={500}
              height={500}
              alt="misi Human Initiative"
              className="w-full rounded-lg object-cover h-full"
            />
          </div>
          <div
            className="w-1/4 h-[180px] rounded-xl object-cover object-center"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="2500"
          >
            <Image
              src="/DSC05047.JPG"
              width={500}
              height={500}
              alt="misi Human Initiative"
              className="w-full rounded-lg object-cover h-full"
            />
          </div>
          <div
            className="w-1/4 h-[180px] rounded-xl object-cover object-center"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="3000"
          >
            <Image
              src="/WhatsApp Image 2025-03-12 at 4.40.21 PM.jpeg"
              width={500}
              height={500}
              alt="misi Human Initiative"
              className="w-full rounded-lg object-cover h-full"
            />
          </div>
          <div
            className="w-1/4 h-[180px] rounded-xl object-cover object-center"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="3500"
          >
            <Image
              src="/DSC_1030.JPG"
              width={500}
              height={500}
              alt="misi Human Initiative"
              className="w-full rounded-lg object-cover h-full"
            />
          </div>
        </div>
      </section>
      <section className="flex flex-row sm:gap-x-16 gap-x-10 sm:py-24 py-10 sm:px-28 px-6 dark:bg-slate-950 bg-sky-50">
        <div className="flex flex-col justify-center items-start gap-y-10 w-1/2">
          <h5
            className="text-slate-700 dark:text-white font-semibold text-6xl"
            data-aos="fade-up"
            data-aos-duration="300"
          >
            {t('whoWeArePage.sectionFour.titleOur')}{' '}
            <span className="text-sky-600">
              {t('whoWeArePage.sectionFour.titleMissions')}
            </span>
          </h5>
          <div className="flex flex-col gap-y-16">
            <div className="flex flex-row gap-x-8">
              <span className="" data-aos="fade-up" data-aos-duration="300">
                <Building className="w-16 h-16 text-sky-400 stroke-1" />
              </span>
              <div className="flex flex-col gap-y-2">
                <h5
                  className="text-slate-800 dark:text-white font-semibold text-xl"
                  data-aos="fade-up"
                  data-aos-duration="400"
                >
                  {t('whoWeArePage.sectionFour.titleOrganization')}
                </h5>
                <p
                  className="text-slate-600 dark:text-white font-normal text-base"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  {t('whoWeArePage.sectionFour.descOrganization')}
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-x-8">
              <span className="" data-aos="fade-right" data-aos-duration="900">
                <AlignVerticalDistributeCenter className="w-16 h-16 text-sky-400 stroke-1" />
              </span>
              <div className="flex flex-col gap-y-2">
                <h5
                  className="text-slate-800 dark:text-white font-semibold text-xl"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  {t('whoWeArePage.sectionFour.titleResource')}
                </h5>
                <p
                  className="text-slate-600 dark:text-white font-normal text-base"
                  data-aos="fade-up"
                  data-aos-duration="1100"
                >
                  {t('whoWeArePage.sectionFour.descResource')}
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-x-8">
              <span className="" data-aos="fade-right" data-aos-duration="1400">
                <Slack className="w-16 h-16 text-sky-400 stroke-1" />
              </span>
              <div className="flex flex-col gap-y-2">
                <h5
                  className="text-slate-800 dark:text-white font-semibold text-xl"
                  data-aos="fade-up"
                  data-aos-duration="1500"
                >
                  {t('whoWeArePage.sectionFour.titleImpact')}
                </h5>
                <p
                  className="text-slate-600 dark:text-white font-normal text-base"
                  data-aos="fade-up"
                  data-aos-duration="1600"
                >
                  {t('whoWeArePage.sectionFour.descImpact')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-x-16">
          <Image
            src="/DSC00841.JPG"
            width={500}
            height={500}
            alt="misi Human Initiative"
            className="w-full rounded-lg object-cover"
            data-aos="fade-up"
            data-aos-duration="700"
          />
        </div>
      </section>
      <section className="relative flex flex-col sm:gap-y-16 gap-y-10 sm:py-28 py-14 sm:px-28 px-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-row justify-start items-center gap-x-10">
          <div className="w-1/2 ">
            <Image
              src="/DSC00794 (1).jpg"
              alt="Positioning Organizations Human Initiative"
              width={800}
              height={800}
              className="w-full h-full rounded-2xl"
              data-aos="fade-up"
              data-aos-duration="700"
            />
          </div>
          <div className="flex w-1/2 flex-col gap-y-10">
            <h5
              className="text-slate-700 dark:text-white font-semibold sm:text-4xl text-xl"
              data-aos="fade-up"
              data-aos-duration="700"
            >
              {t('whoWeArePage.sectionFive.titleOrganizational')}{' '}
              <span className="text-sky-600">
                {t('whoWeArePage.sectionFive.titleCulture')}
              </span>
            </h5>
            <div className="grid grid-cols-3">
              <div
                className="flex flex-col gap-y-6"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <span className="w-full">
                  <DatabaseZap className="text-slate-800 dark:text-slate-200" />
                </span>
                <h5 className="text-sky-800 dark:text-sky-600 text-base font-normal ">
                  {t('whoWeArePage.sectionFive.titleEmpowered')}
                </h5>
              </div>
              <div
                className="flex flex-col gap-y-6"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <span className="w-full">
                  <HeartHandshake className="text-slate-800 dark:text-slate-200" />
                </span>
                <h5 className="text-sky-800 dark:text-sky-600 text-base font-normal ">
                  {t('whoWeArePage.sectionFive.titleCollaboration')}
                </h5>
              </div>
              <div
                className="flex flex-col gap-y-6"
                data-aos="fade-up"
                data-aos-duration="1200"
              >
                <span className="w-full">
                  <SunSnow className="text-slate-800 dark:text-slate-200" />
                </span>
                <h5 className="text-sky-800 dark:text-sky-600 text-base font-normal ">
                  {t('whoWeArePage.sectionFive.titleTrustworthy')}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative flex flex-col sm:gap-y-16 gap-y-10 sm:py-28 py-14 sm:px-28 px-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-row justify-start items-center gap-x-10">
          <div className="flex w-1/2 flex-col gap-y-8">
            <h5
              className="text-slate-700 dark:text-white font-semibold sm:text-4xl text-xl"
              data-aos="fade-up"
              data-aos-duration="700"
            >
              {t('whoWeArePage.sectionSix.titleOrganizations')}{' '}
              <span className="text-sky-600">
                {t('whoWeArePage.sectionSix.titlePositioning')}
              </span>
            </h5>
            <p
              className="text-p-16 text-slate-800 dark:text-slate-200"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              {t('whoWeArePage.sectionSix.desc')}
            </p>
          </div>
          <div className="w-1/2 ">
            <Image
              src="/DSC00796.jpg"
              alt="Positioning Organizations Human Initiative"
              width={800}
              height={800}
              className="w-full h-full rounded-2xl"
              data-aos="fade-up"
              data-aos-duration="700"
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col sm:gap-y-16 gap-y-10 sm:py-[150px] py-10 sm:px-24 px-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-col justify-center items-center gap-y-10 w-full">
          <h5
            className="text-slate-700 text-center w-full dark:text-white font-semibold text-5xl"
            data-aos="fade-up"
            data-aos-duration="700"
          >
            {t('whoWeArePage.sectionSeven.titleMeet')}{' '}
            <span className="text-sky-600">
              {t('whoWeArePage.sectionSeven.titleManagement')}
            </span>
          </h5>
          <p
            className="text-slate-600 dark:text-white font-normal text-base text-center"
            data-aos="fade-up"
            data-aos-duration="900"
          >
            {t('whoWeArePage.sectionSeven.desc')}
          </p>
        </div>
        <div className="flex flex-row gap-x-16">
          {teams.map((teams, index) => (
            <div
              key={index}
              className="w-1/4 flex flex-col gap-y-4"
              data-aos="fade-up"
              data-aos-duration="700"
            >
              <div className="">
                <Image
                  src={teams.image}
                  width={500}
                  height={500}
                  alt={teams.nama}
                  className="w-full h-[410px] rounded-lg object-cover object-top"
                />
              </div>
              <h5 className="text-sky-600 dark:text-white text-2xl font-semibold">
                {teams.nama}
              </h5>
              <p className="text-slate-500 dark:text-slate-300 text-base">
                {teams.jabatan}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col justify-center items-center sm:gap-y-16 gap-y-10 sm:py-16 py-10 sm:px-24 px-6 dark:bg-slate-950 bg-white w-full">
        <div className="flex flex-col justify-center items-center gap-y-6 w-full">
          <h5
            className="text-slate-700 text-center dark:text-white font-semibold text-5xl"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <span className="text-sky-600">
              {t('whoWeArePage.sectionEight.title')}
            </span>
          </h5>
          <p
            className="text-slate-700 dark:text-white font-normal text-lg text-center"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            {t('whoWeArePage.sectionEight.desc')}
          </p>
        </div>
        <div
          className="slider-container"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <Slider {...slideStories}>
            {stories.map((story, index) => (
              <div
                key={index}
                className="slide-stories inline-block py-4 w-[500px]"
              >
                <div className="slide-content flex sm:flex-row sm:gap-x-10 flex-col gap-y-8 w-full h-[200px]">
                  <span className="w-[260px] h-[260px] rounded-3xl">
                    <Image
                      src={story.img}
                      alt={story.year}
                      width={400}
                      height={400}
                      className="w-full h-full rounded-3xl object-cover"
                    />
                  </span>
                  <h3 className="flex-1 text-lg font-medium text-slate-600 bg-slate-200 dark:bg-slate-700 dark:text-white py-3 px-6 rounded-t-3xl rounded-r-3xl rounded-b-none rounded-tl-3xl">
                    {story.description}
                  </h3>
                </div>
                <div className="slide-border-year mt-[96px] pt-[32px] relative border-t-[3px] border-solid h-max border-slate-300">
                  <time className="mb-1 text-3xl font-semibold leading-none text-slate-400">
                    {story.year}
                  </time>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <section className="relative flex flex-col sm:gap-y-16 gap-y-10 sm:py-24 py-10 sm:px-24 px-6 dark:bg-slate-900 bg-slate-200 mx-4 rounded-3xl">
        <div className="flex flex-row justify-center items-center gap-x-6 w-full">
          <h5 className="text-slate-700 text-center dark:text-white font-semibold text-5xl">
            <span className="text-gray-800 dark:text-sky-600">
              {t('whoWeArePage.sectionNine.title')}
            </span>
          </h5>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {awards.map((award, index) => (
            <div
              key={index}
              className="custom-spotlight-card flex flex-col relative gap-y-4 p-6 rounded-xl border border-solid border-slate-400 dark:border-slate-800 bg-gray-900 dark:bg-gray-950"
            >
              <span className="absolute right-4">
                <FaTrophy className="text-amber-300 dark:text-amber-300 text-4xl w-8 h-8 font-light" />
              </span>
              <h5 className="text-white text-3xl font-bold">{award.tahun}</h5>
              <h4 className="text-sky-500 text-lg font-semibold leading-6">
                {award.judul}
              </h4>
              <p className="text-slate-300 text-sm">{award.keterangan}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="relative flex flex-col sm:gap-y-16 gap-y-10 sm:py-28 py-14 sm:px-28 px-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-col justify-start items-center gap-y-12">
          <div className="flex w-[1000px] flex-col gap-y-8">
            <h5 className="text-slate-700 dark:text-white font-semibold sm:text-4xl text-xl">
              {t('whoWeArePage.sectionTen.titleOur')}{' '}
              <span className="text-sky-600">
                {t('whoWeArePage.sectionTen.titleLegality')}
              </span>
            </h5>
          </div>
          <Tabs defaultValue="terdaftar" className="w-[1000px]">
            <TabsList className="grid w-full grid-cols-4 gap-4">
              <TabsTrigger value="terdaftar">
                {t('whoWeArePage.sectionTen.tabOne')}
              </TabsTrigger>
              <TabsTrigger value="anggota">
                {t('whoWeArePage.sectionTen.tabTwo')}
              </TabsTrigger>
              <TabsTrigger value="standarisasi">
                {t('whoWeArePage.sectionTen.tabThree')}
              </TabsTrigger>
              <TabsTrigger value="manajemenmutu">
                {t('whoWeArePage.sectionTen.tabFour')}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="terdaftar">
              <div className="grid grid-cols-3 gap-10 py-6">
                <div className="flex flex-row gap-x-4 border border-solid border-slate-300 dark:border-slate-400 bg-slate-200 dark:bg-slate-800 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (7).png"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 dark:text-slate-200 text-base font-normal">
                    Akta Notaris Pendirian Yayasan No. 9 10 Desember 1999
                  </h5>
                </div>
                <div className="flex flex-row gap-x-4 border border-solid border-slate-300 dark:border-slate-400 bg-slate-200 dark:bg-slate-800 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (2).jpg"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 dark:text-slate-200 text-base font-normal">
                    Kementerian Sosial Republik Indonesia No. Registrasi
                    310/5/PI.02/06/2022
                  </h5>
                </div>
                <div className="flex flex-row gap-x-4 border border-solid border-slate-300 dark:border-slate-400 bg-slate-200 dark:bg-slate-800 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (6).png"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 dark:text-slate-200 text-base font-normal">
                    Perserikatan Bangsa-Bangsa bidang Special Consultative
                    Status with the Economic and Social Council
                  </h5>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="anggota">
              <div className="grid grid-cols-3 gap-10 py-6">
                <div className="flex flex-row gap-x-4 border border-solid border-slate-300 dark:border-slate-400 bg-slate-200 dark:bg-slate-800 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (5).png"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 dark:text-slate-200 text-base font-normal">
                    HFI (Humanitarian Forum Indonesia)
                  </h5>
                </div>
                <div className="flex flex-row gap-x-4 border border-solid border-slate-300 dark:border-slate-400 bg-slate-200 dark:bg-slate-800 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (1).webp"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 dark:text-slate-200 text-base font-normal">
                    Perhimpunan Filantropi Indonesia
                  </h5>
                </div>
                <div className="flex flex-row gap-x-4 border border-solid border-slate-300 dark:border-slate-400 bg-slate-200 dark:bg-slate-800 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (1).gif"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 dark:text-slate-200 text-base font-normal">
                    Network for Empowered Aid Response (NEAR)
                  </h5>
                </div>
                <div className="flex flex-row gap-x-4 border border-solid border-slate-300 dark:border-slate-400 bg-slate-200 dark:bg-slate-800 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (3).png"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 dark:text-slate-200 text-base font-normal">
                    ICVA (International Council of Voluntary Agencies)
                  </h5>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="standarisasi">
              <div className="grid grid-cols-3 gap-10 py-6">
                <div className="flex flex-row gap-x-4 border border-solid border-slate-300 dark:border-slate-400 bg-slate-200 dark:bg-slate-800 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (1).jpg"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 dark:text-slate-200 text-base font-normal">
                    Sphere International
                  </h5>
                </div>
                <div className="flex flex-row gap-x-4 border border-solid border-slate-300 dark:border-slate-400 bg-slate-200 dark:bg-slate-800 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (1).webp"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 dark:text-slate-200 text-base font-normal">
                    PSEA International
                  </h5>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="manajemenmutu">
              <div className="grid grid-cols-3 gap-10 py-6">
                <div className="flex flex-row gap-x-4 border border-solid border-slate-300 dark:border-slate-400 bg-slate-200 dark:bg-slate-800 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (2).png"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 dark:text-slate-200 text-base font-normal">
                    TUV Nord Indonesia
                  </h5>
                </div>
                <div className="flex flex-row gap-x-4 border border-solid border-slate-300 dark:border-slate-400 bg-slate-200 dark:bg-slate-800 rounded-xl px-4 py-6">
                  <span className="w-32 h-full">
                    <Image
                      src="/legality (1).png"
                      alt="Human Initiative"
                      width={80}
                      height={70}
                      className="w-32"
                    />
                  </span>
                  <h5 className="text-slate-600 dark:text-slate-200 text-base font-normal">
                    Komisi Akreditasi Indonesia
                  </h5>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <section className="flex flex-col sm:gap-y-16 gap-y-10 sm:py-24 py-10 sm:px-24 px-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-row justify-center items-center gap-x-6 w-full">
          <h5 className="text-slate-700 text-center dark:text-white font-semibold text-5xl">
            <span className="text-sky-600">
              {t('whoWeArePage.sectionEleven.titleBranch')}
            </span>
          </h5>
        </div>
        <div>
          <div className="flex space-x-4 justify-center items-center mb-8">
            <button
              className={`px-4 py-2 rounded-2xl text-sm font-medium ${
                selectedBranchType === 'Pusat'
                  ? 'bg-sky-600 dark:bg-sky-500 text-white transition-color ease-in duration-500'
                  : 'dark:bg-slate-950 dark:text-white text-sky-600 border border-solid border-white bg-white hover:border hover:border-solid hover:border-sky-500'
              }`}
              onClick={() => setSelectedBranchType('Pusat')}
            >
              {t('whoWeArePage.sectionEleven.tabOne')}
            </button>
            <button
              className={`px-4 py-2 rounded-2xl text-sm font-medium ${
                selectedBranchType === 'Cabang Indonesia'
                  ? 'bg-sky-600 dark:bg-sky-500 text-white transition-color ease-in duration-500'
                  : 'dark:bg-slate-950 dark:text-white text-sky-600 border border-solid border-white bg-white hover:border hover:border-solid hover:border-sky-500'
              }`}
              onClick={() => setSelectedBranchType('Cabang Indonesia')}
            >
              {t('whoWeArePage.sectionEleven.tabTwo')}
            </button>
            <button
              className={`px-4 py-2 rounded-2xl text-sm font-medium ${
                selectedBranchType === 'Cabang Luar Indonesia'
                  ? 'bg-sky-600 dark:bg-sky-500 text-white transition-color ease-in duration-500'
                  : 'dark:bg-slate-950 dark:text-white text-sky-600 border border-solid border-white bg-white hover:border hover:border-solid hover:border-sky-500'
              }`}
              onClick={() => setSelectedBranchType('Cabang Luar Indonesia')}
            >
              {t('whoWeArePage.sectionEleven.tabThree')}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {filteredBranches.map((b, index) => (
              <div
                key={index}
                className="shadow-sm hover:shadow-2xl px-4 mb-4 py-4 bg-white dark:bg-slate-900 border-b-2 border-slate-300 transition-all ease-in duration-200 rounded-t-sm"
              >
                <h3 className="text-sky-700 font-semibold text-base leading-6 pb-4">
                  {b.namacabang} {b.jeniskantor}
                </h3>
                <p className="h-[70px] overflow-hidden text-sm text-slate-600 dark:text-slate-200">
                  {b.alamat}
                </p>
                <p className="text-sky-700 text-lg font-semibold flex flex-row justify-between">
                  <MapPinned className="text-sky-300" />
                  {b.negara}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-col sm:gap-y-16 gap-y-10 sm:py-24 py-10 sm:px-[240px] px-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-row gap-x-24">
          <div className="flex flex-col gap-y-3 w-1/2">
            <h6 className="text-sky-600 text-base font-normal">
              {t('whoWeArePage.sectionTwelve.title')}
            </h6>
            <h5 className="text-slate-800 dark:text-slate-200 text-2xl font-medium">
              {t('whoWeArePage.sectionTwelve.desc')}
            </h5>
            <p className="text-slate-400 dark:text-slate-100 text-base">
              {t('whoWeArePage.sectionTwelve.pdesc')}
            </p>
            <div className="flex flex-col gap-y-8 mt-8">
              <div className="flex flex-row gap-x-4">
                <span className="w-10">
                  <Phone className="text-sky-500 text-lg" />
                </span>
                <h6 className="text-slate-600 dark:text-white text-base font-normal">
                  (021) 21287213
                </h6>
              </div>
              <div className="flex flex-row gap-x-4">
                <span className="w-10">
                  <Mail className="text-sky-500 text-lg" />
                </span>
                <h6 className="text-slate-600 dark:text-white text-base font-normal">
                  Human Initiative
                </h6>
              </div>
              <div className="flex flex-row gap-x-4">
                <span className="w-10">
                  <Instagram className="text-sky-500 text-lg" />
                </span>
                <h6 className="text-slate-600 dark:text-white text-base font-normal">
                  humaninitiative_id
                </h6>
              </div>
            </div>
          </div>
          <div className="bg-slate-100 w-1/2 dark:bg-slate-700 py-8 px-4">
            <form action="" className="flex flex-col w-full gap-y-6">
              <input
                type="text"
                className="w-full border border-slate-200 dark:border-slate-400 text-slate-200 dark:text-slate-400 p-3 rounded-0"
                placeholder="Nama"
              />
              <input
                type="email"
                className="w-full border border-slate-200 dark:border-slate-400 text-slate-200 dark:text-slate-400 p-3 rounded-0"
                placeholder="Email"
              />
              <input
                type="text"
                className="w-full border border-slate-200 dark:border-slate-400 text-slate-200 dark:text-slate-400 p-3 rounded-0"
                placeholder="Subject"
              />
              <input
                type="text"
                className="w-full border border-slate-200 dark:border-slate-400 text-slate-200 dark:text-slate-400 p-3 rounded-0"
                placeholder="Message"
              />
              <button
                type="submit"
                className="bg-sky-600 text-white dark:bg-slate-500 dark:text-slate-100 w-full py-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WhoWeAre;
