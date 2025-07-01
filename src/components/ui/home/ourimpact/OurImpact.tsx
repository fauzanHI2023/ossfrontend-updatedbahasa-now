'use client';
import React, {useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {motion} from 'framer-motion';
import {HeroHighlight} from '@/components/ui/hero-highlight';
// import WorldMap from '@/components/ui/world-map';
import {useLocale, useTranslations} from 'next-intl';
import CountUp from '@/components/ui/count-up';
import {impactUpdated} from '@/data/data';
import WorldMap from '../../maps/worldmapshome';
import {HandHelping, ListTodo, Banknote, UsersRound} from 'lucide-react';

const OurImpact: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="relative flex flex-col w-full py-12 px-24 p-6 bg-hero-impact bg-center ">
      <div className="flex flex-col backdrop-blur-sm bg-white/50 p-16 rounded-tr-3xl rounded-tl-3xl">
        <div className="flex sm:flex-row flex-col sm:pb-4 pb-4">
          <h5
            className="text font-semibold sm:text-3xl text-2xl sm:w-1/2 w-full pr-3 sm:pb-0 pb-4"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            <span>{t('SectionThreeHome.title')}</span>{' '}
            {t('SectionThreeHome.titlenext')}
          </h5>
          <p
            className="text-slate-600 dark:text-slate-300 font-base text-sm sm:w-1/2 w-full pr-6"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="1000"
          >
            {t('SectionThreeHome.desc')}
          </p>
        </div>
        <div className="flex justify-start items-center gap-x-4 py-6">
          <h5 className="text-gray-900 text-base font-lg">Select Year</h5>
          <form action="" className="pr-2">
            <select
              defaultValue="Pilih Tahun"
              className="bg-white text-slate-700 py-2 px-6 mr-2 rounded-xl"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </form>
        </div>
        <div className="flex flex-col sm:flex-row gap-x-8">
          <div className="w-1/4 flex flex-col justify-center items-center gap-x-4 bg-white p-4 rounded-2xl">
            <span>
              <UsersRound className="w-14 h-14 text-sky-600" />
            </span>
            <h5 className="totaldata text-slate-700 font-semibold text-3xl">
              <CountUp
                from={0}
                to={3783423}
                separator=","
                direction="up"
                duration={0.2}
                className="count-up-text"
              />
            </h5>
            <h6 className="dark:text-white text-slate-800 font-medium text-base">
              Rightholders
            </h6>
          </div>
          <div className="w-1/4 flex flex-col justify-center items-center gap-x-4 bg-white p-4 rounded-2xl">
            <span>
              <HandHelping className="w-14 h-14 text-sky-600" />
            </span>
            <h5 className="totaldata text-slate-700 font-semibold text-3xl">
              <CountUp
                from={0}
                to={3200}
                separator=","
                direction="up"
                duration={0.2}
                className="count-up-text"
              />
            </h5>
            <h6 className="dark:text-white text-slate-800 font-medium text-base">
              Volunteer
            </h6>
          </div>
          <div className="w-1/4 flex flex-col justify-center items-center gap-x-4 bg-white p-4 rounded-2xl">
            <span>
              <ListTodo className="w-14 h-14 text-sky-600" />
            </span>
            <h5 className="totaldata text-slate-700 font-semibold text-3xl">
              <CountUp
                from={0}
                to={100}
                separator=","
                direction="up"
                duration={0.2}
                className="count-up-text"
              />
            </h5>
            <h6 className="dark:text-white text-slate-800 font-medium text-base">
              Programs
            </h6>
          </div>
          <div className="w-1/4 flex flex-col justify-center items-center gap-x-4 bg-white p-4 rounded-2xl">
            <span>
              <Banknote className="w-14 h-14 text-sky-600" />
            </span>
            <h5 className="totaldata text-slate-700 font-semibold text-3xl">
              <CountUp
                from={0}
                to={113969507912}
                separator=","
                direction="up"
                duration={0.2}
                className="count-up-text"
              />
            </h5>
            <h6 className="dark:text-white text-slate-800 font-medium text-base">
              Donations Distributed
            </h6>
          </div>
        </div>
        <div className="relative flex justify-center"></div>
      </div>
      <div className="py-4 sm:py-4 dark:bg-slate-900 bg-white rounded-br-3xl rounded-bl-3xl w-full">
        {/* <WorldMap
          dots={[
            {
              start: {
                lat: -23.1404,
                lng: 109.8166
              }, // Indonesia
              end: {
                lat: 27.652,
                lng: 140.8394
              } // Jepang
            },
            {
              start: {lat: -23.1404, lng: 109.8166}, // Indonesia
              end: {lat: 25.5326, lng: 127.0246} // Korea
            },
            {
              start: {lat: -23.1404, lng: 109.8166}, // Indonesia
              end: {lat: -45.8651, lng: 145.2099} // Australia
            },
            {
              start: {lat: -23.1404, lng: 109.8166}, // Indonesia
              end: {lat: 51.5152, lng: -2.1297} // UK
            },
            {
              start: {lat: -23.1404, lng: 109.8166}, // Indonesia
              end: {lat: 42.7678, lng: 7.4439} // Germany
            },
            {
              start: {lat: -23.1404, lng: 109.8166}, // Indonesia
              end: {lat: 25.2675, lng: 32.415} // Turkey
            },
            {
              start: {lat: -23.1404, lng: 109.8166}, // Indonesia
              end: {lat: 11.7742, lng: 42.415} // Arab Saudi
            },
            {
              start: {lat: -23.1404, lng: 109.8166}, // Indonesia
              end: {lat: 38.0, lng: -75.0, label: 'Amerika Serikat'} // Amerika Serikat
            }
          ]}
        /> */}
        <WorldMap />
      </div>
    </div>
  );
};

export default OurImpact;
