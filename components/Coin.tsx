import Link from 'next/link';
import { Smile } from 'react-feather';

interface Coin {
  name: string;
  symbol: string;
  logo: string;
  currentMarketValue: number;
  amountOwned: number;
  ownedValue: number;
}

export const Coin = ({
  name,
  symbol,
  logo,
  currentMarketValue,
  amountOwned,
  ownedValue,
}: Coin): JSX.Element => {
  return (
    <Link href={`/bought/${name}`}>
      <div className='w-full bg-offwhite max-w-3xl py-2 mt-3 rounded cursor-pointer'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center mx-1'>
            <Smile className='mx-2 h-9 w-9' />
            <div className='flex flex-col font-medium'>
              <div className='text-lg text-blackeye-blue'>{name}</div>
              <div className='text-sm text-darkblue'>${currentMarketValue}</div>
            </div>
          </div>
          <div className='flex flex-col items-end mx-3 font-medium'>
            <div className='text-lg'>{amountOwned}</div>
            <div className='text-sm text-darkblue'>${ownedValue}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
