'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {CiBank, CiMobile3, CiWallet} from 'react-icons/ci';
import {PaymentChannel} from '@/components/checkout/UseCheckout'; // atau sesuaikan path-nya

interface PaymentMethodListProps {
  paymentChannels: PaymentChannel[];
  selectedPaymentChannel: number | null;
  handleSelectPaymentChannel: (val: string) => void;
}

const PaymentMethodList = ({
  paymentChannels,
  selectedPaymentChannel,
  handleSelectPaymentChannel
}: PaymentMethodListProps) => {
  return (
    <div className="flex flex-col gap-y-4 mb-2 rounded-xl dark:bg-slate-900 bg-white p-6">
      <h5 className="text-gray-700 text-base font-normal mb-4">
        Select Payment
      </h5>

      <Accordion type="single" collapsible className="w-full">
        {['wallet', 'virtual', 'donation'].map((type) => {
          const iconMap = {
            wallet: <CiWallet className="text-sky-600 w-4 h-4" />,
            virtual: <CiMobile3 className="text-sky-600 w-4 h-4" />,
            donation: <CiBank className="text-sky-600 w-4 h-4" />
          };

          const filteredChannels = paymentChannels.filter((channel) =>
            type === 'donation'
              ? channel.donation_payment_id === 1
              : channel.sender_type ===
                (type === 'wallet' ? 'wallet_account' : 'virtual_account')
          );

          return (
            <AccordionItem value={type} key={type}>
              <AccordionTrigger>
                <div className="flex flex-row gap-x-2 justify-start items-center text-gray-600 text-sm font-normal">
                  {iconMap[type as keyof typeof iconMap]}
                  {type === 'wallet'
                    ? 'E-Wallet'
                    : type === 'virtual'
                      ? 'Virtual Account'
                      : 'Bank Transfer'}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={
                    selectedPaymentChannel
                      ? `${type}-${selectedPaymentChannel}`
                      : ''
                  }
                  onValueChange={handleSelectPaymentChannel}
                  className="flex flex-col gap-y-6"
                >
                  {filteredChannels.map((channel) => (
                    <div
                      key={`${type}-${channel.id}`}
                      className="flex flex-row-reverse items-center justify-between space-x-2"
                    >
                      <RadioGroupItem
                        value={`${type}-${channel.id}`}
                        id={`${type}-${channel.id}`}
                      />
                      <label htmlFor={`${type}-${channel.id}`}>
                        {channel.payment_channel_name}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default PaymentMethodList;
