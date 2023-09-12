import { roundNumber } from '@/helpers/math';
import { ParsedMarkets } from '@/types';
import Link from 'next/link';
import { Search } from './Search';

interface HeaderProps {
  filterMarket: (marketData: ParsedMarkets[], query: string) => void;
  initialPortfolioValue: number;
  currentPortfolioValue: number;
  marketsResponse: ParsedMarkets[];
}

export const Header = ({
  filterMarket,
  initialPortfolioValue,
  currentPortfolioValue,
  marketsResponse,
}: HeaderProps): JSX.Element => {
  return (
    <div className='sticky z-20 sm:top-9 top-0 w-full bg-darkblue sm:rounded-t-[4rem] sm:border-black sm:border-t-8 sm:border-x-8'>
      <div className='px-5 pt-6'>
        <div className='flex flex-col items-center w-full max-w-4xl mx-auto'>
          <div className='flex flex-col items-center'>
            <div className='p-4 text-3xl font-bold cursor-pointer text-lightpink'>
              Crynance
            </div>
            <div className='text-5xl text-offwhite'>
              ${roundNumber(currentPortfolioValue, 2)}
            </div>
            <div className='p-4 text-lightblue'>
              ${roundNumber(initialPortfolioValue, 2)}
            </div>
          </div>
          {/* <div className='flex justify-between w-full mb-8'>
            <button className='flex-1 px-4 py-2 mr-5 font-bold rounded cursor-pointer bg-lightpink text-darkblue'>
              Buy
            </button>
            <button className='flex-1 px-4 py-2 ml-5 font-bold rounded cursor-pointer bg-lightpink text-darkblue'>
              Sell
            </button>
          </div> */}
        </div>
      </div>
      <Search filterMarket={filterMarket} marketsResponse={marketsResponse} />
    </div>
  );
};
