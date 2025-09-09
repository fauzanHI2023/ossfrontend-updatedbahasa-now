'use client';
import React, {useState, useEffect, CSSProperties} from 'react';
import Link from 'next/link';
import {
  HandCoins,
  SmilePlus,
  HeartHandshake,
  NotepadText,
  Repeat,
  ClipboardCheck,
  MoveRight
} from 'lucide-react';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import PopupNotif from '@/components/ui/utility/PopupNotif';
import {motion, AnimatePresence} from 'framer-motion';
import {CalendarPicker} from '@/components/ui/utility/calendar/Calendar';
import {Button} from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs-fe';
import {ExpandableCardDemo} from '@/components/ui/cardback';
import BannerCarousel from '@/components/ui/banner/BannerWithUs';
import {useQuery, useMutation} from '@tanstack/react-query';
import {fetchListProject} from '@/lib/project/auth-list-program';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HashLoader from 'react-spinners/HashLoader';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {postAppointment} from '@/lib/project/auth-post-appoinment';
import Swal from 'sweetalert2';
import MapWithSearch, {
  PlaceResult
} from '@/components/ui/utility/maps/MapsWithSearchBar';
import ScrollingCards from '@/components/ui/utility/ScrollingCard';
import {usePagination} from '@/hooks/usePagination';
import NewsCollaborate from '@/components/ui/joinourmovement/NewsCollaborate';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red'
};

interface ProjectList {
  id: string;
  title: string;
  program_name: string;
  project_description: string;
  project_goal: string;
  project_scope: string;
  currency: string;
  amount: number;
  quantity: number;
  files: string;
}

const CSRServices = () => {
  const [notifMessage, setNotifMessage] = useState('');
  const [showCollab, setShowCollab] = useState(true);
  const [color, _setColor] = useState('#209ce2');
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [place, setPlace] = useState<PlaceResult | null>(null);
  const [placeText, setPlaceText] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const {data: session, status}: any = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [placeOption, setPlaceOption] = useState('');
  const itemsPerPage = 8;
  const maxVisiblePages = 5;
  const {
    currentPage,
    setCurrentPage,
    paginate,
    totalPages,
    getVisiblePageNumbers
  } = usePagination(itemsPerPage, maxVisiblePages);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.phpDonorData?.length > 0) {
      setUserId(session.user.phpDonorData[0].guid);
      console.log('User ID diperbarui:', session.user.phpDonorData[0].guid);
    }
  }, [status, session]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCollab((prev) => !prev);
    }, 7000); // Ubah setiap 5 detik

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  const {
    data: proposalprograms = [],
    isLoading,
    error
  } = useQuery<ProjectList[], Error>({
    queryKey: ['proposalprograms'],
    queryFn: fetchListProject
  });

  const formatPrice = (amount: number) => {
    return `Rp ${Number(amount)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  const mutation = useMutation({
    mutationFn: postAppointment,
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Add Appointment Successfuly!',
        timer: 2000,
        showConfirmButton: false
      });
    },
    onError: (error) => {
      console.error('Error creating appointment:', error);
      setNotifMessage('Gagal membuat appointment');
    }
  });

  const handleSubmitAppointment = ({
    programId,
    selectedDate,
    startTime,
    endTime,
    placeText,
    notes,
    name,
    email
  }: {
    programId: string;
    selectedDate: Date;
    startTime: string;
    endTime: string;
    placeText: string;
    notes: string;
    name?: string;
    email?: string;
  }) => {
    if (!selectedDate || !startTime || !endTime || !placeText) {
      setNotifMessage(
        'Silakan lengkapi tanggal, jam, dan tempat terlebih dahulu.'
      );
      return;
    }

    const appointmentData = {
      user_id: userId ?? null,
      proposal_id: programId,
      date: `${selectedDate.toISOString().split('T')[0]} ${startTime}:00`,
      end_date: `${selectedDate.toISOString().split('T')[0]} ${endTime}:00`,
      tempat: placeText,
      notes,
      name: name ?? null,
      email: email ?? null,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    mutation.mutate(appointmentData, {
      onSuccess: () => {
        setStep(1);
        setSelectedDate(null);
        setStartTime('');
        setEndTime('');
        setPlace(null); // Reset object
        setPlaceText(''); // Reset text
        setNotes('');
      },
      onError: () => {
        setNotifMessage('Gagal menyimpan janji temu, silakan coba lagi.');
      }
    });
  };

  return (
    <main className="flex flex-col items-center justify-center scroll-smooth">
      <BannerCarousel />
      {/* <section className="scroll-smooth flex flex-row w-full sm:h-[858px] h-screen sm:p-24 p-6 sm:pt-34 pt-24 bg-gradient-to-r from-sky-50 via-blue-50 to-white dark:from-sky-700 sm:bg-cover bg-cover bg-center bg-no-repeat">
        <div className="flex sm:flex-row flex-col justify-center items-center w-full">
          <div
            className="flex flex-col gap-y-8 sm:w-2/4 w-full justify-center sm:pb-0 pb-8"
            data-aos="fade-left"
          >
            <div className="flex flex-col gap-y-24">
              <h3 className="font-medium leading-none sm:text-[90px] text-2xl dark:text-white text-[#002C4A]">
                Kolaborasi Berdampak
              </h3>
            </div>
            <h6 className="text-sm text-xl font-base" data-aos="fade-left">
              Berkolaborasi dalam beragam program yang selaras dengan tujuan
              pembangunan berkelanjutan
            </h6>
            <a
              href="#section-project-browse"
              className="rounded bg-sky-600 dark:bg-sky-500 dark:text-white text-white py-4 px-6 w-[200px]"
            >
              Program Sponsor
            </a>
          </div>
          <div
            className="image-collaboration-impact flex sm:w-2/4 w-full items-center justify-center"
            data-aos="fade-right"
          >
            <Image
              src="/collaborationberdampak.png"
              width={900}
              height={860}
              alt="Work together.png"
            />
            <div className="relative">
              <div className="bg-white/75 absolute flex flex-row w-[320px] gap-x-3 py-3 px-4 rounded-xl border border-gray-300 right-10 top-2/4">
                <span>
                  <IoCheckmarkDoneCircleSharp className="text-green-400 w-[50px] h-[50px]"/>
                </span>
                <div className="flex flex-col gap-y-2">
                  <h6 className="text-base">Apakah kamu tahu Collaboration Impact?</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="flex flex-row gap-x-16 justify-center items-center sm:py-24 p-6 sm:w-4/5 w-full">
        <div
          className="sm:w-1/2 w-full"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="1400"
        >
          <Image
            src="/DSC00959_11zon.jpg"
            width={600}
            height={443}
            alt="Collaboration Human Initiative"
            className="rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl"
          />
        </div>
        <div className="flex flex-col gap-y-4 sm:w-1/2 w-full bg-slate-100 p-8 rounded-3xl">
          <h4
            className={`text-slate-800 dark:text-white font-semibold sm:text-[50px] text-2xl sm:w-1/3 w-full pr-3 sm:pb-0 pb-4 leading-tight`}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="350"
          >
            Collaborative Impact{' '}
          </h4>
          <p
            className="text-base text-gray-500 font-normal w-full leading-6 text-sm"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="950"
          >
            Human Initiative adalah lembaga kemanusiaan terpercaya,
            terverifikasi, dan berkualitas yang berbasis pada prinsip SDG dan
            ESG, serta berpengalaman dalam mengelola CSR management bagi
            berbagai perusahaan. Dengan jejaring lebih dari 1.000 institusi
            dalam dan luar negeri, kami menghadirkan program berkelanjutan
            melalui empat pilar utama: Lingkungan, Pendidikan, UMKM, dan
            Kemanusiaan. Bergabunglah bersama kami untuk menciptakan dampak
            nyata dan berkelanjutan. Mari wujudkan perubahan positif yang
            memberi manfaat luas bagi masyarakat dan lingkungan melalui
            kolaborasi CSR Anda bersama Human Initiative.
          </p>
        </div>
      </section>
      <section className="hidden flex flex-row gap-x-16 justify-center items-center sm:py-24 p-6 w-full">
        <div className="flex sm:flex-row flex-col w-4/5 gap-x-14 ">
          <div
            className="sm:w-1/2 w-full bg-gradient-to-r from-blue-300 to-sky-300 p-8 rounded-3xl h-full"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="500"
          >
            <p
              className="w-full text-base text-white font-normal w-full leading-6"
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="1050"
            >
              Human Initiative membuka program kolaboratif yang menggalang
              berbagai sumber daya dan keahlian untuk menyelesaikan masalah
              sosial seperti kemiskinan, pendidikan, kesehatan, dan bencana
              alam. Melalui kerja sama dengan mitra dari berbagai sektor,
              program ini akan menciptakan solusi berkelanjutan yang memberikan
              manfaat nyata bagi masyarakat yang membutuhkan. Keberhasilannya
              diukur dari perubahan signifikan yang dihasilkan dalam kehidupan
              mereka.
            </p>
            {/* <p className="text-base leading-6 pb-6 w-full">
              Kami percaya bahwa kemitraan ini tidak hanya akan memperkuat
              tanggung jawab sosial perusahaan atau institusi, tetapi juga
              memberikan kontribusi nyata dalam membangun masa depan yang lebih
              baik untuk semua.
            </p>
            <p className="text-base leading-6 pb-6 w-full">
              Mari bersama-sama menjadikan visi ini sebuah kenyataan, di mana
              setiap langkah yang kita ambil bersama, membawa kita lebih dekat
              ke masyarakat yang inklusif, berdaya, dan berkelanjutan.
            </p> */}
          </div>
          <div
            className="animation-word sm:w-1/2 w-full h-full relative"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="1550"
          >
            {showCollab ? (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="rounded-3xl"
                key="collab"
              >
                <motion.span
                  initial="hidden"
                  animate="visible"
                  className="w-auto h-full"
                >
                  <Image
                    src="/IMG_1975.jpg"
                    alt="Collaboration Impact"
                    width={600}
                    height={478}
                    className="rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl"
                  />
                </motion.span>
              </motion.div>
            ) : (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="rounded-3xl"
                key="human"
              >
                <motion.span
                  initial="hidden"
                  animate="visible"
                  className="w-auto h-full"
                >
                  <Image
                    src="/IMG_6858 (1).JPG"
                    alt="Collaboration Impact"
                    width={600}
                    height={478}
                    className="rounded-tl-3xl rounded-tr-lg rounded-bl-lg rounded-br-3xl"
                  />
                </motion.span>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      <section className="scroll-smooth flex flex-col gap-y-20 w-full sm:p-16 p-6 dark:bg-slate-950 bg-white sm:bg-cover bg-cover bg-center bg-no-repeat">
        <div className="flex sm:flex-col gap-y-16 flex-col justify-start items-center w-full">
          <div className="flex flex-col gap-y-12 sm:w-full w-full justify-center items-center sm:pb-0 pb-8">
            <div className="flex flex-col items-center gap-y-6">
              <h3
                className="font-sm text-base w-full text-sky-500 text-center"
                data-aos="fade-up"
                data-aos-duration="550"
              >
                CSR Services
              </h3>
            </div>
            <h6
              className="font-medium sm:text-[60px] text-2xl leading-[50px] text-center dark:text-white text-gray-700"
              data-aos="fade-up"
              data-aos-duration="1050"
            >
              Layanan Kami
            </h6>
          </div>
        </div>
        <div
          className="flex flex-row gap-x-8 gap-y-8 py-4 px-6"
          data-aos="fade-up"
          data-aos-duration="1550"
        >
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false
            }}
            pagination={{
              clickable: true
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper h-[360px]"
          >
            <SwiperSlide>
              <div className="w-full flex flex-col gap-y-8 justify-center items-center hover:shadow-xl bg-sky-50 hover:transitions hover:animations hover:ease-in-out hover:text-slate-600 px-6 py-4 rounded-3xl h-[310px]">
                <span className="bg-yellow-100 w-[60px] h-[60px] rounded-3xl flex justify-center items-center">
                  <HandCoins className="text-yellow-500 text-3xl" />
                </span>
                <div className="flex flex-col gap-y-4 justify-center items-center">
                  <h5 className="text-center text-gray-500 dark:text-slate-400 font-semibold text-lg h-[50px]">
                    Community Services
                  </h5>
                  <p className="text-center text-gray-400 font-sm text-sm leading-[1.8] h-[80px] overflow-hidden">
                    Implementasi Program CSR berupa aktifitas charity pada
                    lokasi yang ditunjuk oleh korporasi/institusi
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full flex flex-col gap-y-8 justify-center items-center hover:shadow-xl bg-sky-50 hover:transitions hover:animations hover:ease-in-out hover:text-slate-600 px-6 py-4 rounded-3xl h-[310px]">
                <span className="bg-pink-100 w-[60px] h-[60px] rounded-3xl flex justify-center items-center">
                  <SmilePlus className="text-pink-500 text-3xl" />
                </span>
                <div className="flex flex-col gap-y-4 justify-center items-center">
                  <h5 className="text-center text-gray-500 dark:text-slate-400 font-semibold text-lg h-[50px]">
                    CSI
                  </h5>
                  <p className="text-center text-gray-400 font-sm text-sm leading-[1.8] h-[80px] overflow-hidden">
                    Menilai sejauh mana kepuasan masyarakat atau tingkat
                    kepuasan terhadap program sosial yang diinisiasi
                    korporasi/institusi, baik secara kualitatif maupun
                    kuantitatif.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full flex flex-col gap-y-8 justify-center items-center hover:shadow-xl bg-sky-50 hover:transitions hover:animations hover:ease-in-out hover:text-slate-600 px-6 py-4 rounded-3xl h-[310px]">
                <span className="bg-blue-100 w-[60px] h-[60px] rounded-3xl flex justify-center items-center">
                  <HeartHandshake className="text-blue-500 text-3xl" />
                </span>
                <div className="flex flex-col gap-y-4 justify-center items-center">
                  <h5 className="text-center text-gray-500 dark:text-slate-400 font-semibold text-lg h-[50px]">
                    Creating Shared Value
                  </h5>
                  <p className="text-center text-gray-400 font-sm text-sm leading-[1.8] h-[80px] overflow-hidden">
                    Tingkatkan nilai-nilai kompetitif korporasi/intitusi dan
                    secara bersamaan memajukan kondisi sosial dan ekonomi
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full flex flex-col gap-y-8 justify-center items-center hover:shadow-xl bg-sky-50 hover:transitions hover:animations hover:ease-in-out hover:text-slate-600 px-6 py-4 rounded-3xl h-[310px]">
                <span className="bg-green-100 w-[60px] h-[60px] rounded-3xl flex justify-center items-center">
                  <NotepadText className="text-green-500 text-3xl" />
                </span>
                <div className="flex flex-col gap-y-4 justify-center items-center">
                  <h5 className="text-center text-gray-500 dark:text-slate-400 font-semibold text-lg h-[50px]">
                    Social Mapping
                  </h5>
                  <p className="text-center text-gray-400 font-sm text-sm leading-[1.8] h-[80px] overflow-hidden">
                    Identifikasi program sosial apa yang benar-benar dibutuhkan
                    oleh masyarakat dan sesuai dengan visi korporasi/institusi
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full flex flex-col gap-y-8 justify-center items-center hover:shadow-xl bg-sky-50 hover:transitions hover:animations hover:ease-in-out hover:text-slate-600 px-6 py-4 rounded-3xl h-[310px]">
                <span className="bg-indigo-100 w-[60px] h-[60px] rounded-3xl flex justify-center items-center">
                  <Repeat className="text-indigo-500 text-3xl" />
                </span>
                <div className="flex flex-col gap-y-4 justify-center items-center">
                  <h5 className="text-center text-gray-500 dark:text-slate-400 font-semibold text-lg h-[50px]">
                    SROI (Social Return On Investment)
                  </h5>
                  <p className="text-center text-gray-400 font-sm text-sm leading-[1.8] h-[80px] overflow-hidden">
                    Membantu korporasi/institusi memahami dan mengelola nilai
                    sosial, lingkungan, dan ekonomi yang dihasilkan
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full flex flex-col gap-y-8 justify-center items-center hover:shadow-xl bg-sky-50 hover:transitions hover:animations hover:ease-in-out hover:text-slate-600 px-6 py-4 rounded-3xl h-[310px]">
                <span className="bg-sky-100 w-[60px] h-[60px] rounded-3xl flex justify-center items-center">
                  <ClipboardCheck className="text-sky-500 text-3xl" />
                </span>
                <div className="flex flex-col gap-y-4 justify-center items-center">
                  <h5 className="text-center text-gray-500 dark:text-slate-400 font-semibold text-lg h-[50px]">
                    Proper
                  </h5>
                  <p className="text-center text-gray-400 font-sm text-sm leading-[1.8] h-[80px] overflow-hidden">
                    Parameter penilaian dari korporasi/institusi terkait dengan
                    aktivitasnya dalam mengelola sektor lingkungan hidup.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      <section className="w-full relative flex flex-col justify-center items-center bg-slate-50 py-24">
        <h5 className="text-sky-600 text-4xl font-semibold">
          Collaborative Sponsor
        </h5>
        <ScrollingCards />
      </section>
      <motion.section
        className={`transition duration-600 ease-in scroll-smooth relative flex flex-col w-full sm:px-32 sm:py-16 p-6 dark:bg-slate-950 bg-white`}
        id="section-project-browse"
        initial={{opacity: 0, y: 50}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.6}}
        viewport={{once: true}}
      >
        <div className="flex sm:flex-row flex-col pb-12">
          <h5
            className={`font-semibold sm:text-[54px] text-2xl sm:w-1/2 w-full pr-3 sm:pb-0 pb-4 leading-tight`}
            data-aos="fade-up"
            data-aos-duration="550"
          >
            Humanity Project <span className="text-sky-400">Browse</span>
          </h5>
          <p
            className={`flex justify-end items-center font-normal text-sky-950 dark:text-slate-500 text-normal sm:w-1/2 w-full pr-6`}
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            We help survivors of war rebuild their lives and choose their own
            futures
          </p>
        </div>
        <Tabs defaultValue="all">
          <TabsList
            className="pb-6"
            data-aos="fade-up"
            data-aos-duration="1550"
          >
            <TabsTrigger value="all">Lihat Semua</TabsTrigger>
            <TabsTrigger value="children">Children</TabsTrigger>
            <TabsTrigger value="disaster">Disaster</TabsTrigger>
            <TabsTrigger value="empowerment">Empowerment</TabsTrigger>
            <TabsTrigger value="infrastruktur">Infrastruktur</TabsTrigger>
          </TabsList>
          <TabsContent
            value="all"
            className="grid grid-cols-4 gap-x-4 gap-y-10"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            {isLoading ? (
              <HashLoader
                color={color}
                loading={isLoading}
                cssOverride={override}
                size={50}
              />
            ) : error ||
              !Array.isArray(proposalprograms) ||
              proposalprograms.length === 0 ? (
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                No data available
              </p>
            ) : (
              paginate(proposalprograms as ProjectList[]).map(
                (programs, index) => (
                  <div key={index} className="flex flex-col gap-y-4">
                    <Image
                      src="/IMG_1975.jpg"
                      alt="Human Initiative"
                      width={300}
                      height={180}
                      className="rounded-lg"
                    />
                    <div className="flex flex-col justify-start items-start gap-x-1">
                      <h5>{programs.title}</h5>
                      <p className="text-slate-400 text-sm">
                        {programs.program_name}
                      </p>
                    </div>
                    <div className="flex flex-row gap-6">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-1/3 bg-slate-100 text-slate-600 rounded-2xl dark:bg-sky-800 transition ease-in duration-300 hover:bg-slate-200">
                            Detail
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[825px] h-[600px]">
                          <DialogHeader>
                            <DialogTitle>
                              Project - {programs.program_name}
                            </DialogTitle>
                            <DialogDescription>{programs.id}</DialogDescription>
                          </DialogHeader>
                          <div className="flex flex-col gap-y-6 w-full h-[450px] relative overflow-y-scroll">
                            <div className="w-full flex flex-col gap-y-2 items-start pb-4">
                              <label className="text-base font-bold text-sky-500 dark:text-slate-300 w-[150px]">
                                Program Name
                              </label>
                              <h6 className="text-slate-700 text-sm dark:text-white">
                                {programs.program_name}
                              </h6>
                            </div>
                            <div className="w-full flex flex-col gap-y-2 items-start justify-center pb-4">
                              <label className="text-base font-bold text-sky-500 dark:text-slate-300 w-[150px]">
                                Project Description
                              </label>
                              <h6 className="text-slate-700 text-sm dark:text-white min-h-[40px] max-h-[200px] w-[682px] overflow-y-hidden">
                                {programs.project_description}
                              </h6>
                            </div>
                            <div className="w-full flex flex-col gap-y-2 items-start pb-4">
                              <label className="text-base font-bold text-sky-500 dark:text-slate-300 w-[150px]">
                                Project Goals
                              </label>
                              <h6 className="text-slate-700 text-sm dark:text-white">
                                {programs.project_goal}
                              </h6>
                            </div>
                            <div className="w-full flex flex-col gap-y-2 items-start pb-4">
                              <label className="text-base font-bold text-sky-500 dark:text-slate-300 w-[150px]">
                                Project Scope
                              </label>
                              <h6 className="text-slate-700 text-sm dark:text-white min-h-[40px] max-h-[200px] w-[682px] overflow-y-hidden">
                                {programs.project_scope}
                              </h6>
                            </div>
                            <div className="w-full flex flex-row gap-x-4 items-center pb-4">
                              <label className="text-base font-bold text-sky-500 dark:text-slate-300 w-[150px]">
                                Amount
                              </label>
                              <h6 className="text-slate-700 text-sm dark:text-white">
                                {formatPrice(programs.amount)}
                              </h6>
                            </div>
                            <div className="w-full flex flex-row gap-x-4 items-center pb-4">
                              <label className="text-base font-bold text-sky-500 dark:text-slate-300 w-[150px]">
                                Quantity
                              </label>
                              <h6 className="text-slate-700 text-sm dark:text-white">
                                {programs.quantity}
                              </h6>
                            </div>
                            <div className="w-full flex flex-row gap-x-4 items-center pb-4">
                              <label className="text-base font-bold text-sky-500 dark:text-slate-300 w-[150px]">
                                Document
                              </label>
                              <h6 className="text-slate-700 text-sm dark:text-white cursor-pointer">
                                {programs.files}
                              </h6>
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-slate-700 rounded-2xl text-white dark:bg-sky-800 transition ease-in duration-300 hover:bg-sky-600">
                            Book an Appointment
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[825px]">
                          <DialogHeader>
                            <DialogTitle>
                              Make an Appointment - {programs.program_name}{' '}
                              {programs.id}
                            </DialogTitle>
                            <DialogDescription>
                              To join the program please make an appointment
                              first
                            </DialogDescription>
                          </DialogHeader>

                          <div className="grid gap-4 py-4">
                            {/* STEP 1: Jika belum login, minta Nama & Email */}
                            {step === 1 && status !== 'authenticated' && (
                              <>
                                <div className="flex flex-col gap-2">
                                  <label className="text-sm text-slate-600">
                                    Nama
                                  </label>
                                  <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border rounded-md px-3 py-2"
                                    placeholder="Nama lengkap"
                                  />
                                </div>

                                <div className="flex flex-col gap-2">
                                  <label className="text-sm text-slate-600">
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border rounded-md px-3 py-2"
                                    placeholder="Email aktif"
                                  />
                                </div>

                                <Button
                                  className="mt-4"
                                  disabled={!name || !email}
                                  onClick={() => setStep(2)}
                                >
                                  Lanjutkan
                                </Button>
                              </>
                            )}

                            {/* STEP 1 jika SUDAH login langsung skip ke pilih tanggal */}
                            {(step === 1 && status === 'authenticated') ||
                            (step === 2 && status !== 'authenticated') ? (
                              <>
                                {/* Pilih Tanggal */}
                                <CalendarPicker
                                  selectedDate={selectedDate}
                                  onSelectDate={setSelectedDate}
                                />

                                {/* Pilih Jam Mulai */}
                                <div className="flex flex-col gap-2">
                                  <label className="text-sm text-slate-600">
                                    Jam Mulai
                                  </label>
                                  <select
                                    value={startTime}
                                    onChange={(e) =>
                                      setStartTime(e.target.value)
                                    }
                                    className="w-full border rounded-md px-3 py-2"
                                  >
                                    <option value="">Pilih jam mulai</option>
                                    {Array.from({length: 24}, (_, i) => (
                                      <option
                                        key={i}
                                        value={`${String(i).padStart(2, '0')}:00`}
                                      >
                                        {`${String(i).padStart(2, '0')}:00`}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* Pilih Jam Selesai */}
                                <div className="flex flex-col gap-2">
                                  <label className="text-sm text-slate-600">
                                    Jam Selesai
                                  </label>
                                  <select
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="w-full border rounded-md px-3 py-2"
                                  >
                                    <option value="">Pilih jam selesai</option>
                                    {Array.from({length: 24}, (_, i) => (
                                      <option
                                        key={i}
                                        value={`${String(i).padStart(2, '0')}:00`}
                                      >
                                        {`${String(i).padStart(2, '0')}:00`}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <Button
                                  className="mt-4"
                                  disabled={
                                    !selectedDate || !startTime || !endTime
                                  }
                                  onClick={() => setStep(3)}
                                >
                                  Lanjutkan
                                </Button>
                              </>
                            ) : null}

                            {/* STEP 3 */}
                            {step === 3 && (
                              <>
                                {/* Select Tempat */}
                                <div className="flex flex-col gap-2">
                                  <label className="text-sm text-slate-600">
                                    Tempat
                                  </label>
                                  <select
                                    value={placeOption}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      setPlaceOption(value);

                                      // otomatis isi placeText kalau Online atau HQ
                                      if (value === 'Online') {
                                        setPlaceText('Online');
                                        setPlace(null);
                                      } else if (value === 'HQ') {
                                        setPlaceText(
                                          'Human Initiative Headquarter'
                                        );
                                        setPlace(null);
                                      } else {
                                        setPlaceText(''); // kosongkan dulu, nanti isi dari Map
                                      }
                                    }}
                                    className="w-full border rounded-md px-3 py-2"
                                  >
                                    <option value="">Pilih tempat</option>
                                    <option value="Online">Online</option>
                                    <option value="HQ">
                                      Human Initiative Headquarter
                                    </option>
                                    <option value="Custom">
                                      Pilih tempat sendiri
                                    </option>
                                  </select>
                                </div>

                                {/* Kalau pilih tempat sendiri, baru tampilkan Map */}
                                {placeOption === 'Custom' && (
                                  <MapWithSearch
                                    onSelect={(placeResult) => {
                                      setPlace(placeResult);
                                      setPlaceText(placeResult.address ?? '');
                                    }}
                                  />
                                )}

                                {/* Input Catatan */}
                                <div className="flex flex-col">
                                  <label className="text-sm text-slate-600">
                                    Catatan
                                  </label>
                                  <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full border px-3 py-2 rounded-md"
                                    placeholder="Tulis catatan (opsional)"
                                  />
                                </div>

                                <DialogFooter>
                                  <DialogClose>
                                    <Button
                                      type="submit"
                                      onClick={() => {
                                        if (!selectedDate) return;

                                        handleSubmitAppointment({
                                          programId: programs.id,
                                          selectedDate,
                                          startTime,
                                          endTime,
                                          placeText,
                                          notes,
                                          name,
                                          email
                                        });
                                      }}
                                      disabled={!placeText} // jangan bisa submit kalau tempat belum dipilih
                                    >
                                      Submit Appointment
                                    </Button>
                                  </DialogClose>
                                </DialogFooter>
                              </>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )
              )
            )}
          </TabsContent>
        </Tabs>
        <div className="pagination-controls flex justify-center items-center gap-4 mt-14">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#0499fd] text-white rounded-xl disabled:bg-gray-300"
          >
            <FaArrowLeft />
          </button>

          <div className="page-numbers flex gap-2">
            {getVisiblePageNumbers(
              (proposalprograms as ProjectList[]).length || 0
            ).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-4 py-2 border rounded-xl ${
                  currentPage === pageNumber
                    ? 'bg-[#0499fd] text-white'
                    : 'bg-gray-200 text-black'
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage(
                Math.min(
                  currentPage + 1,
                  totalPages((proposalprograms as ProjectList[]).length || 0)
                )
              )
            }
            disabled={
              currentPage ===
              totalPages((proposalprograms as ProjectList[]).length || 0)
            }
            className="px-4 py-2 bg-[#0499fd] text-white rounded-xl disabled:bg-gray-300"
          >
            <FaArrowRight />
          </button>
        </div>
      </motion.section>
      <NewsCollaborate />
      <PopupNotif
        message={notifMessage}
        duration={3000}
        onClose={() => setNotifMessage('')}
      />
    </main>
  );
};

export default CSRServices;
