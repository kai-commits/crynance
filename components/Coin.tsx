import Image from 'next/image';
import Link from 'next/link';

interface Coin {
  name: string;
  symbol: string;
  logo: string;
  currentMarketValue: number;
}

export const Coin = ({
  name,
  symbol,
  logo,
  currentMarketValue,
}: Coin): JSX.Element => {
  return (
    <Link href={`/bought/${name}`}>
      <div className='w-full bg-offwhite max-w-3xl py-2 mt-3 rounded cursor-pointer'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center mx-1'>
            <div className='flex px-2 items-center'>
              <Image src={logo} width={35} height={35} alt={symbol} />
            </div>
            <div className='flex flex-col font-medium'>
              <div className='text-lg text-blackeye-blue'>{name}</div>
              <div className='text-sm text-darkblue'>${currentMarketValue}</div>
            </div>
          </div>
          <div className='flex flex-col items-end mx-3 font-medium'>
            <div className='text-lg'>10</div>
            <div className='text-sm text-darkblue'>$100</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
