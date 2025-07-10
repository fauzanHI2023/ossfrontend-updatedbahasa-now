import {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import Cookies from 'js-cookie';

import {fetchCampaign} from '@/lib/donation/campaign/auth-campaign';
import {fetchPaymentChannel} from '@/lib/donation/transaction/auth-payment-channel';
import {fetchDeleteCart} from '@/lib/donation/transaction/auth-delete-cart';
import {useCart} from '@/context/CartContext';
import Swal from 'sweetalert2';

export interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  phones: {phone_no: string};
  phpDonorData: {id: number};
}

export interface CartItem {
  campaign_id: number;
  name: string;
  image?: string;
  amount: number;
  quantity: number;
  cookies_id: any;
  slug: any;
}

export interface PaymentChannel {
  id: number;
  name: string;
  donation_payment_id: number;
  payment_channel_name: string;
  sender_type: string;
}

export const useCheckout = () => {
  const {data: session, status} = useSession();
  const {cartItems, setCartItems, removeItemFromCart, clearCart} = useCart();
  const [userId, setUserId] = useState<number | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState<string | undefined>('');
  const [anonim, setAnonim] = useState(false);
  const [paymentChannels, setPaymentChannels] = useState<PaymentChannel[]>([]);
  const [selectedPaymentChannel, setSelectedPaymentChannel] = useState<
    number | null
  >(null);
  const [notifMessage, setNotifMessage] = useState('');
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const router = useRouter();

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

      setIsButtonLoading(true);

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
        setTimeout(() => {
          setShowOverlay(true);

          // Setelah overlay muncul, delay sebelum redirect
          setTimeout(() => {
            if (isBankTransfer) {
              router.push(
                `/paymentbanktransfer?transaction_id=${data.transaction_id}`
              );
            } else {
              router.push(data.flip_response.payment_url);
            }
          }, 2000);
        }, 1500);
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

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    anonim,
    setAnonim,
    paymentChannels,
    selectedPaymentChannel,
    setSelectedPaymentChannel,
    notifMessage,
    setNotifMessage,
    handleDonateNow,
    handleDeleteItem,
    calculateTotalPrice,
    isButtonLoading,
    showOverlay,
    cartItems
  };
};
