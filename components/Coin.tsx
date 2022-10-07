import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { roundNumber } from '../helpers/math';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  currentMarketValue: number;
  priceChangePercentage: number;
  totalAmount: number;
  totalUSDValue: number;
}

export const Coin = ({
  id,
  name,
  symbol,
  logo,
  currentMarketValue,
  priceChangePercentage,
  totalAmount,
}: Coin): JSX.Element => {
  return (
    <Link href={`/${id}`}>
      <div className='w-full bg-offwhite max-w-4xl py-2 mt-3 rounded cursor-pointer'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center mx-1'>
            <div className='flex px-2 items-center min-w-max'>
              <Image src={logo} width={35} height={35} alt={symbol} />
            </div>
            <div className='flex flex-col font-medium'>
              <div className='text-lg text-blackeye-blue'>{name}</div>
              <div className='flex'>
                <div className='text-sm text-darkblue'>
                  ${roundNumber(currentMarketValue, 5)}
                </div>
                {priceChangePercentage > 0 ? (
                  <div className='text-sm text-green-500 px-2'>
                    {roundNumber(priceChangePercentage, 2)}%
                  </div>
                ) : (
                  <div className='text-sm text-red-500 px-2'>
                    {roundNumber(priceChangePercentage, 2)}%
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-col items-end mx-3 font-medium'>
            <div className='text-lg'>{roundNumber(totalAmount, 4)}</div>
            <div className='text-sm text-darkblue'>
              ${roundNumber(totalAmount * currentMarketValue, 2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
