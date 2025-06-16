"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  setisEditAkun: (e: boolean) => void;
};

const EditAccount: React.FC<Props> = ({ setisEditAkun }) => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status, update }: any = useSession();

  useEffect(() => {
    // console.log("Data session:", session);
    if (session?.user) {
      setNewName(session.user.full_name || "");
      setNewEmail(session.user.email || "");
    }
  }, [session]);

  const handleSubmit = async () => {
    setError(""); // Clear previous errors

    if (!/^\S+@\S+\.\S+$/.test(newEmail)) {
      setError("Invalid email format");
      return;
    }

    try {
      // Update backend
      const response = await fetch(
        `https://adminx.human-initiative.org/account-api/update/${session?.user?.phpDonorData[0].id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: newName,
            email: newEmail,
          }),
        }
      );

      const data = await response.json();
      // console.log("Response status:", response.status);
      // console.log("Response data:", data);

      if (!response.ok) {
        setError("Failed to update user data");
        return;
      }

      // Update session
      await update({
        full_name: newName,
        email: newEmail,
      });

      // Fetch updated data after update
      const updatedDataResponse = await fetch(
        `https://adminx.human-initiative.org/account-api/get/${session?.user?.phpDonorData[0].id}`
      );
      const updatedData = await updatedDataResponse.json();
      // console.log("Updated data:", updatedData);

      // Update local state with the updated data
      setNewName(updatedData.full_name || "");
      setNewEmail(updatedData.email || "");

      // Update session with the updated data
      const updateResult = await update({
        full_name: updatedData.full_name,
        email: updatedData.email,
      });
      // console.log("Update result:", updateResult);
      // console.log("Successfully updated user data");
      setisEditAkun(false);
    } catch (error) {
      setError("An error occurred while updating data");
    }
  };

  if (!session) {
    signIn();
    return <div>Redirecting to login...</div>;
  }

  return (
    <Fragment>
      <div className="box mb-4 p-6 dark:bg-slate-900 bg-white rounded-xl">
        <div className="flex flex-row justify-between mb-4">
          <div
            className="flex flex-row justify-center items-center cursor-pointer"
            onClick={() => {
              setisEditAkun(false);
            }}
          >
            <MdArrowBack className="text-sky-500 text-xl" />
            <h4 className="text-sky-500 text-base">Kembali</h4>
          </div>
          <div className="flex flex-row justify-center items-center">
            <h2 className="text-lg font-semibold">Edit Akun</h2>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700 dark:text-slate-200 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full bg-background border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700 dark:text-slate-200 font-bold mb-2">
            Email
          </label>
          <input
            type="text"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full bg-background border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex flex-row justify-end">
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

export default EditAccount;
