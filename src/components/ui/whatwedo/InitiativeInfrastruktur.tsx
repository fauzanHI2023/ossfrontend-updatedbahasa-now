import React from 'react';
import {initiativeInfrastruktur} from '@/data/data';
import Image from 'next/image';

interface InitiativeInfrastrukturProps {
  tab: string; // props untuk filter tab
}

const InitiativeInfrastruktur: React.FC<InitiativeInfrastrukturProps> = ({
  tab
}) => {
  const filteredItems = initiativeInfrastruktur.filter(
    (item) => item.tab === tab
  );

  const colClassMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="bg-gradient-to-b from-[#F4FBFE] to-[#E5F4FF] flex flex-col px-4 py-4 rounded-3xl"
        >
          {/* Bagian Kiri + Tengah */}
          <div className="flex flex-row justify-between gap-x-4">
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

            <div className="flex flex-col gap-y-4">
              {item.pemegangempat && (
                <div className="flex flex-col gap-y-2 bg-sky-600 rounded-2xl px-4 py-3 w-[12rem]">
                  <p className="text-base text-white">
                    Total Pemegang Hak Program 2024:
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {item.pemegangempat} Jiwa
                  </p>
                </div>
              )}
              {item.pemeganglima && (
                <div className="flex flex-col gap-y-2 bg-sky-600 rounded-2xl px-4 py-3 w-[12rem]">
                  <p className="text-base text-white">
                    Total Pemegang Hak Program 2025:
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {item.pemeganglima} Jiwa
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bagian Details (Dynamic Table) */}
          {item.details && item.details.length > 0 && (
            <div className="flex flex-col gap-y-1 pt-6">
              {(() => {
                // ambil keys dari object pertama
                const keys = Object.keys(item.details[0]);

                return (
                  <>
                    {/* Header */}
                    <div
                      className={`grid ${colClassMap[keys.length] ?? 'grid-cols-1'} gap-3`}
                    >
                      {keys.map((key, idx) => (
                        <h4
                          key={idx}
                          className="bg-[#075294] text-white p-2 text-center rounded-3xl text-xs capitalize"
                        >
                          {key}
                        </h4>
                      ))}
                    </div>

                    {/* Rows */}
                    {item.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className={`grid ${colClassMap[keys.length] ?? 'grid-cols-1'} gap-3 bg-sky-100 rounded-xl py-2`}
                      >
                        {keys.map((key, cIdx) => (
                          <p
                            key={cIdx}
                            className="text-xs text-gray-700 text-center bg-white rounded-3xl p-2"
                          >
                            {detail[key as keyof typeof detail] ?? '-'}
                          </p>
                        ))}
                      </div>
                    ))}
                  </>
                );
              })()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InitiativeInfrastruktur;
