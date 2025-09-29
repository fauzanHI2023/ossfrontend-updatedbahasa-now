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
    <section
      id="section-publicationhome"
      className="flex flex-col justify-center items-center w-full sm:py-24 p-6"
    >
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
      <div className="w-full flex flex-row gap-x-3 sm:px-24 px-0 pt-3">
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
          breakpoints={{
            0: {slidesPerView: 1}, // default (mobile kecil)
            640: {slidesPerView: 2}, // mobile
            768: {slidesPerView: 3}, // tablet
            1024: {slidesPerView: 5} // desktop
          }}
          loop={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper h-[300px]"
        >
          <SwiperSlide>
            <Link
              href="/publication/situationreport"
              className="flex flex-col justify-center items-center w-full gap-y-2"
            >
              <div className="bg-gradient-to-r to-sky-100 from-sky-200 rounded-xl h-[200px] w-full flex justify-center items-center">
                <Image
                  src="/health-check.png"
                  alt="Situation Report Human Initiative"
                  width={100}
                  height={100}
                  sizes="(max-width: 640px) 80px, (max-width: 1024px) 60px, 50px"
                />
              </div>
              <p className="text-sm text-slate-800 font-semibold">
                Situation Report
              </p>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              href="/publication/publicreport"
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
              href="/publication/event"
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
              href="/publication/mediarelease"
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
              href="/publication/document"
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
              href="/publication/library"
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
