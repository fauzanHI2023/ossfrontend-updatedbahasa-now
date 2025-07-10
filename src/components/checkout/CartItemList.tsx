import Image from 'next/image';
import Link from 'next/link';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {TbShoppingCartOff} from 'react-icons/tb';

export const CartItemList = ({
  cartItems,
  formatPrice,
  handleDeleteItem
}: any) => (
  <div className="rounded-2xl bg-white dark:bg-slate-900 p-6">
    <h5 className="text-gray-700 text-base font-normal">Select Item</h5>
    {cartItems.length > 0 ? (
      cartItems.map((item: any) => (
        <div
          key={item.campaign_id}
          className="flex justify-between items-center border-b py-2"
        >
          <Link
            href={`/campaign/${item.slug}`}
            className="flex w-full gap-3 items-center"
          >
            <Image
              src={`https://cdnx.human-initiative.org/image/${item.image}`}
              alt={item.name}
              width={100}
              height={100}
              className="rounded-md object-cover"
            />
            <div className="flex flex-col w-full">
              <h5 className="text-sm font-normal text-gray-500 dark:text-white">
                {item.name}
              </h5>
              <p className="text-slate-950 text-sm font-medium">
                {formatPrice(item.amount)}{' '}
                <span className="text-slate-700">x {item.quantity}</span>
              </p>
            </div>
          </Link>
          <button
            onClick={() => handleDeleteItem(item.campaign_id)}
            className="text-xs text-red-400 hover:text-red-500"
          >
            <RiDeleteBin6Line size={12} /> Delete
          </button>
        </div>
      ))
    ) : (
      <div className="flex items-center justify-center w-full p-4">
        <TbShoppingCartOff className="text-gray-600" />
        <h6 className="text-gray-400 text-xs ml-2">Your cart is empty.</h6>
      </div>
    )}
  </div>
);
