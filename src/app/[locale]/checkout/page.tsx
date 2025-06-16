'use client';
import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {fetchCampaign} from '@/lib/donation/campaign/auth-campaign';
import {fetchPaymentChannel} from '@/lib/donation/transaction/auth-payment-channel';
import {fetchDeleteCart} from '@/lib/donation/transaction/auth-delete-cart';
import Link from 'next/link';
import Swal from 'sweetalert2';
import PopupNotif from '@/components/ui/utility/PopupNotif';
import {useSession} from 'next-auth/react';
import {useCart} from '@/context/CartContext';
import {FaCartPlus, FaOpencart} from 'react-icons/fa';
import Cookies from 'js-cookie';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Image from 'next/image';
import {Variable} from 'lucide-react';
import {TbShoppingCartOff, TbShoppingCartX} from 'react-icons/tb';
import {CiWallet, CiBank, CiMobile3, CiViewList} from 'react-icons/ci';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';

interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  phones: {phone_no: string};
  phpDonorData: {id: number};
}

interface CartItem {
  campaign_id: number;
  name: string;
  image?: string;
  amount: number;
  quantity: number;
  cookies_id: any;
  slug: any;
}

interface PaymentChannel {
  id: number;
  name: string;
  donation_payment_id: number;
  payment_channel_name: string;
  sender_type: string;
}

const Checkout: React.FC = () => {
  const {data: session, status} = useSession();
  const [paymentChannels, setPaymentChannels] = useState<PaymentChannel[]>([]);
  const [selectedPaymentChannel, setSelectedPaymentChannel] = useState<
    number | null
  >(null);
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string | undefined>('');
  const {cartItems, setCartItems, removeItemFromCart, clearCart} = useCart();
  const [notifMessage, setNotifMessage] = useState('');
  const [anonim, setAnonim] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const selectedChannel = paymentChannels.find(
    (channel) => channel.id === selectedPaymentChannel
  );

  const handleAnonimChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnonim(e.target.checked);
  };

  const formatPrice = (amount: number) => {
    return `Rp ${Number(amount)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  useEffect(() => {
    if (status === 'authenticated' && session) {
      const user = session.user as User;
      setUserId(user.phpDonorData.id);
      setFullName(user.full_name);
      setEmail(user.email);
      setPhone(user.phones.phone_no);
    }

    const cartItems = JSON.parse(localStorage.getItem('osscart') || '[]');

    // Gabungkan quantity jika campaign_id sama
    const mergedCart: CartItem[] = [];
    cartItems.forEach((item: CartItem) => {
      const existingItem = mergedCart.find(
        (c) => c.campaign_id === item.campaign_id
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        mergedCart.push({...item});
      }
    });

    setCartItems(mergedCart);

    const updateCartWithCampaignNames = async () => {
      try {
        // Ambil semua data kampanye
        const allCampaigns = await fetchCampaign(); // fetchCampaign mengembalikan semua data

        if (!allCampaigns || !allCampaigns.data) {
          console.error('Failed to fetch campaigns or no data found.');
          return;
        }

        // Perbarui item di cart berdasarkan data kampanye
        const updatedCart = mergedCart.map((item) => {
          const campaignData = allCampaigns.data.find(
            (campaign: {id: number}) => campaign.id === item.campaign_id
          );

          if (campaignData) {
            item.name = campaignData.campaign_name;
            item.image = campaignData.campaign_img;
            item.slug = campaignData.slug;
          } else {
            console.warn(
              `Campaign data mismatch or missing for item. Item campaign_id: ${item.campaign_id}, API id: undefined`
            );
          }

          return item;
        });

        // Simpan hasil di state
        setCartItems(updatedCart);
      } catch (error) {
        console.error('Error updating cart with campaign names:', error);
      }
    };

    updateCartWithCampaignNames();

    const fetchChannels = async () => {
      try {
        const channels = await fetchPaymentChannel();
        setPaymentChannels(channels.data || []);
      } catch (error) {
        console.error('Error fetching payment channels:', error);
      }
    };

    fetchChannels();

    const loadSnapScript = () => {
      const script = document.createElement('script');
      script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
      script.setAttribute('data-client-key', 'SB-Mid-client-UF_dlhjGXoaigX0y');
      script.async = true;
      script.onload = () => {
        console.log('Snap script loaded successfully.');
      };
      script.onerror = () => {
        console.error('Failed to load Snap script.');
      };
      document.body.appendChild(script);
    };

    loadSnapScript();
  }, [status, session]);

  const handleDonateNow = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId && (!fullName || !email)) {
      setNotifMessage('Enter Your Information');
      return;
    }

    try {
      // Pastikan ada metode pembayaran yang dipilih
      const selectedPayment = paymentChannels.find(
        (channel) => channel.id === selectedPaymentChannel
      );

      if (!selectedPayment) {
        setNotifMessage('Pilih metode pembayaran terlebih dahulu.');
        return;
      }

      // Tentukan endpoint berdasarkan metode pembayaran
      const isBankTransfer = selectedPayment.donation_payment_id === 1;

      const endpoint = isBankTransfer
        ? 'https://adminx.human-initiative.org/donation/create-transaction-bank-transfer'
        : 'https://adminx.human-initiative.org/donation/create-transaction-flip';

      // Kirim data transaksi
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          full_name: fullName,
          email: email,
          phone: phone,
          payment_channel_id: selectedPaymentChannel,
          is_anonim: anonim,
          items: cartItems.map((item) => ({
            campaign_id: item.campaign_id,
            quantity: item.quantity,
            price: item.amount
          }))
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        const cookiesId = Cookies.get('osscart');

        if (cookiesId) {
          // Hapus data transaksi menggunakan cookies_id
          await fetchDeleteCart(cookiesId);
        }
        clearCart();
        // Navigasi berdasarkan metode pembayaran
        if (isBankTransfer) {
          router.push(
            `/paymentbanktransfer?transaction_id=${data.transaction_id}`
          );
        } else {
          router.push(data.flip_response.payment_url);
        }
      } else {
        console.error('Error creating transaction:', data.message);
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  const handleSelectPaymentChannel = (value: string) => {
    if (!value) return;

    const [type, id] = value.split('-');
    setSelectedPaymentChannel(Number(id));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.amount * item.quantity,
      0
    );
  };

  const handleDeleteItem = (campaignId: number) => {
    removeItemFromCart(campaignId);
    Swal.fire({
      icon: 'success',
      title: 'Item removed',
      text: 'The selected item has been removed from your cartItems.',
      timer: 2000,
      showConfirmButton: false
    });
  };

  return (
    <main className="flex min-h-screen flex-row justify-center gap-x-4 px-16 py-36 bg-gray-100 dark:bg-slate-950">
      <div className="box flex flex-col gap-y-2 w-[800px]">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
            Donation Information
          </h1>
          <Link
            href={`/takeaction/donate`}
            className="flex flex-row justify-center items-center gap-x-2 py-2 px-3 rounded bg-sky-600 text-white dark:bg-sky-900 dark:text-slate-200 transition ease-in duration-300 hover:bg-sky-800 dark:hover:bg-sky-600"
          >
            <FaCartPlus />
            Add Donate
          </Link>
        </div>
        <div className="mb-2 rounded-2xl bg-white dark:bg-slate-900 p-6">
          <h5 className="text-gray-700 text-base font-normal">Select Item</h5>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.campaign_id}
                className="flex flex-wrap justify-between items-center w-full border-b border-gray-100 dark:border-slate-700 py-2"
              >
                <Link
                  href={`/campaign/${item.slug}`}
                  className="flex flex-wrap justify-between items-center w-full py-2"
                >
                  <div className="flex flex-row w-3/5 gap-x-3 items-center">
                    <Image
                      src={`https://cdnx.human-initiative.org/image/${item.image}`}
                      alt={item.name || 'Campaign Image'}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                    <h5 className="flex items-start text-[15px] font-normal dark:text-white text-gray-500 overflow-hidden">
                      {item.name}
                    </h5>
                  </div>
                  <p className="flex items-center text-slate-950 text-sm font-medium h-[40px]">
                    {formatPrice(item.amount)}{' '}
                    <span className="text-slate-700 pl-1">
                      x {item.quantity}
                    </span>
                  </p>
                </Link>
                <div className="flex gap-x-4 w-full items-center justify-end">
                  <button
                    className="text-xs text-red-400 hover:text-red-500 transition duration-300 ease-in flex items-center gap-x-2"
                    onClick={() => handleDeleteItem(item.campaign_id)}
                  >
                    <RiDeleteBin6Line size={12} />
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-row items-center justify-center w-full mb-2 rounded-xl dark:bg-slate-800 bg-white">
              <TbShoppingCartOff className="text-gray-600" />
              <h6 className="text-gray-400 text-xs">Your cart is empty.</h6>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-y-4 mb-2 rounded-2xl dark:bg-slate-900 bg-white p-6">
          <h5 className="text-gray-700 text-base font-normal">
            Your Information
          </h5>
          {status !== 'authenticated' && (
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
                className="border p-2 px-4 rounded-lg mb-2 focus:outline text-sm"
              />
              {/* <input
                type="text"
                value={phone}
                placeholder="No Handphone"
                onChange={(e) => setPhone(e.target.value)}
                className="border p-2 rounded"
              /> */}
              <PhoneInput
                placeholder="Enter phone number"
                international
                value={phone}
                onChange={(setValue) => setPhone(setValue)}
                className="border p-2 px-4 rounded-lg dark:bg-black text-sm"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-y-4 mb-2 rounded-xl dark:bg-slate-900 bg-white p-6">
          <h5 className="text-gray-700 text-base font-normal mb-4">
            Select Payment
          </h5>

          <Accordion type="single" collapsible className="w-full">
            {/* Wallet Accordion */}
            <AccordionItem value="wallet">
              <AccordionTrigger className="">
                <div className="flex flex-row gap-x-2 justify-start items-center text-gray-600 text-sm font-normal">
                  <CiWallet className="text-sky-600 w-4 h-4" />
                  E-Wallet
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={
                    selectedPaymentChannel
                      ? `wallet-${selectedPaymentChannel}`
                      : ''
                  }
                  onValueChange={handleSelectPaymentChannel}
                  className="flex flex-col gap-y-6"
                >
                  {paymentChannels
                    .filter(
                      (channel) => channel.sender_type === 'wallet_account'
                    )
                    .map((channel) => (
                      <div
                        key={`wallet-${channel.id}`}
                        className="flex flex-row-reverse items-center justify-between space-x-2"
                      >
                        <RadioGroupItem
                          value={`wallet-${channel.id}`}
                          id={`wallet-${channel.id}`}
                        />
                        <label htmlFor={`wallet-${channel.id}`}>
                          {channel.payment_channel_name}
                        </label>
                      </div>
                    ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>

            {/* Virtual Account Accordion */}
            <AccordionItem value="virtual">
              <AccordionTrigger>
                <div className="flex flex-row gap-x-2 justify-start items-center text-gray-600 text-sm font-normal">
                  <CiMobile3 className="text-sky-600 w-4 h-4" />
                  Virtual Account
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={
                    selectedPaymentChannel
                      ? `virtual-${selectedPaymentChannel}`
                      : ''
                  }
                  onValueChange={handleSelectPaymentChannel}
                  className="flex flex-col gap-y-6"
                >
                  {paymentChannels
                    .filter(
                      (channel) => channel.sender_type === 'virtual_account'
                    )
                    .map((channel) => (
                      <div
                        key={`virtual-${channel.id}`}
                        className="flex flex-row-reverse items-center justify-between space-x-2"
                      >
                        <RadioGroupItem
                          value={`virtual-${channel.id}`}
                          id={`virtual-${channel.id}`}
                        />
                        <label htmlFor={`virtual-${channel.id}`}>
                          {channel.payment_channel_name}
                        </label>
                      </div>
                    ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>

            {/* Special Donation Accordion */}
            <AccordionItem value="donation">
              <AccordionTrigger>
                <div className="flex flex-row gap-x-2 justify-start items-center text-gray-600 text-sm font-normal">
                  <CiBank className="text-sky-600 w-4 h-4" />
                  Bank Transfer
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={
                    selectedPaymentChannel
                      ? `donation-${selectedPaymentChannel}`
                      : ''
                  }
                  onValueChange={handleSelectPaymentChannel}
                  className="flex flex-col gap-y-6"
                >
                  {paymentChannels
                    .filter((channel) => channel.donation_payment_id === 1)
                    .map((channel) => (
                      <div
                        key={`donation-${channel.id}`}
                        className="flex flex-row-reverse items-center justify-between space-x-2"
                      >
                        <RadioGroupItem
                          value={`donation-${channel.id}`}
                          id={`donation-${channel.id}`}
                          className="text-sky-400"
                        />
                        <label htmlFor={`donation-${channel.id}`}>
                          {channel.payment_channel_name}
                        </label>
                      </div>
                    ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="w-[384px] flex flex-col h-full justify-between shadow-xl rounded-xl dark:bg-slate-800 bg-white p-6 mt-10">
        <h1 className="text-lg font-semibold mb-6 text-sky-500">Checkout</h1>
        <div className="flex flex-col gap-y-1 mb-6">
          <p className="text-slate-800">Price Details</p>
          <ul>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <li
                  key={item.campaign_id}
                  className="flex flex-wrap justify-between justify-start items-center w-full border-b border-slate-200 dark:border-slate-700 py-3"
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
              <div className="flex flex-row items-center justify-center w-full mb-2 rounded-xl dark:bg-slate-800 bg-white"></div>
            )}
          </ul>
        </div>
        <div className="flex flex-row w-full justify-between mb-3">
          <p>Total</p>
          <p>{formatPrice(calculateTotalPrice())}</p>
        </div>
        <button
          onClick={handleDonateNow}
          className="bg-sky-950 hover:bg-sky-600 transition duration-200 text-white p-2 rounded w-full flex gap-x-2 justify-center items-center"
        >
          <FaOpencart /> Complete Donation
        </button>
      </div>
      <PopupNotif
        message={notifMessage}
        duration={3000}
        onClose={() => setNotifMessage('')}
      />
    </main>
  );
};

export default Checkout;
