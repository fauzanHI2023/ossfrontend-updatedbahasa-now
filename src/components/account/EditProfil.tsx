"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import LocationAutocomplete from "./EditLocation";

type Props = {
  setisEditProfil: (e: boolean) => void;
  userType: string;
};

const EditProfil: React.FC<Props> = ({ setisEditProfil, userType }) => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newBirthPlace, setNewBirthPlace] = useState("");
  const [newBirthDate, setNewBirthDate] = useState("");
  const [newReligi, setNewReligi] = useState("");
  const [newBloodType, setNewBloodType] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newIdentity, setNewIdentity] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newInstagram, setNewInstagram] = useState("");
  const [newLinkedin, setNewLinkedin] = useState("");
  const [newFacebook, setNewFacebook] = useState("");
  const [newYoutube, setNewYoutube] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [lastSelectedId, setLastSelectedId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status, update }: any = useSession();

  useEffect(() => {
    // console.log("Data session:", session);
    if (session?.user) {
      setNewName(session.user.full_name || "");
      setNewEmail(session.user.email || "");

      // Check if phpDonorData exists and update address and birth_place accordingly
      if (session.user.phpDonorData && session.user.phpDonorData.length > 0) {
        setNewAddress(session.user.phpDonorData[0].address || "");
        setNewBirthPlace(session.user.phpDonorData[0].birth_place || "");
        setNewBirthDate(session.user.phpDonorData[0].birth_date || "");
        setNewReligi(session.user.phpDonorData[0].religion || "");
        setNewBloodType(session.user.phpDonorData[0].blood_type || "");
        setNewGender(session.user.phpDonorData[0].sex || "");
        setNewIdentity(session.user.phpDonorData[0].identity_no || "");
        setNewWebsite(session.user.phpDonorData[0].website || "");
      }

      if (session.user.contactInformation && session.user.contactInformation.length > 0) {
        const contactInfo = session.user.contactInformation[0];
        setNewInstagram(contactInfo.instagram || "");
        setNewFacebook(contactInfo.facebook || "");
        setNewLinkedin(contactInfo.linkedin || "");
        setNewYoutube(contactInfo.youtube || "");
        setNewWebsite(contactInfo.website || "");
      }

      if (session.user.phones && session.user.phones.length > 0) {
        const phoneInfo = session.user.phones[0];
        setNewPhone(phoneInfo.phone_no || "");
      }
      // console.log(session.user.phones);
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
            address: newAddress,
            birth_place: newBirthPlace,
            birth_date: newBirthDate,
            religion: newReligi,
            blood_type: newBloodType,
            sex: newGender,
            identity_no: newIdentity,
            website: newWebsite,
            location_id: lastSelectedId,
            instagram: newInstagram,
            linkedin: newLinkedin,
            youtube: newYoutube,
            facebook: newFacebook,
            phone_no: newPhone,
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
        address: newAddress,
        birth_place: newBirthPlace,
        birth_date: newBirthDate,
        religion: newReligi,
        blood_type: newBloodType,
        sex: newGender,
        identity_no: newIdentity,
        website: newWebsite,
        location_id: lastSelectedId,
        instagram: newInstagram,
        linkedin: newLinkedin,
        facebook: newFacebook,
        youtube: newYoutube,
        phone_no: newPhone,
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
      setNewAddress(updatedData.address || "");
      setNewBirthPlace(updatedData.birth_place || "");
      setNewBirthDate(updatedData.birth_date || "");
      setNewReligi(updatedData.religion || "");
      setNewBloodType(updatedData.blood_type || "");
      setNewGender(updatedData.sex || "");
      setNewIdentity(updatedData.identity_no || "");
      setNewWebsite(updatedData.website || "");

      // Update session with the updated data
      const updateResult = await update({
        full_name: updatedData.full_name,
        email: updatedData.email,
        address: updatedData.address,
        birth_place: updatedData.birth_place,
        birth_date: updatedData.birth_date,
        religion: updatedData.religion,
        blood_type: updatedData.blood_type,
        sex: updatedData.sex,
        identity_no: updatedData.identity_no,
        website: updatedData.website,
        location_id: updatedData.location_id,
      });
      // console.log("Update result:", updateResult);
      // console.log("Successfully updated user data");
      setisEditProfil(false);
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
        {userType === "personal" && (
          <>
            <div className="flex flex-row justify-between mb-4">
              <div
                className="flex flex-row justify-center items-center cursor-pointer"
                onClick={() => {
                  setisEditProfil(false);
                }}
              >
                <MdArrowBack className="text-sky-500 text-xl" />
                <h4 className="text-sky-500 text-base">Kembali</h4>
              </div>
              <div className="flex flex-row justify-center items-center">
                <h2 className="text-lg font-semibold">Edit Profil</h2>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="text" className="block dark:text-slate-200 text-gray-700 font-bold mb-2">
                Tempat Lahir
              </label>
              <input
                type="text"
                value={newBirthPlace}
                onChange={(e) => setNewBirthPlace(e.target.value)}
                className="w-full border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500 dark:focus:border-sky-500 bg-background"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="text" className="block dark:text-slate-200 text-gray-700 font-bold mb-2">
                Tanggal Lahir
              </label>
              <input
                type="date"
                value={newBirthDate}
                onChange={(e) => setNewBirthDate(e.target.value)}
                className="w-full border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500 dark:focus:border-sky-500 bg-background"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block dark:text-slate-200 text-gray-700 font-bold mb-2"
              >
                Jenis Kelamin
              </label>
              <select
                id="gender"
                value={newGender}
                onChange={(e) => setNewGender(e.target.value)}
                className="w-full border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500 dark:focus:border-sky-500 bg-background"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="1">Pria</option>
                <option value="2">Wanita</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="text" className="block dark:text-slate-200 text-gray-700 font-bold mb-2">
                Golongan Darah
              </label>
              <input
                type="text"
                value={newBloodType}
                onChange={(e) => setNewBloodType(e.target.value)}
                className="w-full border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500 dark:focus:border-sky-500 bg-background"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="text" className="block dark:text-slate-200 text-gray-700 font-bold mb-2">
                Agama
              </label>
              <select
                id="religi"
                value={newReligi}
                onChange={(e) => setNewReligi(e.target.value)}
                className="w-full border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500 dark:focus:border-sky-500 bg-background"
              >
                <option value="">Pilih Agama</option>
                <option value="islam">Islam</option>
                <option value="kristen">Kristen</option>
                <option value="katolik">Katolik</option>
                <option value="hindu">Hindu</option>
                <option value="budha">Budha</option>
                <option value="konghuchu">Konghuchu</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="text" className="block dark:text-slate-200 text-gray-700 font-bold mb-2">
                Alamat
              </label>
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="w-full border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500 dark:focus:border-sky-500 bg-background"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="text" className="block dark:text-slate-200 text-gray-700 font-bold mb-2">
                Provinsi
              </label>
              <LocationAutocomplete
                onLastSelectedChange={(id: number) => setLastSelectedId(id)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="text" className="block dark:text-slate-200 text-gray-700 font-bold mb-2">
                No Hp
              </label>
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="w-full border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500 dark:focus:border-sky-500 bg-background"
              />
            </div>
          </>
        )}
        {userType === "company" && (
          <>
            <div className="flex flex-row justify-between mb-4">
              <div
                className="flex flex-row justify-center items-center cursor-pointer"
                onClick={() => {
                  setisEditProfil(false);
                }}
              >
                <MdArrowBack className="text-sky-500 text-xl" />
                <h4 className="text-sky-500 text-base">Kembali</h4>
              </div>
              <div className="flex flex-row justify-center items-center">
                <h2 className="text-lg font-semibold">Edit Profil</h2>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="text" className="block dark:text-slate-200 text-gray-700 font-bold mb-2">
                Alamat
              </label>
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="w-full border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500 dark:focus:border-sky-500 bg-background"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="text" className="block dark:text-slate-200 text-gray-700 font-bold mb-2">
                Provinsi
              </label>
              <LocationAutocomplete
                onLastSelectedChange={(id: number) => setLastSelectedId(id)}
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <label htmlFor="text" className="block dark:text-slate-200 text-gray-700 font-bold mb-2">
            Instagram
          </label>
          <input
            type="text"
            value={newInstagram}
            onChange={(e) => setNewInstagram(e.target.value)}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500 dark:focus:border-sky-500 bg-background"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block dark:text-slate-200 text-gray-700 font-bold mb-2">
            Linkedin
          </label>
          <input
            type="text"
            value={newLinkedin}
            onChange={(e) => setNewLinkedin(e.target.value)}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500 dark:focus:border-sky-500 bg-background"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block dark:text-slate-200 text-gray-700 font-bold mb-2">
            Facebook
          </label>
          <input
            type="text"
            value={newFacebook}
            onChange={(e) => setNewFacebook(e.target.value)}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500 dark:focus:border-sky-500 bg-background"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block dark:text-slate-200 text-gray-700 font-bold mb-2">
            Youtube
          </label>
          <input
            type="text"
            value={newYoutube}
            onChange={(e) => setNewYoutube(e.target.value)}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500 dark:focus:border-sky-500 bg-background"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block dark:text-slate-200 text-gray-700 font-bold mb-2">
            Website
          </label>
          <input
            type="text"
            value={newWebsite}
            onChange={(e) => setNewWebsite(e.target.value)}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500 dark:focus:border-sky-500 bg-background"
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

export default EditProfil;
