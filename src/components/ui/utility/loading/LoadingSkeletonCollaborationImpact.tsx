"use client";
import React, { useState, useEffect } from "react";
import {
  HandCoins,
  SmilePlus,
  HeartHandshake,
  NotepadText,
  Repeat,
  ClipboardCheck,
  MoveRight,
} from "lucide-react";
import { programCSR } from "@/data/data";
import Link from "next/link";
import Image from "next/image";
import PopupNotif from "@/components/ui/utility/PopupNotif";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-fe";
import { ExpandableCardDemo } from "@/components/ui/cardback";
import { Skeleton } from "../../skeleton";

const CollaborationImpact = () => {
  const [notifMessage, setNotifMessage] = useState("");
  const [showCollab, setShowCollab] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCollab((prev) => !prev);
    }, 7000); // Ubah setiap 5 detik

    return () => clearInterval(interval);
  }, []);

  const typingAnimation = {
    hidden: { opacity: 0 },
    visible: (i: any) => ({
      opacity: 1,
      transition: {
        delay: i * 0.02,
      },
    }),
  };

  const collabText =
    "Di tengah tantangan global yang semakin kompleks, kolaborasi menjadi kunci utama untuk menciptakan perubahan nyata.";

  const humanText =
    "Human Initiative Collaboration Impact";

  const learnMore = () => {
    setNotifMessage(
      "Silahkan Login terlebih dahulu untuk melihat lebih lanjut."
    );
  };

  return (
    <main className="flex flex-col items-center justify-center scroll-smooth">
      <section className="scroll-smooth flex flex-row w-full sm:h-[858px] h-screen sm:p-24 p-6 sm:pt-34 pt-24 dark:bg-hero-csr-dark bg-hero-csr-white sm:bg-cover bg-cover bg-center bg-no-repeat">
        <div className="flex sm:flex-row flex-col justify-center items-center w-full">
          <div
            className="flex flex-col gap-y-8 sm:w-2/4 w-full justify-center sm:pb-0 pb-8"
            data-aos="fade-left"
          >
            <div className="flex flex-col gap-y-24">
              <Skeleton className="font-medium leading-none sm:text-[90px] text-2xl dark:text-white text-[#002C4A]"/>
            </div>
            <Skeleton className="text-sm text-xl font-base" data-aos="fade-left"/>
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
            <Skeleton/>
            <div className="relative">
              <div className="bg-white/75 absolute flex flex-row w-[320px] gap-x-3 py-3 px-4 rounded-xl border border-gray-300 right-10 top-2/4">
                <span>
                  <IoCheckmarkDoneCircleSharp className="text-green-400 w-[50px] h-[50px]"/>
                </span>
                <div className="flex flex-col gap-y-2">
                  <Skeleton className="text-base"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-row gap-x-16 justify-center items-center sm:p-24 p-6 sm:w-4/5 w-full">
        <div className="sm:w-1/2 w-full">
          <Skeleton/>
        </div>
        <div className="flex flex-col gap-y-10 sm:w-1/2 w-full">
          <Skeleton className="text-sm font-normal text-slate-600 dark:text-white"/>
          <Skeleton
            className={`text-slate-800 dark:text-white font-semibold sm:text-[54px] text-2xl sm:w-1/3 w-full pr-3 sm:pb-0 pb-4 leading-tight`}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="700"
          />
          <Skeleton className="text-base w-full leading-6" />
        </div>
      </section>
      <section className="flex flex-row gap-x-16 justify-center items-center sm:p-24 p-6 w-full">
        <div className="flex sm:flex-row flex-col w-4/5 gap-x-14">  
          <div className="sm:w-1/2 w-full">
            <Skeleton className="text-base leading-6 pb-6 w-full"/>
            <Skeleton className="text-base leading-6 pb-6 w-full"/>
            <Skeleton className="text-base leading-6 pb-6 w-full"/>
          </div>
          <div className="animation-word sm:w-1/2 w-full h-[478px] relative">
            <div className="bg-dot-thick-sky-600 dark:bg-dot-thick-sky-600 absolute w-1/6 h-[70px] left-3/4"></div>
            <div className="bg-dot-thick-sky-600 dark:bg-dot-thick-sky-600 absolute w-1/6 h-[70px] left-3/4 bottom-2/4"></div>
            {showCollab ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                exit={{ opacity: 0 }}
                className="rounded-3xl"
                key="collab"
              >
                <motion.span
                  initial="hidden"
                  animate="visible"
                  className="w-auto h-full"
                >
                  <Skeleton className="h-[478px] w-[342px] rounded-3xl"/>
                </motion.span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-3xl"
                key="human"
              >
                <motion.span
                  initial="hidden"
                  animate="visible"
                  className="w-auto h-full"
                >
                  <Skeleton className="h-[478px] w-[342px] rounded-3xl"/>
                </motion.span>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      <section className="scroll-smooth flex flex-col gap-y-20 w-full sm:p-16 p-6 dark:bg-slate-950 bg-white sm:bg-cover bg-cover bg-center bg-no-repeat">
        <div className="flex sm:flex-col gap-y-16 flex-col justify-start items-center w-full">
          <div
            className="flex flex-col gap-y-12 sm:w-full w-full justify-center items-center sm:pb-0 pb-8"
            data-aos="fade-left"
          >
            <div className="flex flex-col items-center gap-y-6">
              <Skeleton className="font-sm text-base w-full text-sky-500 text-center"/>
            </div>
            <Skeleton
              className="font-medium sm:text-[60px] text-2xl leading-[50px] text-center dark:text-white text-[#002C4A]"
              data-aos="fade-left"
            />
          </div>
        </div>
        <div className="flex flex-row gap-x-8 gap-y-8 py-4 px-6">
          <div className="w-1/6 flex flex-col gap-y-8 justify-center items-center hover:shadow-xl hover:transitions hover:animations hover:eas-in-out">
            <span className="bg-yellow-100 w-[60px] h-[60px] rounded-3xl flex justify-center items-center">
              <Skeleton className="text-yellow-500 text-3xl" />
            </span>
            <div className="flex flex-col gap-y-4 justify-center items-center">
              <Skeleton className="text-center text-slate-800 dark:text-slate-400 font-semibold text-lg"/>
              <Skeleton className="text-center text-slate-500 font-sm text-sm leading-[1.8]"/>
            </div>
          </div>
          <div className="w-1/6 flex flex-col gap-y-8 justify-center items-center hover:shadow-xl hover:transitions hover:animations hover:eas-in-out">
            <span className="bg-pink-100 w-[60px] h-[60px] rounded-3xl flex justify-center items-center">
              <Skeleton className="text-pink-500 text-3xl" />
            </span>
            <div className="flex flex-col gap-y-4 justify-center items-center">
              <Skeleton className="text-center text-slate-800 dark:text-slate-400 font-semibold text-lg"/>
              <Skeleton className="text-center text-slate-500 font-sm text-sm leading-[1.8]"/>
            </div>
          </div>
          <div className="w-1/6 flex flex-col gap-y-8 justify-center items-center hover:shadow-xl hover:transitions hover:animations hover:eas-in-out">
            <span className="bg-blue-100 w-[60px] h-[60px] rounded-3xl flex justify-center items-center">
              <Skeleton className="text-blue-500 text-3xl" />
            </span>
            <div className="flex flex-col gap-y-4 justify-center items-center">
              <Skeleton className="text-center text-slate-800 dark:text-slate-400 font-semibold text-lg"/>
              <Skeleton className="text-center text-slate-500 font-sm text-sm leading-[1.8]"/>
            </div>
          </div>
          <div className="w-1/6 flex flex-col gap-y-8 justify-center items-center hover:shadow-xl hover:transitions hover:animations hover:eas-in-out">
            <span className="bg-blue-100 w-[60px] h-[60px] rounded-3xl flex justify-center items-center">
              <Skeleton className="text-blue-500 text-3xl" />
            </span>
            <div className="flex flex-col gap-y-4 justify-center items-center">
              <Skeleton className="text-center text-slate-800 dark:text-slate-400 font-semibold text-lg"/>
              <Skeleton className="text-center text-slate-500 font-sm text-sm leading-[1.8]"/>
            </div>
          </div>
          <div className="w-1/6 flex flex-col gap-y-8 justify-center items-center hover:shadow-xl hover:transitions hover:animations hover:eas-in-out">
            <span className="bg-blue-100 w-[60px] h-[60px] rounded-3xl flex justify-center items-center">
              <Skeleton className="text-blue-500 text-3xl" />
            </span>
            <div className="flex flex-col gap-y-4 justify-center items-center">
              <Skeleton className="text-center text-slate-800 dark:text-slate-400 font-semibold text-lg"/>
              <Skeleton className="text-center text-slate-500 font-sm text-sm leading-[1.8]"/>
            </div>
          </div>
          <div className="w-1/6 flex flex-col gap-y-8 justify-center items-center hover:shadow-xl hover:transitions hover:animations hover:eas-in-out">
            <span className="bg-blue-100 w-[60px] h-[60px] rounded-3xl flex justify-center items-center">
              <Skeleton className="text-blue-500 text-3xl" />
            </span>
            <div className="flex flex-col gap-y-4 justify-center items-center">
              <Skeleton className="text-center text-slate-800 dark:text-slate-400 font-semibold text-lg"/>
              <Skeleton className="text-center text-slate-500 font-sm text-sm leading-[1.8]"/>
            </div>
          </div>
        </div>
      </section>
      <section
        className={`scroll-smooth relative flex flex-col w-full sm:px-32 sm:py-20 p-6 dark:bg-slate-950 bg-sky-50`}
        id="#section-project-browse"
      >
        <div className="flex sm:flex-row flex-col sm:pb-20 pb-12">
          <Skeleton
            className={`font-semibold sm:text-[54px] text-2xl sm:w-1/2 w-full pr-3 sm:pb-0 pb-4 leading-tight`}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="700"
          />
          <Skeleton
            className={`flex justify-end items-center font-semibold text-sky-950 dark:text-slate-500 text-normal sm:w-1/2 w-full pr-6`}
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="1000"
          />
        </div>
        <Tabs defaultValue="children">
          <TabsList className="pb-6">
            <TabsTrigger value="all"><Skeleton/></TabsTrigger>
            <TabsTrigger value="children"><Skeleton/></TabsTrigger>
            <TabsTrigger value="disaster"><Skeleton/></TabsTrigger>
            <TabsTrigger value="empowerment"><Skeleton/></TabsTrigger>
            <TabsTrigger value="infrastruktur"><Skeleton/></TabsTrigger>
          </TabsList>
        </Tabs>
      </section>
      <PopupNotif
        message={notifMessage}
        duration={3000}
        onClose={() => setNotifMessage("")}
      />
    </main>
  );
};

export default CollaborationImpact;
