'use client';

import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface UserInfoFormProps {
  fullName: string;
  email: string;
  phone: string | undefined;
  anonim: boolean;
  setFullName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  handleAnonimChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAuthenticated: boolean;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({
  fullName,
  email,
  phone,
  anonim,
  setFullName,
  setEmail,
  setPhone,
  handleAnonimChange,
  isAuthenticated
}) => {
  if (isAuthenticated) return null;

  return (
    <div className="flex flex-col gap-y-4 mb-2 rounded-2xl dark:bg-slate-900 bg-white p-6">
      <h5 className="text-gray-700 text-base font-normal">Your Information</h5>
      <div className="flex flex-col gap-y-3 mb-4">
        <input
          type="text"
          value={fullName}
          placeholder="Enter Full Name"
          onChange={(e) => setFullName(e.target.value)}
          className="border p-2 px-4 rounded-lg focus:outline text-sm"
        />
        <div className="flex flex-row justify-end gap-x-3 mb-2">
          <input
            id="anonim-checkbox"
            type="checkbox"
            checked={anonim}
            onChange={handleAnonimChange}
            className="checkbox"
          />
          <label
            htmlFor="anonim-checkbox"
            className="text-xs text-slate-800 dark:text-white"
          >
            Anonim
          </label>
        </div>
        <input
          type="email"
          value={email}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 px-4 rounded-lg focus:outline text-sm"
        />
        <PhoneInput
          placeholder="Enter phone number"
          international
          value={phone}
          onChange={(setValue) => setPhone(setValue ?? '')}
          className="border p-2 px-4 rounded-lg dark:bg-black text-sm"
        />
      </div>
    </div>
  );
};
