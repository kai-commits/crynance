import { roundNumber } from '@/helpers/math';
import { TransactionLog } from '@/types';
import { useState } from 'react';
import { CoinModal } from './CoinModal';

export const Transaction = ({
  buyOrSell,
  coinAmount,
  date,
  name,
  symbol,
  usdAmount,
  totalAmount,
}: TransactionLog): JSX.Element => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalBuySell, setModalBuySell] = useState<string>('');
  return (
    <>
      <button
        onClick={() => {
          setModalActive(true);
          setModalOpen(!modalOpen);
          setModalBuySell('sell');
        }}
        className='w-full bg-offwhite max-w-4xl py-2 mt-3 rounded cursor-pointer'
      >
        <div className='flex justify-between items-center'>
          <div className='flex items-center mx-3'>
            <div className='flex flex-col font-medium'>
              <div className='flex text-lg text-blackeye-blue'>
                {buyOrSell === 'buy' ? 'Bought' : 'Sold'}
              </div>
              <div className='flex text-sm text-darkblue'>{date}</div>
            </div>
          </div>
          <div className='flex flex-col items-end mx-3 font-medium'>
            <div className='text-lg'>
              {coinAmount} {symbol}
            </div>
            <div className='text-sm text-darkblue'>
              ${roundNumber(usdAmount, 2)}
            </div>
          </div>
        </div>
      </button>
      <CoinModal
        setModalOpen={setModalOpen}
        modalActive={modalActive}
        modalOpen={modalOpen}
        modalBuySell={modalBuySell}
        name={name}
        symbol={symbol}
        totalAmount={totalAmount}
        coinAmount={coinAmount}
        usdAmount={usdAmount}
        dateString={date}
        remove={true}
      />
    </>
  );
};
