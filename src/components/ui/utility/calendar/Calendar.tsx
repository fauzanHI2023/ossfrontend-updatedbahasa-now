'use client';

import React, {useState} from 'react';
import {format} from 'date-fns';
import {id} from 'date-fns/locale';
import {CalendarDays} from 'lucide-react';
import {DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type CalendarPickerProps = {
  selectedDate: Date | null;
  onSelectDate: (date: Date | null) => void;
};

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  selectedDate,
  onSelectDate
}) => {
  const today = new Date();

  return (
    <div className="w-full p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-600 flex flex-row justify-start items-start">
      <div className="flex items-center gap-2 mb-3">
        <CalendarDays className="text-sky-600" />
        <h4 className="text-slate-700 dark:text-white font-semibold text-sm">
          Pilih Tanggal
        </h4>
      </div>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        locale={id}
        weekStartsOn={1}
        fromMonth={today}
        toMonth={new Date(today.getFullYear(), today.getMonth() + 2, 0)}
        modifiersClassNames={{
          selected: 'bg-sky-500 text-white rounded-full',
          today: 'text-sky-600 font-black'
        }}
        classNames={{
          root: 'flex justify-center items-center w-[70%]',
          month: 'flex flex-col justify-center ',
          caption_label:
            'text-slate-700 dark:text-white text-sm font-bold pt-2',
          nav_button: 'text-slate-600 dark:text-slate-300',
          table: 'w-full border-spacing-0',
          head_row: 'text-xs text-slate-600 dark:text-slate-300',
          day: 'p-4 text-center text-sm text-slate-600 dark:text-white hover:bg-sky-100 dark:hover:bg-slate-600 rounded-full transition',
          row: 'flex justify-center gap-1 mb-1'
        }}
      />
      {selectedDate && (
        <p className="text-sm text-slate-500 dark:text-slate-300 mt-2">
          <span className="font-semibold">
            {format(selectedDate, 'dd MMMM yyyy', {locale: id})}
          </span>
        </p>
      )}
    </div>
  );
};
