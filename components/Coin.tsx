import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { roundNumber } from '../helpers/math';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  currentMarketValue: number;
  priceChangePercentage: number;
  user: string | null | undefined;
  coinValue: (coinAmount: number, usdValue: number) => void;
}

export const Coin = ({
  id,
  name,
  symbol,
  logo,
  currentMarketValue,
  priceChangePercentage,
  user,
  coinValue,
}: Coin): JSX.Element => {
  const [total, setTotal] = useState<{
    totalUSDValue: number;
    totalAmount: number;
  }>({ totalAmount: 0, totalUSDValue: 0 });

  useEffect(() => {
    axios
      .get(`api/db/coinValue/${name}?user=${user}`)
      .then((res) => setTotal(res.data));
  }, [name, user]);

  useEffect(() => {
    coinValue(total.totalAmount, currentMarketValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinValue, total.totalAmount]);

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
            <div className='text-lg'>{roundNumber(total.totalAmount, 4)}</div>
            <div className='text-sm text-darkblue'>${roundNumber(total.totalAmount * currentMarketValue, 2)}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
