import React from 'react';
import {initiativeDisaster} from '@/data/data';
import Image from 'next/image';

interface InitiativeDisasterProps {
  tab: string; // props untuk filter tab
}

const InitiativeDisaster: React.FC<InitiativeDisasterProps> = ({tab}) => {
  const filteredItems = initiativeDisaster.filter((item) => item.tab === tab);

  return (
    <div className="grid grid-cols-2 gap-6">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="bg-gradient-to-b from-[#F4FBFE] to-[#E5F4FF] flex flex-col px-4 py-4 rounded-3xl"
        >
          <div className="flex flex-row justify-between gap-x-4">
            {/* Kiri */}
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-row items-center gap-x-2">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={60}
                  height={60}
                />
                <h4 className="text-sky-600 text-xl font-semibold w-[14rem]">
                  {item.title}
                </h4>
              </div>
              <div className="py-2 w-[80%]">
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            </div>

            {/* Tengah */}
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2 bg-sky-600 rounded-2xl px-4 py-3 w-[12rem]">
                <p className="text-base text-white">
                  Total Pemegang Hak Program 2024:
                </p>
                <p className="text-3xl font-bold text-white">
                  {item.pemegangempat} Jiwa
                </p>
              </div>
              <div className="flex flex-col gap-y-2 bg-sky-600 rounded-2xl px-4 py-3 w-[12rem]">
                <p className="text-base text-white">
                  Total Pemegang Hak Program 2025:
                </p>
                <p className="text-3xl font-bold text-white">
                  {item.pemeganglima} Jiwa
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-1 pt-6">
            <div className="grid grid-cols-3 gap-3">
              <h4 className="bg-[#075294] text-white p-2 text-center rounded-3xl text-xs">
                Deskripsi
              </h4>
              <h4 className="bg-[#075294] text-white p-2 text-center rounded-3xl text-xs">
                Total Pemegang Hak Program (Jiwa)
              </h4>
              <h4 className="bg-[#075294] text-white p-2 text-center rounded-3xl text-xs">
                Harga (IDR)
              </h4>
            </div>
            {item.details?.map((detail, idx) => (
              <div
                key={idx}
                className="grid grid-cols-3 gap-3 bg-sky-100 rounded-xl py-2"
              >
                <p className="text-xs font-semibold text-sky-700 text-center bg-white rounded-3xl p-2">
                  {detail.deskripsi}
                </p>
                <p className="text-xs text-gray-600 text-center bg-white rounded-3xl p-2">
                  {detail.totalpemeganghak}
                </p>
                <p className="text-xs text-gray-500 text-center bg-white rounded-3xl p-2">
                  {detail.harga}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InitiativeDisaster;
