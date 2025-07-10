'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {FaOpencart} from 'react-icons/fa';
import LoadingOverlay from '@/components/ui/utility/loading/LoadingOverlay';
import PopupNotif from '@/components/ui/utility/PopupNotif';
import {CartItem} from '@/components/checkout/UseCheckout';

interface CheckoutSummaryProps {
  cartItems: CartItem[];
  calculateTotalPrice: () => number;
  handleDonateNow: () => void;
  isButtonLoading: boolean;
  showOverlay: boolean;
  notifMessage: string;
  setNotifMessage: (val: string) => void;
}

const CheckoutSummary = ({
  cartItems,
  calculateTotalPrice,
  handleDonateNow,
  isButtonLoading,
  showOverlay,
  notifMessage,
  setNotifMessage
}: CheckoutSummaryProps) => {
  const formatPrice = (amount: number) => {
    return `Rp ${Number(amount)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };
  return (
    <div className="w-[384px] flex flex-col h-full justify-between rounded-3xl dark:bg-slate-800 bg-white p-6 mt-10">
      <h1 className="text-lg font-semibold mb-6 text-sky-500">Checkout</h1>

      <div className="flex flex-col gap-y-1 mb-6">
        <p className="text-slate-800">Price Details</p>
        <ul>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <li
                key={item.campaign_id}
                className="flex flex-wrap justify-between items-center w-full border-b border-slate-200 dark:border-slate-700 py-3"
              >
                <h5 className="text-xs flex items-start w-3/5 text-base font-normal dark:text-white text-gray-500 overflow-hidden">
                  {item.name}
                </h5>
                <p className="text-xs font-semibold w-2/5 flex justify-end items-center text-sky-700 h-[40px]">
                  {formatPrice(item.amount * item.quantity)}
                </p>
              </li>
            ))
          ) : (
            <li className="text-gray-400 text-sm">No items in cart.</li>
          )}
        </ul>
      </div>

      <div className="flex flex-row w-full justify-between mb-3">
        <p>Total</p>
        <p>{formatPrice(calculateTotalPrice())}</p>
      </div>

      <AnimatePresence>{showOverlay && <LoadingOverlay />}</AnimatePresence>

      <motion.button
        onClick={handleDonateNow}
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}}
        transition={{type: 'spring', stiffness: 400, damping: 10}}
        disabled={isButtonLoading}
        className="bg-sky-950 text-white p-2 rounded w-full flex gap-x-2 justify-center items-center"
      >
        {isButtonLoading ? (
          <motion.div
            className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
          />
        ) : (
          <>
            <FaOpencart /> Complete Donation
          </>
        )}
      </motion.button>

      <PopupNotif
        message={notifMessage}
        duration={3000}
        onClose={() => setNotifMessage('')}
      />
    </div>
  );
};

export default CheckoutSummary;
