import React, {useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Pagination, Navigation, Autoplay} from 'swiper/modules';
import Link from 'next/link';

const CollectionPublicationNew = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section className="flex flex-col justify-center items-center w-full sm:py-24 p-6">
      <div className="flex flex-col gap-y-[67px] w-full pt-3">
        <div className="flex flex-col justify-center items-center gap-y-4 w-full h-[200px]">
          <h5
            className={`text-gray-800 dark:text-slate-400 dark:text-white font-semibold text-[46px] leading-8 leading-snug`}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            Explore Our Publications
          </h5>
          <p className="text-gray-600 text-sm">
            Uncover engaging stories through everyday items at the office.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-row gap-x-3 px-12 pl-24 pt-3">
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          loop={true}
          modules={[Autoplay, Pagination]}
          style={{paddingRight: '80px'}}
          className="mySwiper h-[300px]"
        >
          <SwiperSlide>
            <Link
              href="#"
              className="flex flex-col justify-center items-center w-full gap-y-2"
            >
              <div className="bg-gradient-to-r to-sky-100 from-sky-200 rounded-xl h-[200px] w-full flex justify-center items-center">
                <Image
                  src="/health-check.png"
                  alt="Situation Report Human Initiative"
                  width={100}
                  height={100}
                />
              </div>
              <p className="text-sm text-slate-800 font-semibold">
                Situation Report
              </p>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href="#"
              className="flex flex-col justify-center items-center w-full gap-y-2"
            >
              <div className="bg-gradient-to-r to-sky-100 from-sky-200 rounded-xl h-[200px] w-full flex justify-center items-center">
                <Image
                  src="/documents.png"
                  alt="Situation Report Human Initiative"
                  width={100}
                  height={100}
                />
              </div>
              <p className="text-sm text-slate-800 font-semibold">
                Public Report
              </p>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href="#"
              className="flex flex-col justify-center items-center w-full gap-y-2"
            >
              <div className="bg-gradient-to-r to-sky-100 from-sky-200 rounded-xl h-[200px] w-full flex justify-center items-center">
                <Image
                  src="/time-management.png"
                  alt="Situation Report Human Initiative"
                  width={100}
                  height={100}
                />
              </div>
              <p className="text-sm text-slate-800 font-semibold">Event</p>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href="#"
              className="flex flex-col justify-center items-center w-full gap-y-2"
            >
              <div className="bg-gradient-to-r to-sky-100 from-sky-200 rounded-xl h-[200px] w-full flex justify-center items-center">
                <Image
                  src="/news.png"
                  alt="Situation Report Human Initiative"
                  width={100}
                  height={100}
                />
              </div>
              <p className="text-sm text-slate-800 font-semibold">
                Media Release
              </p>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href="#"
              className="flex flex-col justify-center items-center w-full gap-y-2"
            >
              <div className="bg-gradient-to-r to-sky-100 from-sky-200 rounded-xl h-[200px] w-full flex justify-center items-center">
                <Image
                  src="/sign.png"
                  alt="Situation Report Human Initiative"
                  width={100}
                  height={100}
                />
              </div>
              <p className="text-sm text-slate-800 font-semibold">Document</p>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href="#"
              className="flex flex-col justify-center items-center w-full gap-y-2"
            >
              <div className="bg-gradient-to-r to-sky-100 from-sky-200 rounded-xl h-[200px] w-full flex justify-center items-center">
                <Image
                  src="/books.png"
                  alt="Situation Report Human Initiative"
                  width={100}
                  height={100}
                />
              </div>
              <p className="text-sm text-slate-800 font-semibold">Library</p>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default CollectionPublicationNew;
