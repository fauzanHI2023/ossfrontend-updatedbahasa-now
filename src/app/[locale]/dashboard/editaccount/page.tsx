"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout';
import { getServerSession } from "next-auth";
import { signIn, useSession } from 'next-auth/react';

type Props = {};

const EditAccount: React.FC<Props> = () => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newBirthPlace, setNewBirthPlace] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session, status, update }: any = useSession();

  useEffect(() => {
    console.log("Data session:", session);
    if (session?.user) {
    setNewName(session.user.full_name || '');
    setNewEmail(session.user.email || '');
    
    // Check if phpDonorData exists and update address and birth_place accordingly
    if (session.user.phpDonorData && session.user.phpDonorData.length > 0) {
      setNewAddress(session.user.phpDonorData[0].address || '');
      setNewBirthPlace(session.user.phpDonorData[0].birth_place || '');
    }
  }
  }, [session]);

  const handleSubmit = async () => {
      setError(''); // Clear previous errors

      if (!/^\S+@\S+\.\S+$/.test(newEmail)) {
          setError('Invalid email format');
          return;
      }

      try {
          // Update backend
          const response = await fetch(`https://adminx.human-initiative.org/account-api/update/${session?.user.id}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  full_name: newName,
                  email: newEmail,
                  address: newAddress,
                  birth_place: newBirthPlace,
              }),
          });

          const data = await response.json();
          console.log('Response status:', response.status);
          console.log('Response data:', data);

          if (!response.ok) {
              setError('Failed to update user data');
              return;
          }

          // Update session
          await update({
              full_name: newName,
              email: newEmail,
              address: newAddress,
              birth_place: newBirthPlace,
          });

          // Fetch updated data after update
          const updatedDataResponse = await fetch(`https://adminx.human-initiative.org/account-api/get/${session?.user.id}`);
          const updatedData = await updatedDataResponse.json();
          console.log('Updated data:', updatedData);

          // Update local state with the updated data
          setNewName(updatedData.full_name || '');
          setNewEmail(updatedData.email || '');
          setNewAddress(updatedData.address || '');
          setNewBirthPlace(updatedData.birth_place || '');

          // Update session with the updated data
          const updateResult = await update({
              full_name: updatedData.full_name,
              email: updatedData.email,
              address: updatedData.address,
              birth_place: updatedData.birth_place,
          });
          console.log("Update result:", updateResult);
          console.log('Successfully updated user data');

      } catch (error) {
          setError('An error occurred while updating data');
      }
  };

  if (status === 'loading') return <div>Loading...</div>;

  if (!session) {
    signIn();
    return <div>Redirecting to login...</div>;
  }

  return (
    <DashboardLayout>
      <div className="box mb-4 p-6 bg-white rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Edit Account</h2>
          <h2>Hi, {session?.user.full_name}</h2>
          <div className="mb-4">
            <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="text"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
              Birth Place
            </label>
            <input
              type="text"
              value={newBirthPlace}
              onChange={(e) => setNewBirthPlace(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none focus:bg-indigo-600"
          >
            Save
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </DashboardLayout>
  );
};

export default EditAccount;
