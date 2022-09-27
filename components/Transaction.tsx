// bought, sold, date, amount, amount in usd

import { TransactionLog } from '@/types';

export const Transaction = ({
  buyOrSell,
  symbol,
  coinAmount,
  date,
  usdAmount,
}: TransactionLog): JSX.Element => {
  return (
    <div className='w-full bg-offwhite max-w-4xl py-2 mt-3 rounded cursor-pointer'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center mx-3'>
          <div className='flex flex-col font-medium'>
            <div className='text-lg text-blackeye-blue'>{buyOrSell === 'buy' ? 'Bought' : 'Sold'}</div>
            <div className='flex'>
              <div className='text-sm text-darkblue'>{date}</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-end mx-3 font-medium'>
          <div className='text-lg'>{coinAmount} {symbol}</div>
          <div className='text-sm text-darkblue'>${usdAmount}</div>
        </div>
      </div>
    </div>
  );
};
