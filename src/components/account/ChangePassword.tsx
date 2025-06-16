"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { MdArrowBack } from "react-icons/md";

interface ChangePasswordProps {
  setisChangePassword: (value: boolean) => void;
}

const ChangePassword = ({ setisChangePassword }: ChangePasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showhidePassword, setShowhidePassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status, update }: any = useSession();

  // useEffect(() => {
  //   if (session?.user) {
  //     setNewPassword(session.user.passwd || "");
  //   }
  // }, [session]);

  const handleSubmit = async () => {
    try {
      // Validate current password
      if (currentPassword !== session.user.passwd) {
        setError("Kata Sandi sekarang tidak cocok");
        return;
      }

      // Validate new password and confirm password match
      if (newPassword !== confirmPassword) {
        setError("Kata sandi baru dan kata sandi konfirmasi tidak cocok");
        return;
      }
      // Update backend
      const response = await fetch(
        `https://adminx.human-initiative.org/account-api/update-password/${session?.user?.phpDonorData[0].id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            passwd: newPassword,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        setError("Failed to update password");
        return;
      }

      // Update session
      await update({
        password: newPassword,
      });

      // Fetch updated data after update
      const updatedDataResponse = await fetch(
        `https://adminx.human-initiative.org/account-api/get/${session?.user?.phpDonorData[0].id}`
      );
      const updatedData = await updatedDataResponse.json();
      // console.log("Updated data:", updatedData);

      // Update local state with the updated data
      setNewPassword(updatedData.passwd || "");

      // Update session with the updated data
      const updateResult = await update({
        passwd: updatedData.passwd,
      });
      // console.log("Update result:", updateResult);
      // console.log("Successfully updated user data");
      setisChangePassword(false);
      router.push('dashboard/myaccout');
    } catch (error) {
      setError("An error occurred while updating data");
    }
  };

  if (!session) {
    signIn();
    return <div>Redirecting to login...</div>;
  }

  const togglePasswordVisibility = () => {
    setShowhidePassword(!showhidePassword);
  }

  return (
    <Fragment>
      <div className="box mb-4 p-6 bg-white dark:bg-slate-900 rounded-xl">
        <div className="flex flex-row justify-between mb-4">
          <div
            className="flex flex-row justify-center items-center cursor-pointer"
            onClick={() => {
              setisChangePassword(false);
            }}
          >
            <MdArrowBack className="text-sky-500 text-xl" />
            <h4 className="text-sky-500 text-base">Kembali</h4>
          </div>
          <div className="flex flex-row justify-center items-center">
            <h2 className="text-lg font-semibold">Edit Kata Sandi</h2>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block text-gray-700 dark:text-slate-200 font-bold mb-2">
            Kata Sandi Saat Ini
          </label>
          <input
            type={showhidePassword ? 'text' : 'password'}
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Masukkan Kata Sandi Saat Ini"
            className="w-full bg-background border dark:border-slate-700 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700 dark:text-slate-200 font-bold mb-2">
            Kata Sandi Baru
          </label>
          <input
            type={showhidePassword ? 'text' : 'password'}
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Masukkan Kata Sandi Baru"
            className="w-full bg-background border dark:border-slate-700 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-slate-200 font-bold mb-2">
            Konfirmasi Sandi Baru 
          </label>
          <input
            type={showhidePassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Masukkan Konfirmasi Sandi Baru"
            className="w-full bg-background border dark:border-slate-700 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex flex-row justify-between items-center">
          <button
            type="button"
            className="flex flex-row items-center pr-3 gap-x-2"
            onClick={togglePasswordVisibility}
          >
            Lihat Password
            {showhidePassword ? 
            <input type="checkbox" className="w-5 h-5" checked /> : 
            <input type="checkbox" className="w-5 h-5" />}
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-md focus:outline-none focus:bg-sky-600"
          >
            Save
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </Fragment>
  );
};

export default ChangePassword;
