import React, {useState, useEffect} from 'react';
import {useCart} from '@/context/CartContext';
import {fetchCampaign} from '@/lib/donation/campaign/auth-campaign';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';

interface CartItem {
  campaign_name: string;
  campaign_img: string;
  slug: string;
  cookies_id: number;
  campaign_id: number;
  quantity: number;
  name: string;
  amount: number;
  image?: string;
}

const Cart = () => {
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [cartDetails, setCartDetails] = useState<CartItem[]>([]);
  const {cartItems, cartCount} = useCart();

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        // Step 1: Fetch all campaigns data
        const allCampaigns = await fetchCampaign(); // Mengambil semua data campaign

        // Step 2: Match cartItems with campaigns data
        const updatedCartItems = cartItems.map((item) => {
          const campaignData = allCampaigns.data.find(
            (campaign: {id: number}) => campaign.id === item.campaign_id
          ); // Mencocokkan campaign_id
          // console.log('Matching campaignData:', campaignData); // Debug log

          return {
            ...item,
            campaign_name: campaignData?.campaign_name || 'Unknown Campaign',
            campaign_img: campaignData?.campaign_img || '/default-image.jpg',
            slug: campaignData?.slug || 'not-found'
          };
        });

        // console.log('Updated Cart Items:', updatedCartItems); // Debug log
        setCartDetails(updatedCartItems); // Set state dengan data yang diperbarui
      } catch (error) {
        console.error('Error fetching campaign data:', error);
      }
    };

    if (cartItems.length > 0) {
      fetchCartDetails();
    }
  }, [cartItems]);

  const formatPrice = (amount: number) => {
    return `Rp ${Number(amount)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };
  return (
    <div
      className="relative flex justify-center items-center bg-slate-200 dark:bg-slate-700 py-2 px-2 rounded"
      onMouseEnter={() => setShowCartDropdown(true)}
      onMouseLeave={() => setShowCartDropdown(false)}
    >
      <AiOutlineShoppingCart className="text-2xl cursor-pointer" />
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-amber-400 dark:bg-red-500 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
          {cartCount}
        </span>
      )}
      {showCartDropdown && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-10 top-0 left-0 transition-opacity duration-200 ease-in w-full h-full"
          style={{top: '84px'}}
        >
          <div
            className="absolute top-0 right-0 bg-gray-50 dark:bg-slate-900 w-96 rounded-xl border-slate-100 shadow-2xl"
            style={{right: '20%', top: '-20px'}}
          >
            <div className="flex flex-row justify-between items-center border-b">
              <h3 className="text-base font-semibold p-4">
                Cart <span className="text-sm pl-2">{cartCount}</span>
              </h3>
              {cartItems.length > 0 && (
                <div className="p-4 border-t">
                  <Link href="/checkout">
                    <button className="w-full text-sky-600">See All</button>
                  </Link>
                </div>
              )}
            </div>
            <ul className="p-4 flex flex-col gap-y-5">
              {cartDetails.length > 0 ? (
                cartDetails.map((item) => (
                  <li
                    key={item.campaign_id}
                    className="flex flex-row w-full mb-2 justify-between items-center"
                  >
                    <Link href={`/campaign/${item.slug}`}>
                      <div className="flex items-center gap-4">
                        <Image
                          src={`https://cdnx.human-initiative.org/image/${item.campaign_img}`}
                          alt={item.campaign_name || 'Campaign Image'}
                          width={100}
                          height={100}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <div>
                          <h4 className="text-sm font-medium">
                            {item.campaign_name}
                          </h4>
                          <p className="text-xs text-slate-700 dark:text-slate-300 ">
                            {formatPrice(item.amount)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-center text-gray-500">Keranjang kosong.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
