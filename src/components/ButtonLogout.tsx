'use client';
import {signOut} from 'next-auth/react';
import {Power} from 'lucide-react';
import {RiLogoutCircleLine, RiLogoutCircleRLine} from 'react-icons/ri';

type Props = {};

const ButtonLogout = (props: Props) => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <button
      onClick={handleSignOut}
      className="cursor-pointer inline-flex items-center bg-transparent text-[15px] text-slate-500 mt-0 sm:mt-0"
    >
      <RiLogoutCircleRLine className="text-slate-600 text-[15px] w-4 h-4 mr-2" />{' '}
      Log Out
    </button>
  );
};

export default ButtonLogout;
